import React, { useState } from 'react';

import { View, ImageBackground, Text, Image, StyleSheet } from 'react-native';
import { FadeInOut } from '../../animation/FadeInOut';
import { LogoSVG } from '../../assets';
import { isEmpty } from '../../helpers/helper';
import { restoreLoggedInUserAction } from '../../redux/actions/authActions';
import { useAppDispatch, useAppSelector } from '../../redux/actions/constants';

export default function WelcomeScreen({ navigation }) {

    const [, set] = useState();

    const dispatch = useAppDispatch();
    const authState = useAppSelector(state => state.auth);

    const isRestored = (user) => {

        setTimeout(() => {
            if (user.id) {
                return navigation.replace('Drawer');
            } else {
                return navigation.replace('Login');
            }
        }, 3000);
    }


    React.useEffect(() => {
        if (!isEmpty(authState.user)) {
            return navigation.replace('Drawer');
        } else {
            dispatch(restoreLoggedInUserAction(isRestored));
        }
    }, []);

    return (

        <>
            <View style={{ backgroundColor: 'rgba(29, 113, 185, 0.4)', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >

                <View style={{ alignSelf: 'center' }} >
                    <FadeInOut >
                        <LogoSVG height={300} width={300} />
                    </FadeInOut>
                </View>

            </View>

        </>

    )

}