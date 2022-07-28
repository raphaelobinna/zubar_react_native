import React, { useState } from 'react';

import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import { HeaderLeft } from '../../header/HeaderLeft';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { PaperBoardLayout } from '../../layouts/PaperBoardLayout';
import { BLACK, GRAY, LIGHT_RED, SITE_COLOR, WHITE } from '../../style';
import InputText from '../../reuseable/InputText';
import InputTextArea from '../../reuseable/InputTextArea';
import InputImage from '../../reuseable/InputImage';
import { Audio } from 'expo-av'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Controller from '../player/MusicController';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons'
import { useAppDispatch } from '../../redux/actions/constants';
import { isEmpty } from '../../helpers/helper';
import { storeASongAction } from '../../redux/actions/songActions';
import * as FileSystem from 'expo-file-system';
import base64 from 'react-native-base64'
import axios from 'axios';
import Constants from 'expo-constants';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';



export default function MusicCreate({ navigation }) {

    interface song {
        uri: string,
        title: string,
        author: string,
        name: string,
    }

    const dispatch = useAppDispatch()


    const [song, setSong] = useState<song>();

    const [sound, setSound] = useState<Audio.Sound>();

    const [isPlaying, setIsPlaying] = useState(false);

    const [input, setInput] = useState({
        song_name: '',
        cover_picture: { uri: '' },

    })

    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //       headerShown: true,

    //       headerTitle : () => (<HeaderLeft />)
    //     }); 
    //   }, [navigation]);

    const pickDocument = async () => {
        let options = {
            type: '*/*',
            base64: true,
        }
        let result = await DocumentPicker.getDocumentAsync(options);


        if (result.mimeType !== 'audio/mpeg') {
            alert('Please pick a valid audio file')
            return;
        }
        if (result.type === 'success') {
            setSong(result)
            return;
        }




    }

    const removeSong = () => {
        setSong(undefined)
        sound.unloadAsync();
    }

    const loadAudio = async () => {


        try {

            const playbackInstance = new Audio.Sound()
            const source = {
                uri: song.uri
            }

            const { sound } = await Audio.Sound.createAsync(
                source
            );
            setSound(sound)

        } catch (e) {
            console.log(e)
        }
    }



    const handlePlayPause = async () => {

        isPlaying ? await sound.pauseAsync() : await sound.playAsync()

        setIsPlaying(!isPlaying)
    }

    React.useEffect(() => {

        (async () => {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,

                playsInSilentModeIOS: true,

                shouldDuckAndroid: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: true
            })
        })();

        loadAudio()
    }, [song])

    const onSubmit = async () => {
        if (!isEmpty(input.song_name) && !isEmpty(input.cover_picture.uri) && !isEmpty(song)) {
            Toast.show({
                type: 'info',
                text1: 'Uploading...',
                text2: 'Please wait',
               
               
            });
            // API Key and Secret: Found on the Dashboard of Cloudinary.
            const API_KEY = Constants.manifest.extra.appCloudinaryApiKey;
            const API_SECRET = Constants.manifest.extra.appCloudinaryApiSecret

            const URL = `https://api.cloudinary.com/v1_1/${Constants.manifest.extra.appCloudinaryCloudName}/upload`;

          
            var fd = new FormData();

            fd.append("upload_preset", `${Constants.manifest.extra.appCloudinaryUploadPreset}`);

            const base64S: string = await FileSystem.readAsStringAsync(song.uri, { encoding: FileSystem.EncodingType.Base64 });

            fd.append("file", `data:audio/mpeg;base64,${base64S}`);

          
            await axios
                .post(URL, fd, {
                    headers: {
                        Authorization: base64.encode(`${API_KEY}:${API_SECRET}`),
                    },
                })
                .then(res =>
                   
                    dispatch(storeASongAction({ ...input, song: res.data.url, song_cloud_id: res.data.public_id }, (value) => value && navigation.goBack()))
                )
                .catch(error =>{
                   
                    Toast.show({
                        type: 'errorToast',
                        text1: "Error",
                        text2: `Something went wrong`,
                    })
                }
                );

        }
    }

    return (

        <PaperBoardLayout style={Container} navigation={navigation} >

            <ScrollView>
                <View style={styles.article}>
                    <InputText label={'Name'} style={InputStyle} placeholder={'Enter name of your song'} returnInput={value => setInput({ ...input, song_name: value })} />
                </View>

                <View style={styles.imageContainer}>

                    <InputImage title={'Upload Cover Picture'} edit={false} onRemove={() => { }} returnInput={(value) => value && setInput({ ...input, cover_picture: value })} >
                        <>
                            <View style={styles.plusCircle}>
                                <Icon style={{ alignSelf: 'center' }} name="plus" size={30} color={SITE_COLOR} />
                            </View>

                            <Text style={styles.coverText} >Add Cover picture</Text>
                        </>
                    </InputImage>

                </View>

                <View style={styles.songContainer}>



                    {
                        song ?
                            <>
                                <TouchableOpacity onPress={() => removeSong()} style={styles.playCircle}>
                                    <Icon name='delete-circle-outline' size={38} color={LIGHT_RED} />

                                    <Text style={styles.songText} >Remove {song.name}</Text>
                                </TouchableOpacity>
                            </>
                            :
                            <>
                                <TouchableOpacity onPress={() => pickDocument()} style={styles.playCircle}>
                                    <Ionicons name='ios-play-circle' size={38} color='rgba(29, 113, 185, 0.4)' />

                                    <Text style={styles.songText} >Pick a Song</Text>
                                </TouchableOpacity>
                            </>
                    }





                </View>


                <TouchableOpacity onPress={() => song && handlePlayPause()} style={{ height: hp(20), justifyContent: 'center' }}  >
                    <Image style={{ height: '100%', width: '100%' }} resizeMode={'cover'} source={{ uri: input.cover_picture.uri }} />

                    {
                        song &&
                        <View style={styles.pauseBtn} >
                            {isPlaying ? (
                                <Ionicons name='ios-pause' size={48} color='#444' />
                            ) : (
                                <Ionicons onPress={() => handlePlayPause()} name='ios-play-circle' size={48} color='#444' />
                            )}
                        </View>
                    }



                </TouchableOpacity>

                <TouchableOpacity style={styles.floatingIcon} onPress={() => onSubmit()} >
                    <Icon name="cloud-upload" size={50} color={(isEmpty(input.cover_picture.uri) || isEmpty(song) || isEmpty(input.song_name)) ? GRAY : SITE_COLOR} />
                </TouchableOpacity>

            </ScrollView>

        </PaperBoardLayout>

    );
}

