import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { LIGHT_YELLOW } from '../../style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stars = ({value}) => {

    /**
     * Renders star icons
     * @param {integer} value 
     * @returns {<React.Component/>}
     */
    const stars = (value) => {
        if (!value) {
            return null;
        }

        let stars = [];
        for (let index = 0; index < 5; index++) {
            stars.push(
                <Icon key={index} name={index < value ? 'star' : 'star-outline'} size={20} color={ LIGHT_YELLOW } style={styles.icon} />
            );
        }
        return stars;
    }

    return (
        <View style={styles.row}>
            {stars(value)}
        </View>
    )
}

// PropTypes
Stars.propTypes = {
    value: PropTypes.number.isRequired, 
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row'
    },
    icon:{
        paddingRight:6
    },
});

export default Stars;
