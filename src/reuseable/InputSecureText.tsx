import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyleSheet, TextInput, Text, View, Pressable } from 'react-native';
import {LIGHT_GRAY, GRAY, INPUT_GRAY, BLACK, SITE_COLOR, WHITE} from '../style/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function InputSecureText({style={}, label, preInput='', returnInput, placeholder='', reference, testID}: InferProps<typeof InputSecureText.propTypes>) {
    const [input, setInput] = React.useState(preInput);
    const [focus, setFocus] = React.useState(false)
    const [textVisibility, setTextVisibility] = React.useState(false);
    const [longPressed, setLongPressed] = React.useState(false);
    const ref = React.useRef(null);

    return (
        <View>
            {label && <Text style={focus ? [styles.label, style.label, styles.labelFocus] : [styles.label, style.label]}>{label ?? null}</Text>}
            <View style={focus ? [styles.inputFence, style.inputFence, styles.inputFenceFocus]: [styles.inputFence, style.inputFence]}>
                <TextInput 
                    testID={testID}
                    ref={reference ?? ref}
                    secureTextEntry={!textVisibility}
                    style={[styles.input, style.input]}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    defaultValue={input} 
                    onChangeText={(value)=>{setInput(value); returnInput(value)}}
                    autoCapitalize='none'
                    placeholder={placeholder}
                    placeholderTextColor={GRAY}
                />
                <Pressable 
                    delayLongPress={1000}
                    onPressIn={()=>setTextVisibility(!textVisibility)}
                    onLongPress={()=>{setTextVisibility(true); setLongPressed(true) }}
                    style={{alignSelf:'center'}}
                    onPressOut={()=>{longPressed ? setTextVisibility(false) : null;  setLongPressed(false)}}>
                    {textVisibility?
                    <Text style={styles.showText} >hide</Text>
                        // <Icon name={'eye-off'} style={styles.marginRight} size={30} color={GRAY} />
                    :
                    <Text style={styles.showText} >show</Text>
                        // <Icon name={'eye'} style={styles.marginRight} size={30} color={GRAY} />
                    }
                </Pressable>
            </View>
        </View>
    );
};

export default InputSecureText;

// PropTypes
InputSecureText.propTypes = {
    label:PropTypes.string,
    preInput:PropTypes.string,
    placeholder:PropTypes.string,
    returnInput:PropTypes.func.isRequired,
    reference:PropTypes.any,
    testID:PropTypes.string,
    style:PropTypes.shape({
        label:PropTypes.object,
        inputFence:PropTypes.object,
        input:PropTypes.object,
    })
}

const styles = StyleSheet.create({
    inputFence:{
        flexDirection:'row',
        marginLeft:'8%',
        marginRight:'8%',
        padding:'2%',
        borderWidth: 0.5,
        height:45,
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
        color:'#4D4D4D'
    },
    labelFocus:{
        color:SITE_COLOR
    },
    marginRight:{
        marginRight: '5%'
    },
    inputFenceFocus:{
        borderWidth: 1.5,
        borderColor:SITE_COLOR,
        backgroundColor:WHITE,
    },
    showText:{
        color:SITE_COLOR,
        fontSize:10,
        alignSelf:'center',
        textAlignVertical:'center',
        fontFamily: 'gilroy-regular',
    }
});