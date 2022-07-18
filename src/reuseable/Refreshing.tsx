import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { BLACK, SITE_COLOR } from '../style';
import { FadeInOut } from '../animation/FadeInOut';
import  SkeletonIndexlLoader  from './SkeletonLoader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

function Refreshing({Svg, title, message, lastText}: InferProps<typeof Refreshing.propTypes>)  {

    const [notfound, setNotfound] = React.useState(false);

    React.useEffect(() => {
        const setTimeOut = setTimeout(() => {
            setNotfound(true);
        }, 10000);

        return ()=>clearTimeout(setTimeOut);
    }, []);

    return (
        <View style={styles.loading}>
            {notfound?
                 <View style={styles.image}>
                 <Svg height={200} width={200} />
             </View>
            :

            [1,2,3,4].map((n) => <SkeletonIndexlLoader key={n} />)
                // <FadeInOut>
                //    <Icon name={iconName} size={iconSize} color={iconColor} style={styles.image} />
                // </FadeInOut>
            }
            {notfound && 
            (
            <>
            <Text style={[styles.textLarge, styles.alignCenter]}>{title ?? null}</Text>
            <Text style={[styles.textMedium, styles.alignCenter]}>{message?? null} <Text style={styles.textOrange} >{lastText??null}</Text></Text>
            </>
            )}
        </View>
    )
}

// PropTypes
Refreshing.propTypes = {
    title:PropTypes.string,
    message:PropTypes.string,
    lastText:PropTypes.string,
    Svg:PropTypes.elementType
}

const styles = StyleSheet.create({
    alignCenter:{
        alignSelf:'center',
        textAlign:'center'
    },
    image: {
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: hp(7),
       
    },
    textLarge:{
        fontFamily:"gilroy-bold",
        fontSize: 24,
        paddingHorizontal: '5%',
        color:SITE_COLOR,
        marginTop: hp(2),
    },
    textOrange:{
        color:SITE_COLOR,
    },
    textMedium:{
        fontFamily: "gilroy-regular",
        fontSize: 18,
        color:'#676565',
        paddingHorizontal: '7%',
        marginTop: hp(2),
    },
    loading:{
        marginTop:'5%',
        marginBottom:'10%',
    },
})
