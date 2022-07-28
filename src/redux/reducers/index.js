import {combineReducers} from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import pushNotificationReducer from './pushNotificationReducer';
import notificationReducer from './notificationReducer';
import helpReducer from './helpReducer';
import comicReducer from './comicReducer';
import songReducer from './songReducer';

export default combineReducers({
   auth:    authReducer,
   alert:   alertReducer,
   help: helpReducer,
   comic:  comicReducer,
   song: songReducer,
   pushNotification: pushNotificationReducer,
   notification: notificationReducer,
});
