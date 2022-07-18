import { SET_ACTIVITY_NOTIFICATION, UNSET_ACTIVITY_NOTIFICATION, ACTIVITY_LOADING, UNSET_ACTIVITY_MESSAGE, SET_ACTIVITY_MESSAGE } from '../actions/types';

const initialState = {
    // Notification
    activityNotification: false,
    activityNotificationData: {},

    // Loader and pop-up modal
    activityModal: false,
    activityLoading: false,
    activityMessage: false,
}

export default function alertReducer (state=initialState, action) {

    switch (action.type) {
        case SET_ACTIVITY_NOTIFICATION:
            return {
                ...state,
                activityNotificationData:action.payLoad,
                activityNotification:true
            }

        case UNSET_ACTIVITY_NOTIFICATION:
            return {
                ...state,
                activityNotificationData:{},
                activityNotification:false
            }

        case ACTIVITY_LOADING:
            return {
                ...state,
                activityModal:!state.activityModal,
                activityLoading:!state.activityLoading
            }

        case SET_ACTIVITY_MESSAGE:
            return {
                ...state,
                activityModal:true,
                activityMessage:action.payLoad
            }

        case UNSET_ACTIVITY_MESSAGE:
            return {
                ...state,
                activityModal:false,
                activityMessage:false,
            }

        default:
            return state;
    }
}