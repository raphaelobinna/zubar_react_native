import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyleSheet, View, Text, } from 'react-native';
import { LIGHT_GRAY, INPUT_GRAY, BLACK, GRAY, SITE_COLOR, TRANSPARENT } from '../style/index';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function AutoCompleteInput({ style = {}, placeholder, label, data, handleSelectItem, searchFn }: InferProps<typeof AutoCompleteInput.propTypes>) {

    style = style ?? {};

    return (
        <View>
            {label && <Text style={[styles.label, style.label]}>{label ?? null}</Text>}
            <View style={[styles.pickerFence, style.pickerFence]} >

                <AutocompleteDropdown
                    clearOnFocus={false}
                    closeOnBlur={true}
                    closeOnSubmit={false}
                    onChangeText={searchFn}
                    onSelectItem={(item) => item && handleSelectItem(item)}
                    dataSet={data}
                    textInputProps={{
                        placeholder: placeholder,
                        autoCorrect: false,
                        autoCapitalize: "none",
                        style: {
                            color: BLACK,
                            borderRadius: 10,
                            borderWidth: 1,
                            paddingLeft: 18,
                            paddingVertical: '3%',
                            borderColor: LIGHT_GRAY,
                            backgroundColor: INPUT_GRAY,
                            ...style.inputFence
                        }
                    }}
                    emptyResultText='Nothing was found'
                    rightButtonsContainerStyle={styles.rightButtonsContainerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    suggestionsListContainerStyle={styles.suggestionsListContainerStyle}
                    containerStyle={styles.containerStyle}
                    ChevronIconComponent={
                        <Icon name="chevron-down" size={25} color={SITE_COLOR} />
                    }
                    ClearIconComponent={
                        <Icon name="close" size={20} color={SITE_COLOR} />
                    }
                />
            </View>
        </View>
    );
};

export default AutoCompleteInput;

// PropTypes
AutoCompleteInput.propTypes = {
    placeholder: PropTypes.string,
    data: PropTypes.array,
    handleSelectItem: PropTypes.func.isRequired,
    style: PropTypes.shape({
        label: PropTypes.object,
        inputFence: PropTypes.object,
        pickerFence: PropTypes.object,

    }),
    label: PropTypes.string,
    searchFn: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    pickerFence: {
        paddingLeft: '3%',
        paddingRight: '3%',
        marginLeft: '2%',
        minWidth: "90%",

    },
    label: {
        marginLeft: '8%',
        marginRight: '8%',
        marginBottom: '1%',
        color: GRAY
    },
    rightButtonsContainerStyle: {
        borderRadius: 10,
        right: 8,
        height: 30,
        top: 5,
        alignSelf: "center",
        backgroundColor: INPUT_GRAY
    },
    inputContainerStyle: {
        backgroundColor: TRANSPARENT
    },
    suggestionsListContainerStyle: {
        marginTop: '-15%',
        zIndex: 1,
        marginBottom: '15%',
        position: 'relative'
    },
    containerStyle: {
        flexGrow: 1,
        flexShrink: 1
    }

});