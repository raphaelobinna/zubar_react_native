import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyleSheet, TouchableOpacity, Appearance, useColorScheme, TextInput, Text, View, Pressable } from 'react-native';
import { LIGHT_GRAY, GRAY, INPUT_GRAY, SITE_COLOR, BLACK } from '../style/index';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function InputDateTime({ style = {}, label, preInput, placeholder, returnInput, returnValue }: InferProps<typeof InputDateTime.propTypes>) {
    const [input, setInput] = React.useState(preInput);
    let colorScheme = Appearance.getColorScheme()

    style = style ?? {}
    return (
        <View>
            {label && <Text style={[styles.label, style.label]}>{label ?? null}</Text>}
            <TouchableOpacity
                style={[styles.inputFence, style.inputFence]}
                onPress={() => { returnInput(!input); setInput(!input) }}
            >
                {placeholder && <Text style={[styles.label, style.label]}>{placeholder ?? null}</Text>}
                <DateTimePickerModal
                    isVisible={input}
                    mode="date"
                    display="default"
                    onConfirm={(date) => { returnValue(date); setInput(!input) }}
                    onCancel={() => { returnInput(!input); setInput(!input) }}
                />

                <View style={styles.iosPickerContentRight}>
                    <Icon name={'calendar-range'} size={20} color={SITE_COLOR} />
                </View>

            </TouchableOpacity>
        </View>
    );
};

export default InputDateTime;

// PropTypes
InputDateTime.propTypes = {
    label: PropTypes.string,
    preInput: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
    returnInput: PropTypes.func.isRequired,
    returnValue: PropTypes.func.isRequired,
    style: PropTypes.shape({
        label: PropTypes.object,
        inputFence: PropTypes.object,
    })
}

const styles = StyleSheet.create({
    inputFence: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%',
        padding: '3%',
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: LIGHT_GRAY,
        backgroundColor: INPUT_GRAY,
    },
    input: {
        width: '90%',
        color: BLACK,
        paddingLeft: '3%',
        paddingRight: '3%',
    },
    iosPickerContentRight: {
        marginRight: '5%',
        right: 0,
        position: 'absolute',
        alignSelf: 'center',
        alignContent: 'flex-end'
    },
    back: {
        backgroundColor: 'black'
    },
    label: {
        fontSize: 12,
        fontFamily: 'gilroy-regular',
        marginLeft: '8%',
        marginRight: '8%',
        marginBottom: '1%',
        color: GRAY
    }
});
