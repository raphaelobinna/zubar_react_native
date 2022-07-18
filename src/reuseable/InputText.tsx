import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyleSheet, TextInput, Text, View, Pressable } from 'react-native';
import {LIGHT_GRAY, INPUT_GRAY, SITE_COLOR, GRAY, WHITE, BLACK, TRANSPARENT} from '../style/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function InputText({style={}, label, type, secureTextEntry, preInput='', returnInput, placeholder='', reference, testID}: InferProps<typeof InputText.propTypes>) {

    const [input, setInput] = React.useState(preInput);
    const [focus, setFocus] = React.useState(false)
    const ref = React.useRef(null);

    return (
        <View>
            {label && <Text style={focus ? [styles.label, style.label, styles.labelFocus] : [styles.label, style.label]}>{label ?? null}</Text>}
            <View style={focus ? [styles.inputFence, style.inputFence, styles.inputFenceFocus]: [styles.inputFence, style.inputFence]}>
                <TextInput 
                    testID={testID}
                    ref={reference ?? ref}
                    secureTextEntry={secureTextEntry??false}
                    style={[styles.input, style.input]}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    defaultValue={input} 
                    onChangeText={(value)=>{setInput(value); returnInput(value)}}
                    autoCapitalize='none'
                    keyboardType={type ?? 'default'}
                    placeholder={placeholder}
                    placeholderTextColor={GRAY}
                />
                <Pressable>
                    <Icon name={'eye'} size={30} color={TRANSPARENT} />
                </Pressable>
            </View>
        </View>
    );
};

export default InputText;

// PropTypes
InputText.propTypes = {
    label:PropTypes.string,
    secureTextEntry:PropTypes.bool,
    preInput:PropTypes.string,
    placeholder:PropTypes.string,
    type:PropTypes.any,
    returnInput:PropTypes.func.isRequired,
    reference:PropTypes.any,
    testID:PropTypes.string,
    style:PropTypes.shape({
        label:PropTypes.any,
        inputFence:PropTypes.any,
        input:PropTypes.any,
        labelFocus:PropTypes.any,
        inputFenceFocus:PropTypes.any,
    }),
}

const styles = StyleSheet.create({
    inputFence:{
        flexDirection:'row',
        marginLeft:'8%',
        marginRight:'8%',
        padding:'2%',
        borderWidth: 0.5,
        borderRadius:10,
        borderColor:LIGHT_GRAY,
        backgroundColor:INPUT_GRAY,
    },
    input:{
        width:'90%',
        color:BLACK,
        paddingLeft:'3%',
        paddingRight:'3%',
      
    },
    label:{
        fontSize:12,
        fontFamily: 'gilroy-regular',
        marginLeft:'8%',
        marginRight:'8%',
        marginBottom:'1%',
        color:GRAY
    },
    labelFocus:{
        color:SITE_COLOR
    },
    fakeIcon:{
        height:11,
        width:11
    },

    inputFenceFocus:{
        borderWidth: 1.5,
        borderColor:SITE_COLOR,
        backgroundColor:WHITE,
    },
});