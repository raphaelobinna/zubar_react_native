import React, { useState } from 'react';

import { View, Text, StyleSheet, RefreshControl, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { PaperBoardLayout } from '../../layouts/PaperBoardLayout';
import { getAllComicsAction } from '../../redux/actions/comicActions';
import { useAppDispatch, useAppSelector } from '../../redux/actions/constants';
import SearchBar from '../../reuseable/SearchBar';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { HeaderLeft } from '../../header/HeaderLeft';
import AuthorizationMonitor from '../../reuseable/AuthorizationMonitor';
import { SITE_COLOR } from '../../style';
import { ContentPickModal } from '../../presenters/modals/ContentSelectorModal';
import { Value } from 'react-native-reanimated';
import { getAllSongsAction } from '../../redux/actions/songActions';

export default function HomeScreen({ navigation }) {

    const [, set] = useState();

    const comicState = useAppSelector(state => state.comic);

    const songState = useAppSelector(state => state.song);

    const [refreshing, setRefreshing] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const [selected, setSelected] = useState({
        comic: true,
        music: false,
    })

    const dispatch = useAppDispatch()

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(getAllComicsAction({ page: 1, limit: 10 }))
        setRefreshing(false);
    }, []);

    React.useEffect(() => {
        dispatch(getAllComicsAction({ page: 1, limit: 10 }))
    }, [comicState.shouldReload])

    React.useEffect(() => {
        dispatch(getAllSongsAction({ page: 1, limit: 10 }))
    }, [songState.shouldReload])

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,

            headerTitle: () => (<HeaderLeft />)
        });
    }, [navigation]);





    return (

        <PaperBoardLayout style={Container} navigation={navigation} >
            <AuthorizationMonitor navigation={navigation} />


            <SearchBar
                style={SearchBarStyle}
                placeholder={'Search...'}
                clearSearchResultsAction={() => { }}
                searchAction={(value) => { }}
                filterAction={(value) => setModalVisible(true)}
            />
            <>

                {
                    selected.comic ?
                        <ScrollView
                            refreshControl={<RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[SITE_COLOR]}
                                tintColor={SITE_COLOR}
                            />}
                        >
                            {
                                comicState.comics?.length > 0 && comicState.comics.map((item, index) => (
                                    <TouchableOpacity key={index} style={styles.imageContainer} onPress={() => navigation.navigate('ComicDetail', { comic: { ...item } })} >
                                        <Image style={styles.image} resizeMode={'cover'} source={{ uri: item?.slides[0]?.link }} />
                                        <View style={{ marginTop: hp(2) }} >
                                            <Text style={styles.title}>{item?.comic_name}</Text>
                                            <Text style={styles.description}>{item?.description}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                        :
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            refreshControl={<RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[SITE_COLOR]}
                                tintColor={SITE_COLOR}
                            />}
                        >
                            {
                                songState?.songs.length > 0 && songState.songs.map((item, index) => (
                                    <TouchableOpacity key={index} style={styles.musicContainer} onPress={() => navigation.navigate('MusicView', { index: index })} >
                                        <Image style={styles.musicImage} resizeMode={'cover'} source={{ uri: item?.cover_picture }} />
                                        <View style={{ marginTop: hp(1) }} >
                                            <Text style={styles.songName}>{item?.song_name}<Text style={styles.description}>{' by ' + item?.full_name}</Text></Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>

                }

            </>

            <ContentPickModal
                modalVisible={modalVisible}
                modalControl={Value => setModalVisible(Value)}
                title={'Select Content'}
                onClose={() => setModalVisible(false)}
                comicBool={selected.comic}
                musicBool={selected.music}
                onConfirm={(value) => {
                    value === 'comic' ? setSelected({ comic: true, music: false }) : setSelected({ comic: false, music: true })
                }}

            />

        </PaperBoardLayout >

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
        width: wp(40),

        height: '100%',
        marginRight: wp(5),
        borderRadius: 8,
    },
    musicImage: {
        width: wp(39),

        height: '100%',
        marginRight: wp(5),
        borderRadius: 8,
    },
    imageContainer: {
        height: 135,
        marginVertical: hp(2),
        flex: 1,
        flexDirection: 'row'

    },
    scrollContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    musicContainer: { 
        height: 135,
        marginTop: hp(2),
       marginBottom: hp(2),
     
    },
    title: {
        fontSize: hp(2),
        fontWeight: 'bold',
        fontFamily: 'gilroy-semiBold',
        marginBottom: hp(1),
    },
    songName: {
        fontSize: hp(1.5),
        fontWeight: 'bold',
        fontFamily: 'gilroy-semiBold',
        marginBottom: hp(1),
    },
    description: {
        fontSize: hp(1.5),
        fontFamily: 'gilroy-regular',
    }
})