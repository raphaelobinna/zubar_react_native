import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GRAY, LIGHT_GRAY, TRANSPARENT } from '../style';

function LucidRectangleButton({style={}, onPress, title, children}: InferProps<typeof LucidRectangleButton.propTypes>) {

    style = style ?? {};
    return (
        <TouchableOpacity 
            style={[styles.button, style.button]}
            onPress={onPress}>
            <View style={[styles.buttonChild, style.buttonChild]}>
                {children ?? null}
                <Text style={[styles.buttonText, style.buttonText]}>{title ?? 'Title'}</Text>
            </View>
        </TouchableOpacity>
    );
};

// PropTypes
LucidRectangleButton.propTypes = {
    style:PropTypes.shape({
        button:PropTypes.object,
        buttonChild:PropTypes.object,
        buttonText:PropTypes.object,
        buttonDisabled:PropTypes.object,
    }),
    onPress:PropTypes.func.isRequired,
    title:PropTypes.string,
    children:PropTypes.element,
    disabled:PropTypes.bool,
}

const styles = StyleSheet.create({
    button:{
        alignSelf:'center',
        padding:6,
        backgroundColor:TRANSPARENT,
        borderWidth:2,
        borderRadius:3,
        borderColor: LIGHT_GRAY,
        shadowColor: GRAY
    },
    buttonChild:{
        flexDirection:'row',
        alignSelf:'center',
        alignContent:'center',
        padding:3,
        paddingLeft:9,
        paddingRight:9,
    },
    buttonText:{
        fontFamily:"gilroy-regular",
        fontSize: 16,
        color:GRAY,
        alignSelf:'center',
    }
});

export default LucidRectangleButton;