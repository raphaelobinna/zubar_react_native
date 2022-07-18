import { validate } from '../helpers/validator';
import { setActivityNotificationAction } from '../redux/actions/alertActions';

export const commentOnRemittedCourierOrderValidation = (dispatch, payLoad) => {
    let data = {
        id:payLoad.courier_order_id, 
        comment:payLoad.comment
    };
    let rules = {
        id:'required',
        comment:'required|minSize:5'
    }
    let messages = {
        id:{
            required:'an order id is required',
        },
        comment:{
            required:'please add a comment',
            minSize:'comment can not be less than six characters',
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
