import * as React from "react";
import PropTypes from 'prop-types';
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";

import { LIGHT_GRAY, SITE_COLOR, WHITE, LIGHT_PINK, PINK, BLACK } from "../../style";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SolidRectangleButton from "../../reuseable/SolidRectangleButton";

export const ImagePickerModal = ({ modalVisible, modalControl, title, edit, onClose, onCancel, onConfirm, defaultText, message, cancelButtonText, confirmButtonText, onRemove }) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => onClose()}>
            <View style={edit ? styles.modalBackgroundEdit : styles.modalBackground}>
                {/* <View style={styles.centeredView}> */}
                <View style={styles.modalView}>
                    <View style={styles.header} >
                        <Text style={styles.textHeader}>{title ?? 'Upload'}</Text>

                        <TouchableOpacity onPress={() => { onClose() }} style={styles.backCircle} >
                            <Icon style={styles.icon} onPress={() => { onClose(); modalControl(false); }} name="close" size={20} color={BLACK} />
                        </TouchableOpacity>

                    </View>

                    <View style={styles.buttonColumn}>
                        {/* <SolidRectangleButton style={SolidModalRectangleStyles} title={cancelButtonText ?? 'cancel'} onPress={() => { onCancel(); onClose(); modalControl(false); }} /> */}
                        <Pressable style={[styles.button, styles.buttonCancel]} onPress={() => { onCancel(); }}>
                            <Text style={styles.textStyle}>{cancelButtonText ?? 'cancel'}</Text>
                        </Pressable>
                        {/* <View style={styles.hr}></View> */}
                        {/* <SolidRectangleButton style={SolidModalRectangleStylesOne} title={confirmButtonText ?? 'confirm!'} onPress={() => { onConfirm(); onClose(); modalControl(false); }} /> */}
                        {
                            edit ?
                                <>
                                    <Pressable style={[styles.button, styles.buttonConfirm]} onPress={() => { onConfirm(); }}>
                                        <Text style={styles.textStyle}>{confirmButtonText ?? 'confirm!'}</Text>
                                    </Pressable>

                                    <SolidRectangleButton
                                        style={SolidRectangleStyles}
                                        title={'Remove Photo'}
                                        onPress={() => { onRemove(); modalControl(false) }} />
                                </>
                                :
                                <>
                                    <Pressable style={[styles.button, styles.buttonNew]} onPress={() => { onConfirm(); }}>
                                        <Text style={styles.textStyleNew}>{confirmButtonText ?? 'confirm!'}</Text>
                                    </Pressable>
                                </>

                        }

                    </View>
                </View>
                {/* </View> */}
            </View>
        </Modal>
    );
};

// PropTypes
ImagePickerModal.propTypes = {
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


const SolidRectangleStyles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 16,
        marginVertical: '3%',
        borderRadius: 16,
        backgroundColor: LIGHT_PINK,
    },
    buttonText: {
        color: PINK,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20
    }
})

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalBackground: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingTop: hp('67%'),
        paddingBottom: '0%'
    },
    modalBackgroundEdit: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingTop: hp('60%'),
        paddingBottom: '0%'
    },
    modalView: {
        elevation: 5,
        width: '100%',
        height: '100%',
        padding: '6%',
        borderRadius: 20,
        backgroundColor: "white",
    },
    buttonColumn: {

        flexDirection: 'column',
        justifyContent: 'space-between',
        marginVertical: '5%',
    },
    button: {
        borderRadius: 16,
        padding: '5%',


        elevation: 2,
        marginBottom: '2%',
        marginTop: '2%',
    },
    buttonCancel: {
        backgroundColor: '#F7F7F7',
    },
    buttonConfirm: {
        backgroundColor: '#F7F7F7',
    },
    buttonNew: {
        backgroundColor: '#E5F7FD',
    },
    textStyleNew: {

        fontSize: 16,
        color: 'rgba(29, 113, 185, 0.7)',
        lineHeight: 18,

        textAlign: "center",
        fontFamily: 'gilroy-semiBold'
    },
    textStyle: {

        fontSize: 16,
        color: BLACK,
        lineHeight: 18,

        textAlign: "center",
        fontFamily: 'gilroy-semiBold'
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    hr: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: '3%',
        borderBottomColor: LIGHT_GRAY,
    },
    header: {
        flexDirection: 'row',

        justifyContent: 'space-between',


    },
    textHeader: {

        flex: 1,


        fontStyle: 'normal',
        fontFamily: 'gilroy-bold',
        fontSize: 24,
        lineHeight: 28,

    },
    icon: {
        alignSelf: 'center',


    },
    backCircle: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        borderRadius: 150 / 2,
        alignSelf: 'center',
        backgroundColor: '#F7F7F7',

    },
});