import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { BLACK, GRAY, WHITE } from '../style';

export const TabSelect = ({ style, list, onSelect, selected }) => {


    const [a, set] = useState();

    React.useEffect(() => {
        set(selected);
    },[selected]);

    return (

        <ScrollView
            horizontal
            contentContainerStyle={{ justifyContent: 'space-between', flex: 1, }}
            style={[styles.container, style.container]}
        >

            {list && list.map(
                (val, i) => {
                    return (
                        <TouchableOpacity key={i} onPress={() => onSelect(val)}>
                            <View
                                style={
                                    val === selected ? {
                                        width: 150,
                                      justifyContent: 'center',
                                        height: '100%',
                                        backgroundColor: WHITE,
                                        borderRadius: 25,
                                    } : styles.tab

                                }
                            >
                                <Text
                                    style={
                                        val === selected ? styles.tabText : styles.selectedTabText
                                    }
                                >
                                    {val}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            )}

        </ScrollView>

    );
}

// PropTypes
TabSelect.propTypes = {
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.string,
    list: PropTypes.array,
    style: PropTypes.shape({
        container: PropTypes.object,
    })
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 6,
        borderRadius: 66,
        backgroundColor: GRAY
    },
    tabText: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '700',
        alignSelf:'center',
        color: BLACK,
        fontFamily:'gilroy-bold',
    },
    selectedTabText: {
        fontSize: 18,
        lineHeight: 24,
        color: WHITE,
        alignSelf:'center',
        
        fontWeight: '700',
        fontFamily:'gilroy-bold',
    },
    selectedTab: {
        width: 150,
      justifyContent: 'center',
        height: '100%',
        backgroundColor: WHITE,
        borderRadius: 25,
    },
    tab: {
        width: 150,
      justifyContent: 'center',
        height: '100%',

        borderRadius: 20,
    }
})