const Container = StyleSheet.create({
    container: {
        paddingHorizontal: wp(5),
    }
});

const InputStyle = StyleSheet.create({
    inputFence: {
        borderWidth: 0,
        backgroundColor: 'rgba(29, 113, 185, 0.04)',
        marginLeft: '1%',
        marginRight: '1%',
    },
    input: {
        color: BLACK,
        fontSize: 14,
        lineHeight: 16,
        fontFamily: 'gilroy-regular',
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        paddingTop: 60,
        paddingHorizontal: 28,
    },
    article: {
        marginVertical: '3%'
    },
    svg: {
        marginBottom: hp(5),
        alignSelf: 'center'
    },
    largeText: {
        fontSize: hp(5),
        fontFamily: 'gilroy-bold',

        color: BLACK,
        marginBottom: 32
    },
    boldText: {
        fontFamily: 'gilroy-bold',
        color: SITE_COLOR
    },
    smallText: {
        fontSize: hp(2),
        textAlign: 'center',
        fontFamily: 'gilroy-regular',
        color: GRAY,

    },
    plusCircle: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: hp(5),
        backgroundColor: 'rgba(29, 113, 185, 0.04)',
        width: hp(5),
        borderRadius: hp(5),

    },
    playCircle: {
        alignSelf: 'flex-start',
        height: hp(5),

        alignItems: 'center',
        borderRadius: hp(5),
        flexDirection: 'row'

    },
    imageContainer: {
        height: hp(15),
        width: wp(90),
        borderWidth: 2,
        marginVertical: 15,
        borderStyle: 'dashed',
        borderColor: 'rgba(29, 113, 185, 0.4)',
        borderRadius: hp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },

    songContainer: {
        height: hp(7),
        width: wp(90),
        borderWidth: 2,
        marginBottom: 10,
        borderStyle: 'dashed',
        borderColor: 'rgba(29, 113, 185, 0.4)',
        borderRadius: hp(2),
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: hp(2),
    },

    imageSingle: {
        height: hp(15),
        width: wp(50),
        borderRadius: 10,

    },
    coverText: {
        textAlign: 'center',
        fontSize: hp(2),
        fontFamily: 'gilroy-regular',
        color: GRAY,
    },
    songText: {
        textAlign: 'center',
        fontSize: hp(2),
        marginLeft: hp(2),
        fontFamily: 'gilroy-regular',
        color: GRAY,
    },
    pauseBtn: {
        position: 'absolute',
        alignSelf: 'center'
    },
    floatingIcon: {
        position: 'absolute',
        top: hp('60%'),
        right: wp('5%'),
    }
})