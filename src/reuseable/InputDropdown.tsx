import React, { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { isArray, isEmpty } from '../helpers/helper';
import { Platform, StyleSheet, Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LIGHT_GRAY, GRAY, WHITE, INPUT_GRAY, SITE_COLOR, SITE_COLOR_LIGHT } from '../style/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function InputDropdown({ style = {}, defaultText, label, children, data, preInput = '', returnInput, returnName }: InferProps<typeof InputDropdown.propTypes>) {

    interface SelectedInterface {
        label?: string;
    }

    const [input, setInput] = React.useState(preInput);
    const [selectedItem, setSelectedItem] = useState<SelectedInterface>();
    const [modalVisible, setModalVisible] = React.useState(false);
    defaultText = defaultText ? defaultText : 'Select An Option';

    React.useEffect(() => {
        if (!isEmpty(preInput)) {
            let item = data.find(item => item.id === preInput);
            if (item && item.value) {
                setSelectedItem(item); returnInput(item.value);
            }
        }

        return () => setSelectedItem({});
    }, []);

    interface itemInterface {
        value?: string | number;
        label: string;
        id?: string;
    }

    const renderDropdown = (data:any) => {
        if (!isArray(data)) {
            return null;
        }

        return data.map((item: itemInterface, key: any) => {
            return (
                <Picker.Item key={key} label={'  ' + item.label} value={item.value} />
            )
        });
    }

    return (
        <View>
            {label && <Text style={[styles.label, style.label]}>{label ?? null}</Text>}
            <View style={[styles.pickerFence, style.pickerFence]}>
                {children ?? null}
                {Platform.OS === 'ios' ?
                    <React.Fragment>
                        <Pressable onPress={() => setModalVisible(true)} style={[styles.iosPicker, style.iosPicker]}>
                            <View style={styles.iosPickerContent}>
                                <View style={styles.iosPickerContentLeft}>
                                    <Text style={styles.colorLightGray}>{selectedItem && selectedItem.label ? '  ' + selectedItem.label : '  ' + defaultText}</Text>
                                </View>
                                <View style={styles.iosPickerContentRight}>
                                    <Icon name="chevron-down" size={30} color={SITE_COLOR_LIGHT} />
                                </View>
                            </View>
                        </Pressable>

                        <Modal animationType='fade' transparent={true} visible={modalVisible}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalBackground}>
                                <TouchableWithoutFeedback style={styles.modalView}>
                                    <View style={styles.modalView}>
                                        <Picker
                                            itemStyle={styles.colorOrange}
                                            selectedValue={input}
                                            style={[styles.picker, style.picker, { height: '100%', width: 260 }]}
                                            onValueChange={(itemValue, itemIndex) => { setInput(itemValue); setSelectedItem(data[itemIndex - 1]); returnInput && returnInput(itemValue); returnName && returnName(data[itemIndex - 1] && data[itemIndex - 1].label) }}>
                                            <Picker.Item key={'unselectable'} label={'  ' + defaultText} value={0} />
                                            {renderDropdown(data)}
                                        </Picker>
                                        <View style={styles.modalDialog}>
                                            <Pressable hitSlop={6} onPress={() => { setInput(0); setSelectedItem({}); returnInput(0); setModalVisible(false) }}>
                                                <Text style={styles.colorLightGray}>{'Clear'}</Text>
                                            </Pressable>
                                            <Pressable hitSlop={6} onPress={() => setModalVisible(false)}>
                                                <Text style={styles.colorOrange}>{'Confirm'}</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </TouchableOpacity>
                        </Modal>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Picker
                            selectedValue={input}
                            style={[styles.picker, style.picker]}
                            onValueChange={(itemValue, itemIndex) => { setInput(itemValue); setSelectedItem(data[itemIndex - 1]); returnInput && returnInput(itemValue); returnName && returnName(data[itemIndex - 1] && data[itemIndex - 1].label); }}>
                            <Picker.Item key={'unselectable'} label={'  ' + defaultText} value={0} />
                            {renderDropdown(data)}
                        </Picker>
                    </React.Fragment>
                }
            </View>
        </View>
    );
};

export default InputDropdown;

// PropTypes
InputDropdown.propTypes = {
    label: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        id: PropTypes.string,
        label: PropTypes.string.isRequired,
    })),
    preInput: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    returnInput: PropTypes.func,
    returnName: PropTypes.func,
    style: PropTypes.shape({
        label: PropTypes.object,
        pickerFence: PropTypes.object,
        picker: PropTypes.object,
        iosPicker: PropTypes.object,
        iosPickerContent: PropTypes.object,
    }),
    defaultText: PropTypes.string,
    children: PropTypes.element,
}

const styles = StyleSheet.create({
    pickerFence: {
        flexDirection: 'row',
        alignContent: 'space-around',
        marginLeft: '8%',
        marginRight: '8%',
        paddingLeft: '2%',
        paddingRight: '2%',
        height: 45,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: LIGHT_GRAY,
        backgroundColor: INPUT_GRAY,
    },
    iospickerFence: {
        flexDirection: 'row',
        alignContent: 'space-around',
        marginLeft: '9%',
        marginRight: '9%',
        paddingLeft: '2%',
        paddingRight: '2%',
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: LIGHT_GRAY,
        backgroundColor: INPUT_GRAY,
    },
    picker: {
        alignSelf: 'center',
        width: '95%',
        color: GRAY,
    },
    label: {
        fontSize: 12,
        fontFamily: 'gilroy-regular',
        marginLeft: '8%',
        marginRight: '8%',
        marginBottom: '1%',
        color: GRAY,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalView: {
        elevation: 5,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: WHITE,
        margin: '44%',
        marginTop: '55%',
        marginBottom: '55%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalDialog: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: -30
    },
    colorOrange: {
        color: SITE_COLOR
    },
    colorLightGray: {
        color: LIGHT_GRAY
    },
    iosPicker: {
        width: '100%',
        justifyContent: 'center',
        height: 44
    },
    iosPickerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iosPickerContentLeft: {
        flex: 8
    },
    iosPickerContentRight: {
        flex: 2
    }
});