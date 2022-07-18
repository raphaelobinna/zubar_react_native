import {
    INDEX_PUSH_NOTIFICATION,
    STORE_PUSH_NOTIFICATION,
    SHOW_PUSH_NOTIFICATION,
    MY_PUSH_NOTIFICATION,
    EDIT_PUSH_NOTIFICATION,
    DELETE_PUSH_NOTIFICATION,
    TEST_PUSH_NOTIFICATION
} from './types';
import Axios from '../../connection/defaultClient';
import errorHandler from '../../handlers/errorHandler';
import successHandler from '../../handlers/successHandler';
import { toggleActivityLoadingAction } from "../actions/alertActions";
import { deviceId } from '../../support/session';

export const getAllPushNotificationsAction = (payLoad) => {
    return (dispatch) => {
        dispatch(toggleActivityLoadingAction());
        Axios.get(`/push-notification/index`,{params:{...payLoad}})
        .then(data => {
            dispatch({type: INDEX_PUSH_NOTIFICATION, payLoad: data});
            dispatch(toggleActivityLoadingAction());
        })
        .catch((error) => {
            dispatch(toggleActivityLoadingAction());
            errorHandler(error,true);
        });
    }
}

export const storePushNotificationAction = (payLoad) => {
    return (dispatch) => {
        Axios.post(`/push-notification/store`,{...payLoad})
        .then(data => {
            dispatch({type: STORE_PUSH_NOTIFICATION, payLoad: data});
        })
        .catch((error) => {
            errorHandler(error,true);
        });
    }
}

export const showAPushNotificationAction = (payLoad) => {
    return (dispatch) => {
        dispatch(toggleActivityLoadingAction());
        Axios.get(`/push-notification/show`,{params:{...payLoad}})
        .then(data => {
            dispatch({type: SHOW_PUSH_NOTIFICATION, payLoad: data});
            dispatch(toggleActivityLoadingAction());
        })
        .catch((error) => {
            dispatch(toggleActivityLoadingAction());
            errorHandler(error,true);
        });
    }
}

export const showMyPushNotificationAction = (callBack=()=>{}) => {
    return (dispatch) => {
        Axios.get(`/push-notification/me`)
        .then(data => {
            dispatch({type: MY_PUSH_NOTIFICATION, payLoad: data});
            callBack();
        })
        .catch((error) => {
            errorHandler(error,true);
        });
    }
}

export const editAPushNotificationAction = (payLoad) => {
    return (dispatch) => {
        dispatch(toggleActivityLoadingAction());
        Axios.post(`/push-notification/update`,{...payLoad})
        .then(data => {
            dispatch({type: EDIT_PUSH_NOTIFICATION, payLoad: data});
            dispatch(toggleActivityLoadingAction());
            successHandler(data,true);
        })
        .catch((error) => {
            dispatch(toggleActivityLoadingAction());
            errorHandler(error,true);
        });
    }
}

export const deleteAPushNotificationAction = (payLoad) => {
    return (dispatch) => {
        dispatch(toggleActivityLoadingAction());
        Axios.post(`/push-notification/delete`,{...payLoad})
        .then(data => {
            dispatch({type: DELETE_PUSH_NOTIFICATION, payLoad: data});
            dispatch(toggleActivityLoadingAction());
        })
        .catch((error) => {
            dispatch(toggleActivityLoadingAction());
            errorHandler(error,true);
        });
    }
}

export const deleteAPushNotificationOnLogoutAction = (callBack) => {
    return async (dispatch) => {
        let deviceIdentification = await deviceId();
        return Axios.post(`/push-notification/delete`,{device_id:deviceIdentification})
        .then(data => {
            dispatch({type: DELETE_PUSH_NOTIFICATION, payLoad: data});
            successHandler(data);
            return dispatch(callBack());
        })
        .catch((error) => {
            errorHandler(error);
            return dispatch(callBack());
        });
    }
}

export const testPushNotificationModelAction = () => {
    return (dispatch) => {
        dispatch(toggleActivityLoadingAction());
        Axios.get(`/push-notification/test`)
        .then(data => {
            dispatch({type: TEST_PUSH_NOTIFICATION, payLoad: data});
            dispatch(toggleActivityLoadingAction());
        })
        .catch((error) => {
            dispatch(toggleActivityLoadingAction());
            errorHandler(error,true);
        });
    }
}