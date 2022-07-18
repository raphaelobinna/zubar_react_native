import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes, { InferProps } from 'prop-types';
import { GRAY, TRANSPARENT } from '../style';

function LucidPillButton({style={}, onPress, title, children}: InferProps<typeof LucidPillButton.propTypes>) {

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
LucidPillButton.propTypes = {
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
        width:'85%',
        paddingTop:9,
        paddingBottom:9,
        backgroundColor:TRANSPARENT,
        borderRadius:30,
    },
    buttonChild:{
        flexDirection:'row',
        alignSelf:'center',
        alignContent:'center'
    },
    buttonText:{
        fontFamily:"gilroy-regular",
        fontSize: 15,
        color:GRAY,
        alignSelf:'center',
    }
});