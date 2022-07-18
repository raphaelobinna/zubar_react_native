import * as React from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { LIGHT_GRAY, WHITE } from '../style';
import SkeletonElement  from './SkeletonElement';

function SkeletonIndexLoader()  {

    const xValue = React.useRef(new Animated.Value(-170)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(
                xValue,
                {
                    toValue: 170,
                    duration: 500, // the duration of the animation
                    easing: Easing.linear, // the style of animation
                    useNativeDriver: true
                }
            )
        ).start()
    }, [xValue])

    return (
        <View style={styles.wrapper}>
            <View style={styles.card}>

                <View style={styles.cardSectionLeft}>
                    <SkeletonElement type="title" />
                    <View style={styles.smallBar} >
                        <SkeletonElement type="title" />
                    </View>
                </View>
                <View style={styles.cardSectionCenter}>
                    <SkeletonElement type="title" />
                    <View style={styles.smallBar} >
                        <SkeletonElement type="title" />
                    </View>

                </View>

                <View style={styles.shimmerWrapper} >
                    <Animated.View style={[styles.shimmer, { transform: [{ translateX: xValue }] }]}>
                    </Animated.View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: '3%',
        position: 'relative',
        overflow: 'hidden'
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: WHITE,
        borderBottomWidth: 0.5,
        paddingHorizontal: '3%',
        borderBottomColor: LIGHT_GRAY
    },
    cardSectionLeft: {
        flex: 4,
        justifyContent: 'center',
       
    },
    cardSectionCenter: {
        flex: 3,
        justifyContent: 'center',
       
    },
    smallBar: {
        width: '60%'
    },
    shimmerWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '140%',
    },
    shimmer: {
        width: '50%',
        height: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    }
});

export default SkeletonIndexLoader;