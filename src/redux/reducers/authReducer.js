import {
    LOGIN_USER, REGISTER_USER, FORGOT_USER_PASSWORD, RESET_USER_PASSWORD,
    LOGOUT_USER, REFRESHED_TOKEN, SET_TEAM_ID, VERIFY_USER_EMAIL, GET_USER_DETAILS, TEST_AUTH, EDIT_USER, IS_GUEST, SHOW_USER, SHOULD_RELOAD_USER, MY_PROFILE
} from '../actions/types';

const initialState = {
    user: {},
    token: '',
    teamId: '',
    forgotPassword: {},
    resetPassword: {},
    verifyEmail: {},
    indexUser:{},
    testAuth: {},
    myProfile:{},
    shouldReload: false
}

export default function authReducer(state = initialState, action) {

    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payLoad.data.data,
                token: action.payLoad.data.token.token,
            }

        case LOGOUT_USER:
            return {
                ...state,
                user: {},
                token: '',
                teamId: ''
            }

        case REGISTER_USER:
            return {
                ...state,
                user: action.payLoad.data,
                token: action.payLoad.data.token.token,
            }

        case REFRESHED_TOKEN:
            return {
                ...state,
                token: action.payLoad.data.token.token,
            }

        case SET_TEAM_ID:
            return {
                ...state,
                teamId: action.payLoad,
            }

        case FORGOT_USER_PASSWORD:
            return {
                ...state,
                forgotPassword: action.payLoad.data.data,
            }

        case RESET_USER_PASSWORD:
            return {
                ...state,
                resetPassword: action.payLoad.data.data,
            }

        case VERIFY_USER_EMAIL:
            return {
                ...state,
                verifyEmail: action.payLoad.data.data,
            }

        case GET_USER_DETAILS:
            return {
                ...state,
                user: { ...state.user, ...action.payLoad.data },
            }

        case MY_PROFILE:
            return {
                ...state,
                myProfile: action.payLoad.data.data,
            }

        case SHOW_USER:
            return {
                ...state,
                indexUser: { ...state.user, ...action.payLoad.data },
            }


        case IS_GUEST:
            return {
                ...state,
                isGuest: action.payLoad,
            }


        case TEST_AUTH:
            return {
                ...state,
                testAuth: action.payLoad.data.data,
            }

        case SHOULD_RELOAD_USER:
            return {
                ...state,
                shouldReload: !state.shouldReload,
            }

        default:
            return state;
    }
}