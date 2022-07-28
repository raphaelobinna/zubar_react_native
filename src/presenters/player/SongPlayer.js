import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    Platform,
    Dimensions,
    TouchableOpacity,
    Animated,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import TrackPlayer, {
    usePlaybackState,
    TrackPlayerEvents,
} from 'react-native-track-player';

import SliderComp from './SliderComp';

export default function Player({navigation}) {
    const [songs, setSongs] = useState(null);
    const [songIndex, setSongIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slider = useRef(null);
    const index = useRef(0);
    const [playSong, setPlaySong] = useState(false);

    const music = [{
        title: 'death bed',
        artist: 'Powfu',
        artwork: 'https://images-na.ssl-images-amazon.com/images/I/A1LVEJikmZL._AC_SX425_.jpg',
        url: 'https://sample-music.netlify.app/death%20bed.mp3',
        duration: 2 * 60 + 53,
        id: '1',
      },{
        title: 'bad liar',
        artist: 'Imagine Dragons',
        artwork: 'https://images-na.ssl-images-amazon.com/images/I/A1LVEJikmZL._AC_SX425_.jpg',
        url: 'https://sample-music.netlify.app/Bad%20Liar.mp3',
        duration: 2 * 60,
        id: '2',
        track_number: '2'
      }
     ]

    const setCurrentSong = async () => {
        const current = await TrackPlayer.getCurrentTrack();
        const song = await TrackPlayer.getTrack(current);
        setSongs(song)
    }

    useEffect(() => {
        scrollX.addListener(({ value }) => {
            const val = Math.round(value / width);
            setSongIndex(val);
        });
    })

    const goNext = async () => {
        slider.current.scrollToOffset({
            offset: (index.current + 1) * width,
        });
        await TrackPlayer.play();
    };

    const goPrv = async () => {
        slider.current.scrollToOffset({
            offset: (index.current - 1) * width,
        });

        await TrackPlayer.play();
    };

    useEffect(() => {
        TrackPlayer.skip(music[songIndex].id)
            .then((_) => {
                console.log('changed track');
            })
            .catch((e) => console.log('error in changing track ', e));

        index.current = songIndex;
        setCurrentSong()

        TrackPlayer.play();
    }, [songIndex]);

    useEffect(() => {
        trackPlayer(music)
    }, [playSong]);

    const trackPlayer = (music) => {
        if (playSong) {
            scrollX.addListener(({ value }) => {
                const val = Math.round(value / width);

                setSongIndex(val);
            });

            TrackPlayer.setupPlayer({ waitForBuffer: true }).then(async () => {
                await TrackPlayer.reset();
                await TrackPlayer.add(music);
                TrackPlayer.play();

                const current = await TrackPlayer.getCurrentTrack();
                const song = await TrackPlayer.getTrack(current);
                setSongs(song)

                index.current = current - 1;
                setSongIndex(index.current);

                setTimeout(() => {
                    slider.current.scrollToOffset({
                        offset: index.current * width,
                    });
                }, 300);

                await TrackPlayer.updateOptions(TRACK_PLAYER_CONTROLS_OPTS);
                TrackPlayer.addEventListener(PLAYBACK_TRACK_CHANGED, async (e) => {

                    // if (!isSongList.current) {
                    //     const trackId = (await TrackPlayer.getCurrentTrack()) - 1;
                    //     if (trackId !== index.current) {
                    //         setSongIndex(trackId);
                    //         isItFromUser.current = false;

                    //         if (trackId > index.current) {
                    //             goNext();
                    //         } else {
                    //             goPrv();
                    //         }
                    //         setTimeout(() => {
                    //             isItFromUser.current = true;
                    //         }, 200);
                    //     }
                    // }

                    // TrackPlayer.play();
                    // isPlayerReady.current = true;
                });

                TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_DUCK, (e) => {
                    if (e.paused) {
                        TrackPlayer.pause();
                    } else {
                        TrackPlayer.play();
                    }
                });
            });
        }
    };


    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor: "black"
                },
            ]}>
            <TouchableOpacity style={styles.button} onPress={() => setPlaySong(true)}>
                <View styles={{ flex: 1 }}>
                    <Icon
                        style={{ right: 136, top: 0 }}
                        color="#fff"
                        name="play"
                        size={45}
                    />
                </View>
            </TouchableOpacity>
            {/* <SafeAreaView style={{ height: 320 }}>
                <Animated.FlatList
                    ref={slider}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    data={music}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true },
                    )}
                />
            </SafeAreaView> */}
            <View>
                <Text style={styles.title}>{songs?.title}</Text>
                <Text style={styles.artist}>{songs?.artist}</Text>
            </View>

            <SliderComp />
            {/* <Controller onNext={goNext} onPrv={goPrv} /> */}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: '600',
        textTransform: 'capitalize',
        color: '#ffffff',
    },
    artist: {
        fontSize: 18,
        textAlign: 'center',
        color: '#ffffff',
        textTransform: 'capitalize',
    },
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: height,
    },
});