import {combineReducers} from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import pushNotificationReducer from './pushNotificationReducer';
import notificationReducer from './notificationReducer';
import helpReducer from './helpReducer';
import comicReducer from './comicReducer';

export default combineReducers({
   auth:    authReducer,
   alert:   alertReducer,
   help: helpReducer,
   comic:  comicReducer,
   pushNotification: pushNotificationReducer,
   notification: notificationReducer,
});
