import * as React from "react";
import PropTypes, { InferProps } from 'prop-types';
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import SolidRectangleButton from "./SolidRectangleButton";
import { SITE_COLOR, WHITE } from "../style";

function DialogModal({ modalVisible, modalControl, title, onClose, onCancel, onConfirm, defaultText, message, cancelButtonText, confirmButtonText }: InferProps<typeof DialogModal.propTypes>) {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => onClose()}>
            <View style={styles.modalBackground}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.textStyle} >{title ?? ''}</Text>
                        <Text style={styles.modalText}>{defaultText ?? 'Do you wish to proceed?'}</Text>
                        <Text style={styles.modalText}>{message ?? ''}</Text>

                        <View style={styles.buttonRow}>
                            <SolidRectangleButton style={SolidModalRectangleStyles} title={cancelButtonText ?? 'cancel'} onPress={() => { onCancel(); onClose(); modalControl(false); }} />
                            {/* <Pressable style={[styles.button, styles.buttonCancel]} onPress={() => { onCancel(); onClose(); modalControl(false);}}>
                            <Text style={styles.textStyle}>{cancelButtonText ?? 'cancel'}</Text>
                        </Pressable> */}

                            <SolidRectangleButton style={SolidModalRectangleStylesOne} title={confirmButtonText ?? 'confirm!'} onPress={() => { onConfirm(); onClose(); modalControl(false); }} />

                            {/* <Pressable style={[styles.button, styles.buttonConfirm]} onPress={() => { onConfirm(); onClose(); modalControl(false); }}>
                            <Text style={styles.textStyle}>{confirmButtonText ?? 'confirm!'}</Text>
                        </Pressable> */}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DialogModal;

// PropTypes
DialogModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    modalControl: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    defaultText: PropTypes.string,
    message: PropTypes.string,
    cancelButtonText: PropTypes.string,
    confirmButtonText: PropTypes.string,
}

const SolidModalRectangleStylesOne = StyleSheet.create({
    button: {
        width: '40%',
        padding: '3.5%',
        borderRadius: 10
    }
})

const SolidModalRectangleStyles = StyleSheet.create({
    button: {
        width: '40%',
        padding: '3.5%',
        backgroundColor: WHITE,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: SITE_COLOR
    },
    buttonText: {
        color: SITE_COLOR
    }
})

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalBackground: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingTop: '60%',
        paddingBottom: '50%'
    },
    buttonRow: {
        alignSelf: 'center',
        width: '95%',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginLeft: '3%',
        marginRight: '3%',
    },
    buttonCancel: {
        backgroundColor: "#2196F3",
    },
    buttonConfirm: {
        backgroundColor: "#D14522",
    },
    textStyle: {
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});