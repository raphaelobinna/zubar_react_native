import * as React from 'react';
import { StyleSheet, Animated } from 'react-native';

export const FadeInOut = (props) => {
  const fadeInOut = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          fadeInOut,
          {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          fadeInOut,
          {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
          }
        ),
      ])
    ).start();
  }, [fadeInOut]);

  return (
    <Animated.View style={{...props.style, opacity: fadeInOut}}>
      {props.children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  //
})
