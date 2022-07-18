import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import { LIGHT_GRAY, WHITE, SITE_COLOR_LIGHT, BLACK, TRANSPARENT } from '../style/index';
import Icon from 'react-native-vector-icons/MaterialIcons';

function SearchBar({ style = {}, secureTextEntry, preInput = '', addBtn, filterBtn, searchAction, clearSearchResultsAction, placeholder = '', reference }: InferProps<typeof SearchBar.propTypes>) {

    const [input, setInput] = React.useState(preInput);
    const ref = React.useRef(null);

    React.useEffect(() => {
        /**
         * The purpose of this implementation is to
         * ensure that unnecessary requests are not made
         */
        let timeOut: any;
        if (input.length >= 2) {
            if (timeOut !== undefined) {
                clearTimeout(timeOut);
            }

            timeOut = setTimeout(() => {
                searchAction({ search: input });
            }, 1000);

            return () => clearTimeout(timeOut);
        } else {
            clearSearchResultsAction()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    return (
        <View style={styles.cardRow} >

            <View style={[styles.inputFence, style.inputFence]}>
                {
                    !input ? (
                        <Pressable style={styles.icon} >
                            <Icon name={'search'} size={25} color={LIGHT_GRAY} />
                        </Pressable>
                    )
                        : null
                }

                <TextInput
                    ref={reference ?? ref}
                    secureTextEntry={secureTextEntry ?? false}
                    style={[styles.input, style.input]}
                    defaultValue={input}
                    onChangeText={(value) => { setInput(value); }}
                    autoCapitalize='none'
                    placeholder={placeholder}
                />

                {
                    input ? (
                        <Pressable style={[styles.icon, styles.marginRight]} onPress={() => { clearSearchResultsAction(); setInput(preInput) }} >
                            <Icon name={'close'} size={20} color={SITE_COLOR_LIGHT} />
                        </Pressable>
                    )
                        : null
                }

            </View>

        </View>
    );
};

// PropTypes
SearchBar.propTypes = {
    label: PropTypes.string,
    reference: PropTypes.any,
    secureTextEntry: PropTypes.bool,
    preInput: PropTypes.string,
    placeholder: PropTypes.string,
    searchAction: PropTypes.func.isRequired,
    clearSearchResultsAction: PropTypes.func.isRequired,
    addBtn: PropTypes.func,
    TheSVG: PropTypes.string,
    filterBtn: PropTypes.func.isRequired,
    style: PropTypes.shape({
        label: PropTypes.any,
        inputFence: PropTypes.any,
        input: PropTypes.any,
    })
}

const styles = StyleSheet.create({
    inputFence: {
        flexDirection: 'row',
        width: '70%',
        marginTop: '5%',
        padding: '2%',
        height: '60%',
        borderWidth: 1,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: LIGHT_GRAY,
        backgroundColor: WHITE,
    },
    input: {
        width: '90%',
        color: BLACK,
        paddingLeft: '3%',
        paddingRight: '3%',
    },
    icon: {
        marginLeft: '3%',
        marginRight: '3%'
    },
    filterIcon: {
        marginTop: '5%',
        marginRight: '3%',
        marginLeft: '3%',
        alignSelf: "center",
    },
    filterCard: {
        width: '10%',
        height: '60%',
        borderRadius: 50,


        padding: '1%',

    },
    plusIcon: {
        marginTop: '5%',
        marginRight: '5%',
        marginLeft: '2%',
        alignSelf: "center",
    },
    plusCard: {
        width: '10%',
        height: '60%',
        borderRadius: 50,
        padding: '1%',
    },
    fakeIcon: {
        height: 11,
        width: 11
    },
    marginRight: {
        marginRight: '5%'
    },
    cardRow: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 16
    },
    alignSelfStart: {
        alignSelf: 'flex-start',
    },
    alignSelfEnd: {
        alignSelf: 'flex-end',
    },
});

export default SearchBar;