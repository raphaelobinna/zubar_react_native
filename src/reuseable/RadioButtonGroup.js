import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GRAY, SITE_COLOR, BLACK } from '../../style';

export const RadioButtonGroup = React.forwardRef(({style={}, onPress, preInput={key:false}, returnInput, data}, ref) => {

    const [input, setInput] = React.useState(preInput);
    style = style ?? {};

    React.useImperativeHandle(ref, () => ({
        clear: () => {clearDynamicInput();},
        // anotherMethodOfChoice : () => {}
    }));

    const setDynamicInput = (currentInputState, selectedRadio) => {
        if (currentInputState[selectedRadio] !== undefined){
            return {[selectedRadio]:!currentInputState[selectedRadio]}
        }
        return {[selectedRadio]:true}
    }

    const clearDynamicInput = () => {
        setInput({});
        returnInput({});
    }

    const listButtons = (data) => {
        if (data.length < 1) {
            return null;
        }

        return data.map((value,key)=>{
            return (
                <TouchableWithoutFeedback 
                    key={key}
                    accessibilityRole="radio"
                    style={[styles.button, style.button]} 
                    onPress={()=>{returnInput(setDynamicInput(input,value)); setInput(setDynamicInput(input,value)); onPress()}}>
                    <View style={[styles.buttonChild, style.buttonChild]}>
                        {input[value]?
                            <Icon name="radiobox-marked" size={30} color={SITE_COLOR} style={styles.icon} />
                        :
                            <Icon name="radiobox-blank" size={30} color={GRAY} style={styles.icon} />
                        }
                        <Text style={[styles.buttonText, style.buttonText]}>{value ?? 'Title'}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
    }

    return (
        <View accessibilityRole="radiogroup">
            {listButtons(data)}
        </View>
    )
})

// PropTypes
RadioButtonGroup.propTypes = {
    onPress:PropTypes.func.isRequired,
    preInput:PropTypes.oneOfType([
        PropTypes.exact({}),
        PropTypes.exact({key:PropTypes.boolean}),
    ]).isRequired,
    returnInput:PropTypes.func.isRequired,
    data:PropTypes.arrayOf(PropTypes.string).isRequired
}

const styles = StyleSheet.create({
    button:{
       padding:'3%'
    },
    buttonChild:{
        flex:1,
        flexDirection:'row',
    },
    buttonText:{
        fontFamily:"gilroy-regular",
        fontSize: 16,
        color:BLACK,
        alignSelf:'center',
        marginLeft:6
    }
});