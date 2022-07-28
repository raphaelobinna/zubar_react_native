import React, { useState } from 'react';

import { View, StyleSheet, Text, TouchableOpacity, Switch } from 'react-native'
import { PaperBoardLayout } from '../../layouts/PaperBoardLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LIGHT_GRAY, WHITE } from '../../style';
import { useAppDispatch, useAppSelector } from '../../redux/actions/constants';
import AuthorizationMonitor from '../../reuseable/AuthorizationMonitor';
import { getUserProfile } from '../../redux/actions/authActions';

export default function ProfileScreen({ navigation }) {

    const authState = useAppSelector(state => state.auth)

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);

    }

    const dispatch = useAppDispatch();

    React.useEffect(() => {
       dispatch(getUserProfile());
    }, [authState.user]);

    return (

        <PaperBoardLayout style={Container} navigation={navigation} >
            <AuthorizationMonitor navigation={navigation} />

            <Icon name="account-circle" style={{ alignSelf: 'center' }} size={100} color={'rgba(78, 6, 151, 1)'} />
            <Text style={styles.mediumText} >{authState.user.full_name}</Text>

            <View style={styles.box} >
                <Text style={styles.normalText} >Join the Rankings</Text>

                <Switch
                    trackColor={{ false: "#767577", true: "rgba(78, 6, 151, 1)" }}
                    thumbColor={isEnabled ? WHITE : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                   
                    value={isEnabled}
                />

            </View>

            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('ChangePassword')} >
                <Text style={styles.normalText} >Change Password</Text>

                <Icon name="chevron-right" style={{ alignSelf: 'center' }} size={30} color={'rgba(78, 6, 151, 1)'} />

            </TouchableOpacity>

            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('StatsView')} >
                <Text style={styles.normalText} >Zubar Stats</Text>

                <Icon name="chevron-right" style={{ alignSelf: 'center' }} size={30} color={'rgba(78, 6, 151, 1)'} />

            </TouchableOpacity>

        </PaperBoardLayout>

    );
}

const Container = StyleSheet.create({
    container: {
        paddingHorizontal: wp(5),
       
    }
})


const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
        paddingVertical: wp(3),
        borderRadius: 16,
       
        backgroundColor: 'rgba(29, 113, 185, 0.04)',
        marginVertical: wp(4),
    }, 
    mediumText:{
        fontSize: hp(2.5),
        fontFamily: 'gilroy-bold',
        alignSelf: 'center',
        marginBottom: wp(2),
    },
    normalText:{
        fontSize: hp(2),
        fontFamily: 'gilroy-regular',
        alignSelf: 'center',
    }
})