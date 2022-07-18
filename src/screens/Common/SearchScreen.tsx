import React, { useState } from 'react';

import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { PaperBoardLayout } from '../../layouts/PaperBoardLayout';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SearchBar from '../../reuseable/SearchBar';
import { HeaderLeft } from '../../header/HeaderLeft';


export default function SearchScreen({ navigation }) {

    const [, set] = useState();

    

    return (

        <PaperBoardLayout style={Container} navigation={navigation} >

            <SearchBar
                style={SearchBarStyle}
                placeholder={'Search...'}
                clearSearchResultsAction={() => { }}
                searchAction={(value) => { }}
            />

        </PaperBoardLayout>

    );
}

const Container = StyleSheet.create({
    container: {
        paddingHorizontal: wp(5),
    }
})

const SearchBarStyle = StyleSheet.create({
    inputFence: {
        width: '100%',
        borderRadius: 0,
        borderWidth: 0,
        alignSelf: 'center',

        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        elevation: 5,
        shadowRadius: 3,
    }
})
