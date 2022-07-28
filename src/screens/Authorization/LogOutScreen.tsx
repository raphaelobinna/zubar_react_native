import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { isEmpty } from '../../helpers/helper';
import { PaperBoardLayout } from '../../layouts/PaperBoardLayout';
import { FadeInOut } from '../../animation/FadeInOut';
import { LogoSVG } from '../../assets';
import { WHITE } from '../../style';
import { logoutUserLocallyAction } from '../../redux/actions/unAuthActions';
import { useAppDispatch, useAppSelector } from '../../redux/actions/constants';

export const LogoutScreen = ({ route, navigation }) => {

    const dispatch = useAppDispatch();
    const authState = useAppSelector(state => state.auth);

    React.useEffect(() => {
        //dispatch(logoutUserLocallyAction());
        dispatch(logoutUserLocallyAction());
    }, []);

    React.useEffect(() => {
        if (isEmpty(authState.user) || isEmpty(authState.token)) {
            navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
        }
    }, [authState]);

    return (
        <PaperBoardLayout navigation={navigation} style={GlassBoardLayoutStyles}>
            <FadeInOut >
                <LogoSVG height={300} width={300} />
            </FadeInOut>
        </PaperBoardLayout>
    );
}

const GlassBoardLayoutStyles = StyleSheet.create({
    container: {
        backgroundColor: WHITE,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 0,
    }
});