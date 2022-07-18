import Constants from 'expo-constants';
import { setActivityNotificationAction } from '../redux/actions/alertActions';
import store from '../redux/store';

/**
 * Check environment before console logging data 
 * @param  {...any} data 
 * @param {string} environment 
 * @returns {boolean}
 */
const handlerDump = (...data) => {
    if (Constants.manifest.extra.appEnvironment === 'development') {
        console.log(...data);
        return true;
    }
    return false;
}

/**
 * Determine response of handler
 * @param {string} alternateMessage 
 * @param {object} data 
 * @returns {string}
 */
const handlerResponse = (alternateMessage, data = {}) => {
    if (data.data && data.data.message) {
        return data.data.message
    }
    return alternateMessage;
}

/**
 * Parse error response from server
 * @param {*} errorObject 
 * @param {boolean} shouldDispatchAlert 
 * @returns {string}
 */
const handler = (errorObject, shouldDispatchAlert = false) => {

    try {
        if (errorObject.response && errorObject.response.data) {

            let errors = errorObject.response.data.errors;
            let message = errorObject.response.data.message;

            if (errors && errors.length > 0) {

                // Request made and server responded with an error
                handlerDump('Error Response', errorObject.response.headers, errorObject.response.data, errorObject.response.status);

                // Map through errors
                Object.values(errors).map((item, key) => {

                    // Send found errors to alert
                    shouldDispatchAlert && store.dispatch(setActivityNotificationAction({ type: 'warning', message: item.toString() }));
                });

            } else {

                // Request made and server responded with an error
                handlerDump('Error Response', errorObject.response);

                // Send generic error message to alert
                shouldDispatchAlert && store.dispatch(setActivityNotificationAction({ type: 'warning', message: message }));
            }

            // Return a response
            return handlerResponse('Something went wrong!', errorObject.response);

        } else if (errorObject.request) {

            // The request was made but no response was received
            handlerDump('Unknown Response', errorObject.request);

            // No network connection
            if (errorObject.message === 'Network Error') {

                // Send found errors to alert
                shouldDispatchAlert && store.dispatch(setActivityNotificationAction({ type: 'danger', message: 'Network is Unavailable' }));

            } else {

                // Send generic error message to alert
                shouldDispatchAlert && store.dispatch(setActivityNotificationAction({ type: 'danger', message: 'Server is Unavailable' }));
            }

            // Return a response
            return handlerResponse('Something went wrong!', errorObject);

        } else {
            // Something happened in setting up the request that triggered an Error
            handlerDump('Unknown Error', errorObject);

            // Send generic info message to alert
            shouldDispatchAlert && store.dispatch(setActivityNotificationAction({ type: 'warning', message: 'Application is Unavailable' }));

            // Return a response
            return handlerResponse('Something went wrong!', errorObject);
        }

    } catch (error) {
        handlerDump('Error Handler System Failure - Error Experienced In Processing Error Object', error);
        handlerDump('Error Handler System Failure - Error Object Passed In For Processing', errorObject);
    }
}


export default handler;