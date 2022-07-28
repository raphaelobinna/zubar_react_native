import * as React from 'react';
import PropTypes, {InferProps} from 'prop-types';
import { Platform, StyleSheet, TextInput, Text, View } from 'react-native';
import {LIGHT_GRAY, GRAY, WHITE, BLACK} from '../style/index';

function InputTextArea({style={}, label, numberOfLines, preInput='', returnInput, placeholder='', reference}: InferProps<typeof InputTextArea.propTypes>)  {
    const [input, setInput] = React.useState(preInput);
    const ref = React.useRef(null);

    return (
        <View>
            {label && <Text style={[styles.label, style.label]}>{label ?? null}</Text>}
            <View style={[styles.inputFence, style.inputFence]}>
                <TextInput 
                    ref={reference ?? ref}
                    multiline
                    numberOfLines={Platform.OS === 'ios' ? null : numberOfLines}
                    style={[styles.input, style.input]}
                    defaultValue={input} 
                    onChangeText={(value)=>{setInput(value); returnInput(value)}}
                    autoCapitalize='none'
                    placeholder={placeholder}
                />
            </View>
        </View>
    );
};

// PropTypes
InputTextArea.propTypes = {
    label:PropTypes.string,
    reference:PropTypes.any,
    numberOfLines:PropTypes.number,
    preInput:PropTypes.string,
    placeholder:PropTypes.string,
    returnInput:PropTypes.func.isRequired,
    style:PropTypes.shape({
        label:PropTypes.any,
        inputFence:PropTypes.any,
        input:PropTypes.any,
    })
}

const styles = StyleSheet.create({
    inputFence:{
        padding:'2%',
        borderWidth: 1,
        borderRadius:9,
        borderColor:LIGHT_GRAY,
        backgroundColor:WHITE,
    },
    input:{
        width:'90%',
        color:BLACK,
        textAlignVertical:'top'
    },
    label:{
        marginBottom:'1%',
        color:GRAY
    }
});

export default InputTextArea;