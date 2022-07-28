import React, { useState } from 'react';

import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { updatePassword } from '../../redux/actions/authActions';
import { useAppDispatch } from '../../redux/actions/constants';
import InputSecureText from '../../reuseable/InputSecureText';
import SolidRectangleButton from '../../reuseable/SolidRectangleButton';
import { BLACK, SITE_COLOR } from '../../style';

export default function ChangePasswordScreen({ navigation }) {

    const dispatch = useAppDispatch()

    const [disabled, setDisabled] = useState(true)

    const [input, setInput] = useState({
        old_password: '',
        new_password: '',
        new_password_confirmation: ''
    });

    React.useEffect(() => {
        disableCheck()
    }, [input])

    function disableCheck() {

        if (Object.keys(input).find(a => input[a] === '')) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }

    }

    return (

        <>
            <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: wp(3) }} >

                <Text style={styles.mediumText} >Proceed to changing your password by entering the old password and then the new password.</Text>

                <View style={styles.article}>
                    <InputSecureText label={'Old Password'} style={InputStyle} placeholder={'Enter your old password'} returnInput={value => setInput({ ...input, old_password: value })} />
                </View>

                <View style={styles.article}>
                    <InputSecureText label={'New Password'} style={InputStyle} placeholder={'Enter your new password'} returnInput={value => setInput({ ...input, new_password: value })} />
                </View>

                <View style={styles.article}>
                    <InputSecureText label={'Confirm New Password'} style={InputStyle} placeholder={'Confirm your new password'} returnInput={value => setInput({ ...input, new_password_confirmation: value })} />
                </View>

                <SolidRectangleButton style={ButtonStyle} disabled={disabled} title='Update' onPress={() => dispatch(updatePassword({ ...input }, (value) => value && navigation.goBack()))} />

            </ScrollView>

        </>

    );
}

const InputStyle = StyleSheet.create({
    inputFence: {
        borderWidth: 0,
        backgroundColor: 'rgba(29, 113, 185, 0.04)',
        marginLeft: '1%',
        marginRight: '1%',
    },
    input: {
        color: BLACK,
        fontSize: 14,
        lineHeight: 16,
        fontFamily: 'gilroy-regular',
    }
});

const ButtonStyle = StyleSheet.create({
    button: {
        backgroundColor: SITE_COLOR,
        marginVertical: 32,
        padding:'3.5%',
        borderRadius:10,
        width: '100%',
    }
})


const styles = StyleSheet.create({
    mediumText: {
        fontSize: hp(2),
        fontFamily: 'gilroy-semiBold',
        marginVertical: hp(2),
        lineHeight: hp(3),
        letterSpacing: 0.5,

    },
    article: {
        marginVertical: '3%'
    },

})