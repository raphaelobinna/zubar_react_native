import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { SITE_COLOR_LIGHT } from '../style';
import {ucfirst,isEmptyArray} from '../helpers/helper';

function Tags({data}: InferProps<typeof Tags.propTypes>) {

    /**
     * Renders tag elements
     * @param {array} array 
     * @returns {<React.Component/>}
     */
    const tags = (array:any[]) => {
        if (isEmptyArray(array) ) {
            return null;
        }

        let tags = [];
        for (const item of array) {
            tags.push(
                <View key={item} style={styles.tag}>
                    <Text style={styles.tagText}>{ucfirst(item)}</Text>
                </View>
            );
        }
        return tags;
    }

    return (
        <React.Fragment>
            {tags(data)}
        </React.Fragment>
    )
}


// PropTypes
Tags.propTypes = {
    data: PropTypes.array.isRequired, 
}

const styles = StyleSheet.create({
    tag:{
        borderWidth:1,
        borderRadius:5,
        borderColor:SITE_COLOR_LIGHT,
        paddingLeft:5,
        paddingRight:5
    },
    tagText:{
        fontSize: 12,
        color:SITE_COLOR_LIGHT
    }
});

export default Tags;