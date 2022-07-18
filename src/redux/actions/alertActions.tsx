import { DispatchType } from './constants';
import { SET_ACTIVITY_NOTIFICATION, UNSET_ACTIVITY_NOTIFICATION, ACTIVITY_LOADING, UNSET_ACTIVITY_MESSAGE, SET_ACTIVITY_MESSAGE } from './types';

/**
 * Set alert on application
 * @param {object} payLoad {type:'warning', message:'This is an alert'}
 * @returns {void}
 * 
 * Note that payLoad must be an object must have 
 * the keys of type and message respectively
 */
export const setActivityNotificationAction = (payLoad:object) => {
    return (dispatch:DispatchType) => { dispatch({
            type: SET_ACTIVITY_NOTIFICATION,
            payLoad: payLoad
        });
    }
}

/**
 * Clear alert on application
 * @returns {void}
 */
export const unSetActivityNotificationAction = () => {
    return (dispatch:DispatchType) => { dispatch({
            type: UNSET_ACTIVITY_NOTIFICATION,
        });
    }
}

/**
 * Toggle loading indicator
 * @param {void}
 * @returns {void}
 */
export const toggleActivityLoadingAction = () => {
    return (dispatch:DispatchType) => { dispatch({
            type: ACTIVITY_LOADING
        });
    }
}

/**
 * Clear message displayed over application screen
 * @param {void}
 * @returns {void}
 */
export const unSetActivityMessageAction = () => {
    return (dispatch:DispatchType) => { dispatch({
            type: UNSET_ACTIVITY_MESSAGE
        });
    }
}

/**
 * Display a message over application screen
 * @param {object} payLoad
 * @returns {void}
 */
export const setActivityMessageAction = (payLoad:object) => {
    return (dispatch:DispatchType) => { dispatch({
            type: SET_ACTIVITY_MESSAGE,
            payLoad: payLoad
        });
    }
}