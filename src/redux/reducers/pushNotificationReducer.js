import {
    INDEX_PUSH_NOTIFICATION,
    STORE_PUSH_NOTIFICATION,
    SHOW_PUSH_NOTIFICATION,
    MY_PUSH_NOTIFICATION,
    EDIT_PUSH_NOTIFICATION,
    DELETE_PUSH_NOTIFICATION,
    TEST_PUSH_NOTIFICATION
} from '../actions/types';

const initialState = {
    pushNotifications:{},
    pushNotification: {},
    userPushNotification:{},
    deletedPushNotification:{},
    testPushNotification:{},
}

export default function pushNotificationReducer (state=initialState, action) {

    switch (action.type) {
        case INDEX_PUSH_NOTIFICATION:
            return {
                ...state,
                pushNotifications:action.payLoad.data.data,
            }

        case STORE_PUSH_NOTIFICATION:
            return {
                ...state,
                pushNotification:action.payLoad.data.data,
            }
        
        case SHOW_PUSH_NOTIFICATION:
            return {
                ...state,
                pushNotification:action.payLoad.data.data,
            }

        case MY_PUSH_NOTIFICATION:
            return {
                ...state,
                userPushNotification:action.payLoad.data.data,
            }

        case EDIT_PUSH_NOTIFICATION:
            return {
                ...state,
                pushNotification:action.payLoad.data.data,
            }

        case DELETE_PUSH_NOTIFICATION:
            return {
                ...state,
                deletedPushNotification:action.payLoad.data.data,
            }

        case TEST_PUSH_NOTIFICATION:
            return {
                ...state,
                testPushNotification:action.payLoad.data.data,
            }

        default:
            return state;
    }
}