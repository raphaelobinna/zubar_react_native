import * as React from 'react';
import { StyleSheet, Pressable, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { GRAY, WHITE } from '../style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerSVG, StarSVG } from '../assets';
import { DrawerActions } from '@react-navigation/native';

export const HeaderRight = ({ navigation }) => {
    const authState = useSelector(state => state.auth);
    const iconSet = () => {

        return (
            <View style={styles.card}>

                <Pressable style={{marginRight:20, flexDirection:'row'}} >
                    <StarSVG />
                    <Icon name="chevron-down" style={{marginTop:4}} size={14} color={GRAY} />
                </Pressable>

                <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} >
                    <DrawerSVG />
                </Pressable>



            </View>
        )

    }

    return (
        <React.Fragment>
            {iconSet()}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight:15
    },
    icon: {
        marginRight: 10,
        paddingRight: '8%',
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 55 / 2,
    },
});
