import { LOGOUT_USER, REFRESHED_TOKEN} from './types';
import { updatePersistedLastLogin, destroyLastLogin} from '../../support/session';
import { toggleActivityLoadingAction, setActivityMessageAction } from "../actions/alertActions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../../connection/defaultClient';

export const logoutUserLocallyAction = () => {
    return (dispatch) => {
        Axios.get(`/api/logout`)
        destroyLastLogin();
        AsyncStorage.clear();
        dispatch({type: LOGOUT_USER, payLoad: {}});
    }
}

export const refreshUserTokenLocallyAction = (payLoad) => {
    return (dispatch) => {
        updatePersistedLastLogin(payLoad);
        dispatch({type: REFRESHED_TOKEN, payLoad: payLoad});
    }
}