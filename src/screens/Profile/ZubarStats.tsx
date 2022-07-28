import React, { useState } from 'react';

import { View, StyleSheet, Text, TouchableOpacity, Switch, ScrollView } from 'react-native'
import { PaperBoardLayout } from '../../layouts/PaperBoardLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LIGHT_GRAY, WHITE } from '../../style';
import { useAppDispatch, useAppSelector } from '../../redux/actions/constants';
import { getUserProfile } from '../../redux/actions/authActions';
import { isEmpty } from '../../helpers/helper';

export default function StatsView({ navigation }) {

    const authState = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();

    // React.useEffect(() => {
    //    dispatch(getUserProfile());
    // }, [authState]);

    // console.log('e dey show ----',authState.myProfile);

    const subtotal = (data) => {
        if (isEmpty(data)) {
            return null;
        }

        return data.map((item) => item.likes)
            .reduce((previousValue, currentValue) => previousValue + currentValue);
    }

    return (

        // <PaperBoardLayout style={Container} navigation={navigation} >
        <>
            <Text style={styles.smallText} >Hello Chris, below are your entire statistics here on Zubar. </Text>
            <Text style={styles.smallText} >Keep the grind going... </Text>
            <ScrollView contentContainerStyle={styles.container} >




                <View style={styles.box} >
                    <Text style={styles.mediumText} >{authState.myProfile?.comics.length??0}</Text>
                    <Text style={styles.normalText} >COMICS</Text>

                </View>

                <View style={styles.box} >
                    <Text style={styles.mediumText} >{authState.myProfile?.musics.length??0}</Text>
                    <Text style={styles.normalText} >SONGS</Text>

                </View>

                <View style={styles.box} >
                    <Text style={styles.mediumText} >{subtotal(authState.myProfile?.comics)}</Text>
                    <Text style={styles.normalText} >COMICS LIKES</Text>
                </View>

                <View style={styles.box} >
                    <Text style={styles.mediumText} >{subtotal(authState.myProfile?.musics)}</Text>
                    <Text style={styles.normalText} >SONGS LIKES</Text>
                </View>

                <View style={styles.box} >
                    <Text style={styles.mediumText} >{subtotal(authState.myProfile?.comics)+subtotal(authState.myProfile.musics)}</Text>
                    <Text style={styles.normalText} >TOTAL LIKES</Text>
                </View>



                <View style={styles.box} >
                    <Text style={styles.mediumText} >--</Text>
                    <Text style={styles.normalText} >COMICS RANK</Text>

                </View>

                <View style={styles.box} >
                    <Text style={styles.mediumText} >--</Text>
                    <Text style={styles.normalText} >SONGS RANK</Text>

                </View>

            </ScrollView>
            </>

        // </PaperBoardLayout>

    );
}

const Container = StyleSheet.create({
    container: {
        paddingHorizontal: wp(5),
        backgroundColor: 'rgba(29, 113, 185, 0.04)',

    }
})


const styles = StyleSheet.create({
    box: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
        paddingVertical: wp(3),
        borderRadius: 16,
        height: hp(10),
        width: wp(40),

        backgroundColor: WHITE,
        margin: wp(2),
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    mediumText: {
        fontSize: hp(2.5),
        fontFamily: 'gilroy-bold',
        alignSelf: 'center',
        marginBottom: wp(2),
    },
    normalText: {
        fontSize: hp(2),
        fontFamily: 'gilroy-regular',
        alignSelf: 'center',
    },
    smallText: {
        fontSize: hp(1.7),
        fontFamily: 'gilroy-regular',
        paddingVertical: wp(2),
        paddingLeft: wp(5),
    }
})