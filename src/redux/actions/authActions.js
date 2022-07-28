import {
    LOGIN_USER, REGISTER_USER, FORGOT_USER_PASSWORD, RESET_USER_PASSWORD,
    LOGOUT_USER, REFRESHED_TOKEN, SET_TEAM_ID, VERIFY_USER_EMAIL, GET_USER_DETAILS, TEST_AUTH, IS_GUEST, MY_PROFILE, SHOW_USER, EDIT_PROFILE, SHOULD_RELOAD_USER
} from './types';
import Axios from '../../connection/defaultClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import errorHandler from '../../handlers/errorHandler';
import successHandler from '../../handlers/successHandler';
import { persistLastLogin, retrievePersistedLastLogin, updatePersistedLastLogin, destroyLastLogin } from '../../support/session';
import { toggleActivityLoadingAction } from "./alertActions";
import { loginUserValidation, registerUserValidation, changeUserPasswordValidation, forgotUserPasswordValidation, resetUserPasswordValidation } from '../../validation/authValidation';
import { saveBooleanChoiceAction, saveFlagAction, saveGenderAction } from './helpActions';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

/**
 * Login to application
 * @param {object} payLoad {email:'a@gmail.com', password:'123456'}
 * @returns {object} {type: LOGIN_USER, payLoad: {user: {id: 1, email: '
 * 
 * Note that payLoad must be an object must have 
 * the keys of email and password respectively
 */
export const loginUserAction = (payLoad) => {
    return (dispatch) => {
        if (!loginUserValidation(dispatch, payLoad)) {
            return false;
        }

        console.log('payLoad', payLoad);

        //  dispatch(toggleActivityLoadingAction());
        Axios.post(`/api/login`, { ...payLoad })
            .then(data => {
                dispatch({ type: LOGIN_USER, payLoad: data });
                persistLastLogin(data);
                dispatch(saveGenderAction())
                dispatch(saveBooleanChoiceAction())
                dispatch(saveFlagAction())

                Toast.show({
                    type: 'successToast',
                    text1: 'Login Successfully',
                    text2: 'User Login Successfully'
                });
                // dispatch(toggleActivityLoadingAction());
            })
            .catch((error) => {
                console.log('error', error.response);
                // dispatch(toggleActivityLoadingAction());
                Toast.show({
                    type: 'errorToast',
                    text1: "Error",
                    text2: `${error.response?.data?.errors[0]?.message}`
                });
            });
    }
}

/**
 * Register in the application
 * @param {object} payLoad {name:'name', email:'name@gmail.com', password:'123456', password_confirmation:'123456'}
 * @param {function} callBack function to be called after registration
 * @returns {object} {type: REGISTER_USER, payLoad: {user: {id: 1, email: '
 * 
 * Note that payLoad must be an object
 */
export const registerUserAction = (payLoad, callBack = () => { }) => {
    return (dispatch) => {
        if (!registerUserValidation(dispatch, payLoad)) {
            callBack(false)
            return false;
        }

        // dispatch(toggleActivityLoadingAction());
        Axios.post(`/api/register`, { ...payLoad })
            .then(data => {

                Toast.show({
                    type: 'successToast',
                    text1: 'Registered Successfully',
                    text2: 'User Registered Successfully'
                });
                callBack(true);

            })
            .catch((error) => {
                // dispatch(toggleActivityLoadingAction());
                Toast.show({
                    type: 'errorToast',
                    text1: "Error",
                    text2: `${error.response?.data?.message}`
                });
                callBack(false);
            });
    }
}

export const getLoggedInUser = (callBack = () => { }) => {
    return (dispatch) => {

        // dispatch(toggleActivityLoadingAction());
        Axios.get(`/api/user/me`)
            .then(data => {

                dispatch({ type: MY_PROFILE, payLoad: data });
                // dispatch(toggleActivityLoadingAction());
                successHandler(data, true);
                callBack(true);
            })
            .catch((error) => {
                // dispatch(toggleActivityLoadingAction());
                errorHandler(error, true);
                callBack(false);
            });
    }
}

export const getUserProfile = () => {
    return (dispatch) => {

        // dispatch(toggleActivityLoadingAction());
        Axios.get(`/api/user-profile`)
            .then(data => {
             
               dispatch({ type: MY_PROFILE, payLoad: data });
                // dispatch(toggleActivityLoadingAction());
               // callBack(true);
            })
            .catch((error) => {
                // dispatch(toggleActivityLoadingAction());
              errorHandler(error, true);
               // callBack(false);
            });
    }
}

