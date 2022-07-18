import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import * as Uuid from 'uuid';

 export const sessionName = Constants.manifest.extra.appSlug+'_session';

const persistLastLogin = (payLoad) => {
    return AsyncStorage.setItem(sessionName, JSON.stringify(payLoad));
}

const retrievePersistedLastLogin = async () => {
    return JSON.parse(await AsyncStorage.getItem(sessionName));
}

const updatePersistedLastLogin = async (payLoad) => {
    let currentSession = JSON.parse(await AsyncStorage.getItem(sessionName));
    return AsyncStorage.setItem(sessionName, JSON.stringify({
        ...currentSession,
        data:{
            ...currentSession.data,
            data:{
                ...currentSession.data.data,
                ...payLoad.data.data
            }
        }
    }));
}

const destroyLastLogin = () => {
    return AsyncStorage.removeItem(sessionName);
}

const deviceId = async () => {

    // Check if uuid is available
    let uuid = await SecureStore.getItemAsync('secure_device_id');

    // Generate uuid if none exists
    if (!uuid) {
        uuid = JSON.stringify(Uuid.v4());
        await SecureStore.setItemAsync('secure_device_id', uuid);
    }

    return uuid;
}

export {persistLastLogin, retrievePersistedLastLogin, updatePersistedLastLogin, destroyLastLogin, deviceId};