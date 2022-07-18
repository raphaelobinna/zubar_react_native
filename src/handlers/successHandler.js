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
        console.log (...data);
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
        return data.data.message;

    }
    return alternateMessage;
}

/**
 * Parse success response from server
 * @param {*} successObject 
 * @param {boolean} shouldDispatchAlert 
 * @returns {string}
 */
const handler = (successObject, shouldDispatchAlert = false) => {

    try {
        if (successObject.data) {

            if (successObject.data.message) {

                // Request made and server responded with a success
                handlerDump('Success Response', successObject.headers, successObject.data, successObject.status);

                // Send found success message to alert
                shouldDispatchAlert && store.dispatch(setActivityNotificationAction({type:'success', message:successObject.data.message}));

            } else {

                // Request made and server responded with a success
                handlerDump('Success Response', successObject.headers, successObject.data, successObject.status);

                // Send generic success message to alert
                shouldDispatchAlert && store.dispatch(setActivityNotificationAction({type:'success', message:'Success'}));
            }

            // Return a response
            return handlerResponse('Request was successful!', successObject);

        } else {

            // Something happened in setting up the request that triggered an unstructured response
            handlerDump('Unknown Success Response', successObject);

            // Send generic info message to alert
            shouldDispatchAlert && store.dispatch(setActivityNotificationAction({type:'info', message:'Application is Unavailable'}));

            // Return a response
            return handlerResponse('Try again', successObject);
        }

    } catch (error) {
        handlerDump('Success Handler System Failure - Error Experienced In Processing Success Object',error);
        handlerDump('Success Handler System Failure - Success Object Passed In For Processing',successObject);
    }
}


export default handler;