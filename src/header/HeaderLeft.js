import * as React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
//import { useSelector } from 'react-redux';
import { GRAY, SITE_COLOR, WHITE } from '../style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LogoSVG } from '../assets';

export const HeaderLeft = () => {

    return (
        <React.Fragment>
          <View style={styles.card}>
                <LogoSVG height={27}  />
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        paddingLeft: 16,
    },
    icon: {
        paddingLeft: '1%',
        paddingRight: '1%',
        marginLeft: 20
    },
    greetings: {
        fontStyle: 'normal',
        fontWeight: '700',
        fontFamily: 'gilroy-bold',
        fontSize: 18,
        lineHeight: 22
    },
    textSmall: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontFamily: 'gilroy-regular',
        fontSize: 14,
        lineHeight: 22
    }
});
