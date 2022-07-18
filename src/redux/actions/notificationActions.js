import Constants from 'expo-constants';
import {
    MY_NOTIFICATION,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import errorHandler from '../../handlers/errorHandler';

const sessionName = Constants.manifest.extra.appSlug+'_notification_list';

export const retrieveNotificationsAction = () => {
    return async (dispatch) => {
        try {

            // Retrieve available messages
            let notificationList = JSON.parse(await AsyncStorage.getItem(sessionName));
            notificationList = notificationList ?? []; 
            dispatch({type: MY_NOTIFICATION, payLoad: notificationList});

        } catch (error) {
            errorHandler(error);
        }
    }
}

export const updateNotificationsAction = (payLoad) => {
    return async (dispatch) => {
        try {

            if (Constants.manifest.extra.appEnvironment === 'development') {
               // console.log('Notification PayLoad',payLoad);
            }

            let content = payLoad.request.content;
            let identifier = payLoad.request.identifier;

            // Retrieve available messages
            let notificationList = JSON.parse(await AsyncStorage.getItem(sessionName));
            notificationList = notificationList ?? [];

            // Remove oldest message if more than 30
            if (notificationList.length > 30) {
                notificationList.shift();
            }

            // Check if notification is not on the list
            if (!notificationList.find(element => element.identifier === identifier)){

                // Add received message and store
                notificationList.push({identifier:identifier, content:content, isRead:false});
            }

            // Dispatch to reducer
            dispatch({type: MY_NOTIFICATION, payLoad: notificationList});

            // Store received message
            return await AsyncStorage.setItem(sessionName, JSON.stringify(notificationList));

        } catch (error) {
            errorHandler(error);
        }
    }
}

export const markNotificationAsReadAction = (payLoad) => {
    return async (dispatch) => {
        try {

            // Retrieve available messages
            let notificationList = JSON.parse(await AsyncStorage.getItem(sessionName));
            notificationList = notificationList ?? [];

            // Find message with matching Id
            notificationList = notificationList.map((item,key)=>{
                if (item.identifier === payLoad.identifier) {
                    item.isRead = true;
                }
                return item;
            });

            // Dispatch to reducer
            dispatch({type: MY_NOTIFICATION, payLoad: notificationList});

            // Store modified message list
            return await AsyncStorage.setItem(sessionName, JSON.stringify(notificationList));

        } catch (error) {
            errorHandler(error);
        }
    }
}