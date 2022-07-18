import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GRAY, SITE_COLOR, BLACK, LIGHT_GRAY } from '../style';

function RadioButton({style={}, onPress, preInput, returnInput, title}: InferProps<typeof RadioButton.propTypes>) {

    const [input, setInput] = React.useState(preInput);

    style = style ?? {};
    return (
        <TouchableWithoutFeedback 
            accessibilityRole="radio"
            style={[styles.button, style.button]} 
            onPress={()=>{returnInput(!input); setInput(!input); onPress()}}>
            <View style={[styles.buttonChild, style.buttonChild]}>
                {/* {preInput?
                    <Icon name="radio-button-on" size={20} color={SITE_COLOR} style={styles.icon} />
                :
                    <Icon name="radio-button-on" size={20} color={LIGHT_GRAY} style={styles.icon} />
                } */}
                <Text style={[styles.buttonText, style.buttonText]}>{title ?? 'Title'}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

// PropTypes
RadioButton.propTypes = {
    onPress:PropTypes.func.isRequired,
    preInput:PropTypes.bool,
    returnInput:PropTypes.func.isRequired,
    title:PropTypes.string,
    style:PropTypes.shape({
        button:PropTypes.object,
        buttonText:PropTypes.object,
        buttonChild:PropTypes.object,
    })
}

const styles = StyleSheet.create({
    button:{
       padding:'3%'
    },
    icon:{
        alignSelf:'center',
        marginTop: 4,
    },
    buttonChild:{
        flex:1,
        flexDirection:'row',
    },
    buttonText:{
        fontFamily:"gilroy-regular",
        fontSize: 14,
        color:GRAY,
       
        alignSelf:'center',
        marginLeft:6
    }
});

export default RadioButton;