export const forgotPassword = (callBack = () => { }) => {
    return (dispatch) => {

        if (!forgotUserPasswordValidation(dispatch, payLoad)) {
            return false;
        }

        // dispatch(toggleActivityLoadingAction());
        Axios.get(`/api/forgot-password`)
            .then(data => {
                dispatch({ type: FORGOT_USER_PASSWORD, payLoad: data })
               
                callBack(true);
            })
            .catch((error) => {
                // dispatch(toggleActivityLoadingAction());
                Toast.show({
                    type: 'errorToast',
                    text1: "Error",
                    text2: `${error.response?.data?.message}`
                });
                callBack(false);
            });
    }
}


export const resetPassword = (payLoad, callBack = () => { }) => {
    return (dispatch) => {

        if (!resetUserPasswordValidation(dispatch, payLoad)) {
            return false;
        }

        // dispatch(toggleActivityLoadingAction());
        Axios.post(`/api/reset-password`, { ...payLoad })
            .then(data => {
                dispatch({ type: RESET_USER_PASSWORD, payLoad: data })
                Toast.show({
                    type: 'successToast',
                    text1: 'Updated Successfully',
                    text2: 'User Changed Password Successfully'
                });
                callBack(true);
            })
            .catch((error) => {
                // dispatch(toggleActivityLoadingAction());
                Toast.show({
                    type: 'errorToast',
                    text1: "Error",
                    text2: `${error.response?.data?.message}`
                });
                callBack(false);
            });
    }
}

export const updatePassword = (payLoad, callBack = () => { }) => {
    return (dispatch) => {

        if (!changeUserPasswordValidation(dispatch, payLoad)) {
            Toast.show({
                type: 'errorToast',
                text1: "Error",
                text2: 'Password Validation Failed'
            });
            return false;
        }

        // dispatch(toggleActivityLoadingAction());
        Axios.post(`/api/update-password`, { ...payLoad })
            .then(data => {

                Toast.show({
                    type: 'successToast',
                    text1: 'Updated Successfully',
                    text2: 'User Changed Password Successfully'
                });
                callBack(true);
            })
            .catch((error) => {
                // dispatch(toggleActivityLoadingAction());
                Toast.show({
                    type: 'errorToast',
                    text1: "Error",
                    text2: `${error.response?.data?.message}`
                });
                callBack(false);
            });
    }
}

export const getSingleUser = (payLoad, callBack = () => { }) => {
    return (dispatch) => {

        // dispatch(toggleActivityLoadingAction());
        Axios.post(`/api/single-user`, { ...payLoad })
            .then(data => {
                dispatch({ type: SHOW_USER, payLoad: data })
               
                callBack(true);
            })
            .catch((error) => {
                // dispatch(toggleActivityLoadingAction());
                Toast.show({
                    type: 'errorToast',
                    text1: "Error",
                    text2: `${error.response?.data?.message}`
                });
                callBack(false);
            });
    }
}

export const refreshUserAction = (payLoad) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER, payLoad: payLoad });
    }
}

export const deleteUser = (payLoad, callBack = () => { }) => {
    return (dispatch) => {

        // dispatch(toggleActivityLoadingAction());
        Axios.post(`/api/user/delete`, { ...payLoad })
            .then(data => {
               
                callBack(true);
                Toast.show({
                    type: 'successToast',
                    text1: 'Deleted Successfully',
                    text2: 'User was deleted Successfully'
                });
            })
            .catch((error) => {
                // dispatch(toggleActivityLoadingAction());
                Toast.show({
                    type: 'errorToast',
                    text1: "Error",
                    text2: `${error.response?.data?.message}`
                });
                callBack(false);
            });
    }
}

export const updateUser = (payLoad, callBack = () => { }) => {
    return (dispatch) => {

        // dispatch(toggleActivityLoadingAction());
        Axios.post(`/api/user-update`, { ...payLoad })
            .then(data => {
                dispatch({ type: EDIT_PROFILE, payLoad: data })
                dispatch({ type: SHOULD_RELOAD_USER, payLoad: true })
                Toast.show({
                    type: 'successToast',
                    text1: 'Updated Successfully',
                    text2: 'Updated User Successfully'
                });
                callBack(true);
            })
            .catch((error) => {
                // dispatch(toggleActivityLoadingAction());
                Toast.show({
                    type: 'errorToast',
                    text1: "Error",
                    text2: `${error.response?.data?.message}`
                });
                callBack(false);
            });
    }
}

export const restoreLoggedInUserAction = (callBack) => {
    return async (dispatch) => {
        let data = await retrievePersistedLastLogin();

        if (data) {
            dispatch({ type: LOGIN_USER, payLoad: data });

            dispatch(saveGenderAction())
            dispatch(saveBooleanChoiceAction())
            dispatch(saveFlagAction())

            callBack(data.data);
        } else {
            callBack({});
        }
    }
}