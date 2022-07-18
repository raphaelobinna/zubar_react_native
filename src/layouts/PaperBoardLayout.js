import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import { GRAY, WHITE } from '../style';
import { HeaderRight } from '../header/HeaderRight';
import { HeaderLeft } from '../header/HeaderLeft';

export const PaperBoardLayout = ({ navigation, children, style }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      
      headerTransparent: false,
      headerTitleStyle: { fontSize: 17, color: GRAY, },
      headerRight: () => (<HeaderRight navigation={navigation} />),
      headerTitle : () => (<HeaderLeft />),
      HeaderLeft:() => <></>
    });
  }, [navigation]);

style = style ?? {};

return (
  <KeyboardAvoidingView style={{ flex: 1 }}  behavior={Platform.OS === "ios" ? "padding" : "height"}>
    {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
    <View style={[styles.container, style.container]}>
      {children}
    </View>
    {/* </TouchableWithoutFeedback> */}
  </KeyboardAvoidingView>
);
};

// PropTypes
PaperBoardLayout.propTypes = {
  navigation: PropTypes.object.isRequired,
  style: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    flexDirection: "column",

  }
});