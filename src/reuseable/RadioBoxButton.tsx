import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GRAY, SITE_COLOR, BLACK } from '../style';

function RadioBoxButton({style={}, onPress, preInput, returnInput, title}: InferProps<typeof RadioBoxButton.propTypes>) {

    const [input, setInput] = React.useState(preInput);

    style = style ?? {};
    return (
        <TouchableWithoutFeedback 
            accessibilityRole="radio"
            style={[styles.button, style.button]} 
            onPress={()=>{returnInput(!input); setInput(!input); onPress()}}>
            <View style={[styles.buttonChild, style.buttonChild]}>
                {preInput?
                    <Icon name="checkbox-marked" size={30} color={SITE_COLOR}  />
                :
                    <Icon name="checkbox-blank-outline" size={30} color={GRAY}  />
                }
                <Text style={[styles.buttonText, style.buttonText]}>{title ?? 'Title'}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

// PropTypes
RadioBoxButton.propTypes = {
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

export default RadioBoxButton;