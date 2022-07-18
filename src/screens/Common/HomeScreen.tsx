import React, { useState } from 'react';

import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { PaperBoardLayout } from '../../layouts/PaperBoardLayout';
import { getAllComicsAction } from '../../redux/actions/comicActions';
import { useAppDispatch, useAppSelector } from '../../redux/actions/constants';
import SearchBar from '../../reuseable/SearchBar';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { HeaderLeft } from '../../header/HeaderLeft';

export default function HomeScreen({ navigation }) {

    const [, set] = useState();

    const comicState = useAppSelector(state => state.comic);

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(getAllComicsAction({ page: 1, limit: 10 }))
    }, [])

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: true,
          
          headerTitle : () => (<HeaderLeft />)
        }); 
      }, [navigation]);


    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('Detail')}>
                <Image style={styles.image} source={{ uri: item.slides[0].link }} />
            </TouchableOpacity>
        )
    }

    return (

        <PaperBoardLayout style={Container} navigation={navigation} >

            <SearchBar
                style={SearchBarStyle}
                placeholder={'Search...'}
                clearSearchResultsAction={() => { }}
                searchAction={(value) => { }}
            />

            <FlatList
                data={comicState.comics}
                numColumns={3}
                renderItem={renderItem}
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

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    imageContainer: {
        height: 135,
        width: 86
    }
})