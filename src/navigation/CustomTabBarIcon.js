import * as React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ChatSVG, CreateSVG, HomeSVG, ProfileSVG, SearchSVG } from '../assets';
import { BLACK, SITE_COLOR, WHITE } from '../style';

export const TabImageButton = (props) => {
    const { title, iconName, onPress, accessibilityState, } = props;
    const focused = accessibilityState.selected;

    let SVGImage;
    switch (iconName) {
        case 'home':
            SVGImage = HomeSVG
            break;

        case 'search':
            SVGImage = SearchSVG
            break;

        case 'create':
            SVGImage = CreateSVG
            break;

        case 'inbox':
            SVGImage = ChatSVG
            break;

        case 'profile':
            SVGImage = ProfileSVG
            break;

        default:
            break;
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[focused ? styles.btn : styles.container]}>
            {
                focused ?
                    <>

                        <Text style={styles.btnText} >{title}</Text>
                        <Text style={styles.dot}>.</Text>
                    </>

                    :

                    <>
                        <SVGImage style={styles.image} />
                    </>
            }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.65,
        flexDirection: 'row'
    },
    image: {
        height: 22,
        width: 22
    },
    colorWhite: {
        color: WHITE
    },
    dot: {
        marginHorizontal: 8,
        color: SITE_COLOR,
        fontSize: 25,
        marginBottom: -4,
        fontWeight: 'bold'
    },
    btn: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',

    },
    btnText: {
        color: SITE_COLOR,
        fontSize: 14,
        marginHorizontal: 5,
        fontFamily: 'gilroy-semiBold',
        lineHeight: 15,
        alignSelf: 'center',
        fontWeight: '600',
    }
})