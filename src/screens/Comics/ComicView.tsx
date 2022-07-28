import React, { useState } from 'react';

import { View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { GRAY, WHITE } from '../../style';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function ComicView({ navigation, route }) {

    const { comic } = route.params;   // comic is an array of objects

    const [index, setIndex] = useState(0);

    const b =Object.keys(comic).length;

    function lastPictureCalculator() {
        if (index === comic.length - 1) {
            setIndex(0);
        }

    }

    function nextPictureCalculator() {
       
       
        if (index === b - 1) {
           
            setIndex(0);
        } else {
            setIndex(index + 1);
        } 
    }

    function previousPictureCalculator() {
        if (index === 0) {
            setIndex(comic.length - 1);
        } else {
            setIndex(index - 1);
        }
    }

    return (

        <>
            <Image source={{ uri: route.params.comic[index].link }} resizeMode={'cover'} style={{ width: '100%', height: '100%' }} />
          
                <Icon style={{ position: 'absolute', top:hp('50%'), left:wp(4) }} name='leftcircle' size={40} color={WHITE} onPress={() => previousPictureCalculator()}  />

                <Icon style={{ position: 'absolute', top:hp('50%'), right:wp(4) }} name='rightcircle' size={40} color={WHITE} onPress={() => nextPictureCalculator()} />
           
        </>

    );
}