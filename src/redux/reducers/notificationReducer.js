import {
    MY_NOTIFICATION
} from '../actions/types';

const initialState = {
    userNotification:[],
}

export default function notificationReducer (state=initialState, action) {

    switch (action.type) {
        case MY_NOTIFICATION:
            return {
                ...state,
                userNotification:action.payLoad,
            }

        default:
            return state;
    }
}