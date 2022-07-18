import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SITE_COLOR, WHITE, GRAY } from '../style';

function SolidPillButton({style={}, onPress, title, testID, children, disabled}: InferProps<typeof SolidPillButton.propTypes>) {

    style = style ?? {};
    return (
        <TouchableOpacity 
            testID={testID}
            disabled={disabled}
            style={[styles.button, style.button, disabled && styles.buttonDisabled ]}
            onPress={onPress}>
            <View style={[styles.buttonChild, style.buttonChild]}>
               
                <Text style={[styles.buttonText, style.buttonText]}>{title ?? 'Title'}</Text>
                {children ?? null}
            </View>
        </TouchableOpacity>
    );
};



// PropTypes
SolidPillButton.propTypes = {
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
    testID:PropTypes.string,
}

const styles = StyleSheet.create({
    button:{
        elevation:5,
        alignSelf:'center',
        width:'85%',
        paddingTop:9,
        paddingBottom:9,
        backgroundColor:SITE_COLOR,
        borderRadius:10,
        borderColor: GRAY,
        shadowColor: GRAY
    },
    buttonChild:{
        flexDirection:'row',
        alignSelf:'center',
        alignContent:'center'
    },
    buttonText:{
        fontFamily:"gilroy-regular",
        fontSize: 19,
        color:WHITE,
        alignSelf:'center',
    },
    buttonDisabled: {
        backgroundColor:GRAY,
    },
});

export default SolidPillButton;