import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SITE_COLOR_LIGHT, WHITE, GRAY } from '../style';

function SolidRectangleButton({style={}, onPress, title, children, disabled}: InferProps<typeof SolidRectangleButton.propTypes>) {
    style = style ?? {};
    return (
        <TouchableOpacity 
            style={[styles.button, style.button,disabled && styles.buttonDisabled ]}
            disabled={disabled}
            onPress={onPress}>
            <View style={[styles.buttonChild, style.buttonChild]}>
                <Text style={[styles.buttonText, style.buttonText]}>{title ?? 'Title'}</Text>
                {children ?? null}
            </View>
        </TouchableOpacity>
    );
};

export default SolidRectangleButton;


// PropTypes
SolidRectangleButton.propTypes = {
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
        elevation:5,
        alignSelf:'center',
        padding:6,
        backgroundColor:SITE_COLOR_LIGHT,
        borderRadius:3,
        borderColor: GRAY,
        shadowColor: GRAY
    },
    buttonDisabled: {
        backgroundColor:GRAY,
    },
    buttonChild:{
        flexDirection:'row',
        alignSelf:'center',
        alignContent:'center'
    },
    buttonText:{
        fontFamily:"gilroy-regular",
        fontSize: 16,
        color:WHITE,
        alignSelf:'center',
    }
});