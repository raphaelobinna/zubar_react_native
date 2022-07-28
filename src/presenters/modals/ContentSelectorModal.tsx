import * as React from "react";
import PropTypes from 'prop-types';
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";

import { LIGHT_GRAY, SITE_COLOR, WHITE, LIGHT_PINK, PINK, BLACK } from "../../style";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SolidRectangleButton from "../../reuseable/SolidRectangleButton";

export const ContentPickModal = ({ modalVisible, modalControl, title, onClose, onConfirm, comicBool, musicBool }) => {

    const [comic, setComic] = React.useState(comicBool);
    const [music, setMusic] = React.useState(musicBool);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => onClose()}>
            <View style={styles.modalBackground}>
                {/* <View style={styles.centeredView}> */}
                <View style={styles.modalView}>
                    <View style={styles.header} >
                        <Text style={styles.textHeader}>{title ?? 'Pick a Choice'}</Text>

                        <TouchableOpacity onPress={() => { onClose() }} style={styles.backCircle} >
                            <Icon style={styles.icon} onPress={() => { onClose(); modalControl(false); }} name="close" size={20} color={BLACK} />
                        </TouchableOpacity>

                    </View>

                    <View style={styles.buttonColumn}>
                        <View style={{ flexDirection: 'row' }} >
                            {
                                comic ?
                                    <Icon style={styles.radioIcon} name="radiobox-marked" size={30} color={SITE_COLOR} />
                                    :
                                    <Icon style={styles.radioIcon} onPress={() => { setComic(true); setMusic(false); onConfirm('comic'); onClose() }} name="radiobox-blank" size={30} color={SITE_COLOR} />
                            }
                            <Text style={styles.textStyle} >Comics</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginVertical:'4%' }} >
                            {
                                music ?
                                    <Icon style={styles.radioIcon} name="radiobox-marked" size={30} color={SITE_COLOR} />
                                    :
                                    <Icon style={styles.radioIcon} onPress={() => { setMusic(true); setComic(false); onConfirm('music'); onClose() }} name="radiobox-blank" size={30} color={SITE_COLOR} />
                            }
                            <Text style={styles.textStyle} >Songs</Text>
                        </View>

                    </View>
                </View>
                {/* </View> */}
            </View>
        </Modal>
    );
};

// PropTypes
ContentPickModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    modalControl: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    comicBool: PropTypes.bool,
    musicBool: PropTypes.bool,
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
        paddingTop: hp('72%'),
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

        fontSize: hp(2.5),
        color: BLACK,
       alignSelf: 'center',

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
    radioIcon: {
        alignSelf: 'center',
        marginRight: '5%',
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