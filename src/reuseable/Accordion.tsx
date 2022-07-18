import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GRAY, BLACK, WHITE } from '../style';

function Accordion({ title, children }: InferProps<typeof Accordion.propTypes>) {

    const [expanded, toggleExpanded] = React.useState(false)

    return (
        <View>

            <TouchableOpacity style={styles.row} onPress={() => toggleExpanded(!expanded)}>
                <Text style={[styles.title]}>{title ?? 'Title'}</Text>
                <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={30} color={GRAY} />
            </TouchableOpacity>

            <View style={styles.hr} />

            {expanded && <View style={styles.child}>
                {children ?? null}
            </View>}

        </View>
    )
}

// PropTypes
Accordion.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
}


export default Accordion;

const styles = StyleSheet.create({
    title: {
        fontFamily: "gilroy-regular",
        fontSize: 15,
        color: BLACK,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingLeft: 24,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: WHITE,
    },
    hr: {
        height: 1,
        width: '100%',
        marginTop: 5,
        marginBottom: 5,
    },
    child: {
        marginBottom: 10,
    }
})
