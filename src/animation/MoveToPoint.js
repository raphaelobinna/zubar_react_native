import * as React from 'react';
import { StyleSheet, Animated, TouchableOpacity, View } from 'react-native';

export const MoveToPoint = (props) => {

    const [isAnimatingState, setIsAnimatingState] = React.useState(false);
    const [fadeState, setFadeState] = React.useState(new Animated.Value(0));
    const [positionState, setPositionState] = React.useState(new Animated.ValueXY());

    const animation = (destination) => {
        destination = {
            x: destination.x ?? 0, 
            y: destination.y ?? -100
        }

        if (isAnimatingState) {
            return;
        }

        setIsAnimatingState(true);
        Animated.parallel([

            // Move the animation
            Animated.spring( positionState, { tension: 0, friction: 3, toValue: { x: destination.x, y: destination.y}, useNativeDriver: true}),

            // Fadeout the animation
            Animated.timing( fadeState, { toValue: 1, duration: 1, useNativeDriver: true }),

        ]).start(()=>{

            // Reset the animation to starting point
            setFadeState(new Animated.Value(0));
            setPositionState(new Animated.ValueXY());
            setIsAnimatingState(false);

        }); // start the sequence group
    }

    return (
        <TouchableOpacity style={{...props.style}} onPress={()=>{animation(props.destination); props.onComplete();}}>
            <View style={styles.mainChild}>
                {props.children}
            </View>
            <Animated.View style={{opacity: fadeState,transform: positionState.getTranslateTransform()}}>
                {props.children}
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainChild:{
        zIndex:100,
        marginBottom:-33
    },
    animationChild:{
        //
    }
});
