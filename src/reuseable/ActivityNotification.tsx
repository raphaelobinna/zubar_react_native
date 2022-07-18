import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LIGHT_BLUE, LIGHT_GREEN, SITE_COLOR_LIGHT, LIGHT_RED, LIGHT_YELLOW, BLACK, WHITE } from '../style';
import { unSetActivityNotificationAction, setActivityNotificationAction } from "../redux/actions/alertActions";
import Toast from 'react-native-root-toast';
import { useAppDispatch, useAppSelector } from '../redux/actions/constants';

export const ActivityNotification = () => {

    const window = Dimensions.get("window");
    const screen = Dimensions.get("screen");
    const dispatch = useAppDispatch();
    const alertState = useAppSelector(state => state.alert);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [dimensions, setDimensions] = React.useState({window, screen});

    React.useEffect(() => {
        setModalVisible(alertState.activityNotification);
        Dimensions.addEventListener("change", ({ window, screen }) => setDimensions({ window, screen }));
        return () => {
            Dimensions.removeEventListener("change", ({ window, screen }) => setDimensions({ window, screen }));
        };
    },[alertState]);

    React.useEffect(() => {
        if (modalVisible === true) {

            Toast.show(alertState.activityNotificationData.message,{
                duration:3000,
                position:Math.round(dimensions.window.height*12/100),
                animation:true,
                shadow:true,
                backgroundColor:notificationColor(alertState.activityNotificationData.type),
                opacity:1,
                shadowColor:BLACK,
                textColor:WHITE,
                textStyle:{fontFamily:"gilroy-bold",fontSize: 16},
                hideOnPress:true,
            });

            setTimeout(() => {
                dispatch(unSetActivityNotificationAction());
            }, 3000);
        }
    },[modalVisible]);

    const notificationColor = (type:any) => {
        switch (type) {
            case 'success':
                return LIGHT_GREEN;
            case 'info':
                return LIGHT_BLUE;
            case 'warning':
                return LIGHT_YELLOW;
            case 'danger':
                return LIGHT_RED;
            default:
                return SITE_COLOR_LIGHT;
        }
    }

    return (null);
}

const styles = StyleSheet.create({
   //
});
