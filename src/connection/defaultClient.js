import Constants from 'expo-constants';
import axios from 'axios';
import { refreshUserTokenLocallyAction, logoutUserLocallyAction } from '../redux/actions/unAuthActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../redux/store';
import { refreshUserAction } from '../redux/actions/authActions';

// Get user details
const userDetails = () => {
  let authState = store.getState().auth;
  return authState;
}

// Retry Counter
const retryAgain = async () => {
  // max count for retires
  let maxCount = 1;

  // get current retry count, if non assign zero
  let retryCount = await AsyncStorage.getItem('retryCount') ?? 0;

  // check if current retry count is less that allowed max count
  let retry = (parseInt(retryCount) < maxCount) ? true : false;

  // store new retry count
  AsyncStorage.setItem('retryCount', retry ? (parseInt(retryCount)+1).toString() : '0');

  return retry;
}

// Refresh token
const refreshToken = async (token = null) => {
  // get last logger email, if non assign empty string
  let email = await AsyncStorage.getItem('user_email') ?? '';

  // get last logger password, if non assign empty string
  let password = await AsyncStorage.getItem('user_password') ?? '';

  return axios.post(`${Constants.manifest.extra.appApiUrl}/auth/login`,{email, password})
  .then(data => {
    // Send new token to reducer
    store.dispatch(refreshUserAction(data));
    return data;
  })
  .catch((error) => {
    return error.response;
  });
}

// Logout user
const logoutUser = async () => {
  return axios.post(`${Constants.manifest.extra.appApiUrl}/auth/logout`)
  .then(data => {
    // Send new token to reducer
    store.dispatch(logoutUserLocallyAction());
    return data;
  })
  .catch((error) => {
    store.dispatch(logoutUserLocallyAction());
    return error.response;
  });
}

// Handle success response
const successResponseHandler = (response) => {

  // No content response (204)
  if (response.status === 204) { response.data = {data:{}}; }

  // Log response
  if (Constants.manifest.extra.appEnvironment === 'development') {
    console.log(response.data);
  }

  // Additional checks for API that does not utilize the HTTP status code properly
  if (response.data.status === false || response.data.status === 'failed') {

    // Error message is retrieved from the JSON body.
    const error = new Error(response.data.message);

    // Attach the response instance, in case you decide to access it.
    error.response = response;

    throw error;
  }

  // Return processed response
  return response;
}

// Handle failure response
const failureResponseHandler = async (error) => {

  // Log error response
  if (Constants.manifest.extra.appEnvironment === 'development') {
    console.log(error);
  }

  // No network response (ECONNABORTED)
  if (!error.response || error.code === 'ECONNABORTED'){
    alert(`Could not connect to network`);
    return Promise.reject(error);
  }

  // No authorization response (401)
  if (error.response && error.response.status === 401) {
    try {

      // Check if retry limit has been exceeded
      let shouldRetry = await retryAgain();
      if (!shouldRetry){throw new Error('Retry count exceeded')}

      // Attempt to refresh expired token
      let refreshTokenResponse = await refreshToken(userDetails().token);

      // Handle token refresh blacklisting caused by a prior request having refreshed the token already
      if (refreshTokenResponse.status.toString().split('')[0] !== '2') {
        refreshTokenResponse = {data:{data:{access_token:userDetails().token}}}
      }

      // Retry the failed request with returned token
      return await instance.request({...error.config, headers: {
        ...error.config.headers,
        Authorization: 'Bearer '+refreshTokenResponse.data.data.access_token,},
      })
      .then((response)=>{
        return successResponseHandler(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });

    } catch (error) {

      // Logout user
      logoutUser();
      return Promise.reject(error);
    }
  }

  // Return unprocessed error
  return Promise.reject(error);
}

// Create an axios instance
const instance = axios.create({
  baseURL: Constants.manifest.extra.appApiUrl,
  timeout: 60000,
  headers:{}
});

// Add a request interceptor
instance.interceptors.request.use( async (req) => {

  // Get logged in user details and inject tokens and team id to headers
  req.headers['Authorization'] = 'Bearer '+userDetails().token;

  // Set header content type and acceptable type
  // req.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  // req.headers['Accept'] = '*/*';

  //req.headers['Content-Type'] = 'multipart/form-data';

  // Reattach the base url
  if (!req.baseURL) {
    req.url = Constants.manifest.extra.appApiUrl+'/'+req.url;
  }

  return req;
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {return successResponseHandler(response);},
  (error) => {return failureResponseHandler(error);}
);

export default instance;