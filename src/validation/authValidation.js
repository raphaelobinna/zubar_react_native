import { validate } from '../helpers/validator';
import { setActivityNotificationAction } from '../redux/actions/alertActions';

export const loginUserValidation = (dispatch, payLoad) => {
    let data = {
        email:payLoad.email, 
        password:payLoad.password
    };
    let rules = {
        email:'required|email',
        password:'required|minSize:5|maxSize:25'
    }
    let messages = {
        email:{
            required:'email is required',
            email:'email is not valid'
        },
        password:{
            required:'password is required',
            minSize:'password is less than six characters',
            maxSize:'password is above the required length'
        }
    }

    // If they are no errors then exit
    let result = validate(data,rules,messages);
    if (Object.keys(result).length === 0) {
        return true;
    }

    // Picking the first error and dispatching it to the user
    let msg = result[Object.keys(result)[0]]; 
    dispatch(setActivityNotificationAction({type:'info', message: Object.values(msg)[0] }));

    // Return false to stop the api call from happing
    return false;
}

export const registerUserValidation = (dispatch, payLoad) => {
    let data = {
        email:payLoad.email, 
        password:payLoad.password,
        password_confirmation:payLoad.password_confirmation,
        confirmation:{password:payLoad.password, confirmPassword: payLoad.password_confirmation},
    };
    let rules = {
        email:'required|email',
        password:'required|minSize:5|maxSize:25',
        password_confirmation:'required|minSize:5|maxSize:25',
        confirmation:(value)=>{return value.password === value.confirmPassword ? true : false;}
    }
    let messages = {
        email:{
            required:'email is required',
            email:'email is not valid'
        },
        password:{
            required:'password is required',
            minSize:'password is less than six characters',
            maxSize:'password is above the required length'
        },
        password_confirmation:{
            required:'Password confirmation is required',
            minSize:'Password confirmation is less than six characters',
            maxSize:'Password confirmation is above the required length'
        },
        confirmation:{
            custom:'password and confirm password do not match'
        }
    }

    // If they are no errors then exit
    let result = validate(data,rules,messages);
    if (Object.keys(result).length === 0) {
        return true;
    }

    // Picking the first error and dispatching it to the user
    let msg = result[Object.keys(result)[0]]; 
    dispatch(setActivityNotificationAction({type:'info', message: Object.values(msg)[0] }));

    // Return false to stop the api call from happing
    return false;
}

export const changeUserPasswordValidation = (dispatch, payLoad) => {
    let data = {
        old_password:payLoad.old_password, 
        new_password:payLoad.new_password,
        new_password_confirmation:payLoad.new_password_confirmation,
        confirmation:{newPassword:payLoad.new_password, repeatPassword: payLoad.new_password_confirmation},
    };
    let rules = {
        old_password:'required|minSize:5|maxSize:25',
        new_password:'required|minSize:5|maxSize:25',
        new_password_confirmation:'required|minSize:5|maxSize:25',
        confirmation:(value)=>{return value.newPassword === value.repeatPassword ? true : false;}
    }
    let messages = {
        old_password:{
            required:'Current password is required',
            minSize:'Current password is less than six characters',
            maxSize:'Current password is above the required length'
        },
        new_password:{
            required:'New password is required',
            minSize:'New password is less than six characters',
            maxSize:'New password is above the required length'
        },
        new_password_confirmation:{
            required:'Repeat new password is required',
            minSize:'Repeat new password is less than six characters',
            maxSize:'Repeat new password is above the required length'
        },
        confirmation:{
            custom:'New and repeat password do not match'
        }
    }

    // If they are no errors then exit
    let result = validate(data,rules,messages);
    if (Object.keys(result).length === 0) {
        return true;
    }

    // Picking the first error and dispatch it to the user
    let msg = result[Object.keys(result)[0]]; 
    dispatch(setActivityNotificationAction({type:'info', message: Object.values(msg)[0] }));

    // Return false to stop the api call from happing
    return false;
}

export const forgotUserPasswordValidation = (dispatch, payLoad) => {
    let data = {
        email:payLoad.email, 
        reset_form_link:payLoad.reset_form_link,
    };
    let rules = {
        email:'required|email',
        reset_form_link:'required',
    }
    let messages = {
        email:{
            required:'email is required',
            email:'email is not valid'
        },
        reset_form_link:{
            required:'Reset form link is required',
        },
    }

    // If they are no errors then exit
    let result = validate(data,rules,messages);
    if (Object.keys(result).length === 0) {
        return true;
    }

    // Picking the first error and dispatch it to the user
    let msg = result[Object.keys(result)[0]]; 
    dispatch(setActivityNotificationAction({type:'info', message: Object.values(msg)[0] }));

    // Return false to stop the api call from happing
    return false;
}

export const resetUserPasswordValidation = (dispatch, payLoad) => {
    let data = {
        token:payLoad.token,
        old_password:payLoad.old_password, 
        new_password:payLoad.new_password,
        new_password_confirmation:payLoad.new_password_confirmation,
        confirmation:{newPassword:payLoad.new_password, repeatPassword: payLoad.new_password_confirmation},
    };
    let rules = {
        token:'required',
        old_password:'required|minSize:5|maxSize:25',
        new_password:'required|minSize:5|maxSize:25',
        new_password_confirmation:'required|minSize:5|maxSize:25',
        confirmation:(value)=>{return value.newPassword === value.repeatPassword ? true : false;}
    }
    let messages = {
        token:{
            required:'A token is required',
        },
        old_password:{
            required:'Current password is required',
            minSize:'Current password is less than six characters',
            maxSize:'Current password is above the required length'
        },
        new_password:{
            required:'New password is required',
            minSize:'New password is less than six characters',
            maxSize:'New password is above the required length'
        },
        new_password_confirmation:{
            required:'Repeat new password is required',
            minSize:'Repeat new password is less than six characters',
            maxSize:'Repeat new password is above the required length'
        },
        confirmation:{
            custom:'New and repeat password do not match'
        }
    }

    // If they are no errors then exit
    let result = validate(data,rules,messages);
    if (Object.keys(result).length === 0) {
        return true;
    }

    // Picking the first error and dispatch it to the user
    let msg = result[Object.keys(result)[0]]; 
    dispatch(setActivityNotificationAction({type:'info', message: Object.values(msg)[0] }));

    // Return false to stop the api call from happing
    return false;
}