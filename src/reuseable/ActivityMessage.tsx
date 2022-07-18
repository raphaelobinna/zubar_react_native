import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SITE_COLOR_LIGHT } from '../style';
import { unSetActivityMessageAction } from "../redux/actions/alertActions";
import { useAppDispatch, useAppSelector } from '../redux/actions/constants';

export const ActivityMessage = () => {

    interface AlertState {
        alert: any
      }

    const dispatch = useAppDispatch();
    const alertState = useAppSelector((state: AlertState) => state.alert);
    const [modalVisible, setModalVisible] = React.useState(false);
    React.useEffect(() => setModalVisible(alertState.activityModal),[alertState]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}>
            <View style={styles.modalBackground}>

                {alertState.activityLoading && <View style={styles.centeredView}>
                    <ActivityIndicator size="large" color={SITE_COLOR_LIGHT} />
                </View>}

                {alertState.activityMessage && <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{alertState.activityMessage??'Hello World!'}</Text>
                        <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => dispatch(unSetActivityMessageAction())}>
                            <Text style={styles.textStyle}>OK!</Text>
                        </TouchableOpacity>
                    </View>
                </View>}

            </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
