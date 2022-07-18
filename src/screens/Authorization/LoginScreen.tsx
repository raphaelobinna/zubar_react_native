import React, { useState } from 'react';

import { View, StyleSheet, Text } from 'react-native'
import { LoginSVG } from '../../assets';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BLACK, GRAY, SITE_COLOR, WHITE } from '../../style';
import InputText from '../../reuseable/InputText';
import InputSecureText from '../../reuseable/InputSecureText';
import SolidRectangleButton from '../../reuseable/SolidRectangleButton';
import { useAppDispatch, useAppSelector } from '../../redux/actions/constants';
import { loginUserAction } from '../../redux/actions/authActions';
import { isEmpty } from '../../helpers/helper';

export default function LoginScreen({ navigation }) {

    const dispatch = useAppDispatch()

    const authState = useAppSelector(state => state.auth)

    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const [disabled, setDisabled] = useState(true)

    React.useEffect(() => {
        disableCheck()
    }, [input])

    React.useEffect(() => {
        if (!isEmpty(authState.user)) {

            return navigation.navigate('Drawer')
        }
    }, [authState]);

    function disableCheck() {

        if (Object.keys(input).find(a => input[a] === '')) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }

    }

    return (

        <View style={styles.container} >

            <LoginSVG height={hp(20)} style={styles.svg} width={wp(80)} />

            <Text style={styles.largeText} >Sign-in</Text>

            <View style={styles.article}>
                <InputText label={'Email'} style={InputStyle} placeholder={'Enter your email'} returnInput={value => setInput({ ...input, email: value.trim().toLowerCase() })} />
            </View>

            <View style={styles.article}>
                <InputSecureText label={'Password'} style={InputStyle} placeholder={'Enter your password'} returnInput={value => setInput({ ...input, password: value })} />
            </View>

            <SolidRectangleButton style={ButtonStyle} disabled={disabled} title='Sign-in' onPress={() => dispatch(loginUserAction({ ...input }))} />

            <Text style={styles.smallText} >Forgot Password?</Text>

            <Text style={styles.smallText} >Don't have an account? <Text onPress={() => navigation.navigate('Register')} style={styles.boldText} >Sign-up</Text></Text>

        </View>

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
    container: {
        flex: 1,
        backgroundColor: WHITE,
        paddingTop: 60,
        paddingHorizontal: 28,
    },
    article: {
        marginVertical: '3%'
    },
    svg: {
        marginBottom: hp(5),
        alignSelf: 'center'
    },
    largeText: {
        fontSize: hp(5),
        fontFamily: 'gilroy-bold',

        color: BLACK,
        marginBottom: 32
    },
    boldText: {
        fontFamily: 'gilroy-bold',
        color: SITE_COLOR
    },
    smallText: {
        fontSize: hp(2),
        textAlign: 'center',
        fontFamily: 'gilroy-regular',
        color: GRAY,

    }
})