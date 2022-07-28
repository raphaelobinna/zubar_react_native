import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';

import TrackPlayer, { useTrackPlayerProgress, PLAYBACK_TRACK_CHANGED } from 'react-native-track-player';

const { height, width } = Dimensions.get('window');

export default function SliderComp() {
    const { position, duration } = useTrackPlayerProgress(1000, null);
    const [isSeeking, setIsSeeking] = useState(false);
    const isMountedRef = useRef(false);
    const [seek, setSeek] = useState(0);
    const [isMiniPlayer, setIsMiniPlayer] = useState(true);

    useEffect(() => {
        if (isMountedRef.current) {
            TrackPlayer.addEventListener(PLAYBACK_TRACK_CHANGED, () => {
                setIsSeeking(false);
            });
        }

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const formatTime = (secs) => {
        let minutes = Math.floor(secs / 60);
        let seconds = Math.ceil(secs - minutes * 60);

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    };

    const handleChange = (val) => {
        TrackPlayer.seekTo(val);
        TrackPlayer.play().then(() => {
            setTimeout(() => {
                setIsSeeking(false);
            }, 1000);
        });
    };

    //components
    return (
        <View style={styles.container}>
            <Slider
                style={{
                    width: 320,
                    height: 40,
                    Left: 0,
                }}
                minimumValue={0}
                value={isSeeking ? seek : position}
                onValueChange={(value) => {
                    TrackPlayer.pause();
                    setIsSeeking(true);
                    setSeek(value);
                }}
                maximumValue={duration}
                minimumTrackTintColor="#ffffff"
                onSlidingComplete={handleChange}
                maximumTrackTintColor="rgba(255, 255, 255, .5)"
                thumbTintColor={isMiniPlayer ? 'rgba(255, 255, 255, .0)' : '#ffffff'}
            />

            <View style={styles.timeContainer}>
                <Text style={styles.timers}>
                    {formatTime(isSeeking ? seek : position)}
                </Text>
                <Text style={styles.timers}>{formatTime(duration)}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 30,
    },
    timers: {
        color: '#fff',
        fontSize: 16,
    },
    timeContainer: {
        marginHorizontal: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});