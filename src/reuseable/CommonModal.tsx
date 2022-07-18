import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';

function CommonModal({modalVisible, modalControl, onClose, defaultText, buttonText}: InferProps<typeof CommonModal.propTypes>) {

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => onClose()}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{defaultText ?? 'Please Try Again'}</Text>
                    <Pressable style={[styles.button, styles.buttonClose]} onPress={() => modalControl(false)}>
                        <Text style={styles.textStyle}>{buttonText ?? 'Ok!'}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default CommonModal;

// PropTypes
CommonModal.propTypes = {
    modalVisible:PropTypes.bool.isRequired,
    modalControl:PropTypes.func.isRequired,
    onClose:PropTypes.func.isRequired,
    defaultText:PropTypes.string,
    buttonText:PropTypes.string,
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2
        },
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
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    }
});