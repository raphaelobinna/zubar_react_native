import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { BLACK, GRAY, LIGHT_GRAY, SITE_COLOR_LIGHT } from '../style';

function ToggleButton({ style = {}, disabled = false, preInput = false, onPress, returnInput, title, trackColor, thumbColor = {} }: InferProps<typeof ToggleButton.propTypes>) {

    const [input, setInput] = React.useState(preInput);

    React.useEffect(() => {
        setInput(preInput);
    }, [preInput]);

    style = style ?? {};
    return (
        <View style={[styles.button, style.button]}>
            <Switch
                disabled={disabled}
                trackColor={{ true: trackColor.active ?? LIGHT_GRAY, false: trackColor.inactive ?? LIGHT_GRAY }}
                thumbColor={input ? thumbColor.active ?? SITE_COLOR_LIGHT : thumbColor.inactive ?? LIGHT_GRAY}
                ios_backgroundColor={GRAY}
                onValueChange={() => { setInput(!input); returnInput(!input); onPress(!input); }}
                value={input}
            />
            <Text style={[styles.buttonText, style.buttonText]}>{title ?? 'Title'}</Text>
        </View>
    )
};

export default ToggleButton;

// PropTypes
ToggleButton.propTypes = {
    disabled: PropTypes.bool,
    preInput: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    returnInput: PropTypes.func.isRequired,
    title: PropTypes.string,
    trackColor: PropTypes.shape({ active: PropTypes.string, inactive: PropTypes.string }),
    thumbColor: PropTypes.shape({ active: PropTypes.string, inactive: PropTypes.string }),
    style: PropTypes.shape({
        button: PropTypes.object,
        buttonText: PropTypes.object,
    })
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        flexDirection: 'row'
    },
    buttonText: {
        fontFamily: "gilroy-regular",
        fontSize: 16,
        color: BLACK,
        alignSelf: 'center',
        marginLeft: 6
    }
});