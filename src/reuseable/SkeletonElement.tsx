import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes, { InferProps } from 'prop-types';

function SkeletonElement({ type }: InferProps<typeof SkeletonElement.propTypes>) {

    let shape;
    switch (type) {
        case "text":
            shape = styles.text
            break;
        case "title":
            shape = styles.title
            break;
        case "avatar":
            shape = styles.avatar
            break;
        case "thumbnail":
            shape = styles.thumbnail
            break;
        default:
            shape = null
            break;
    }

    return (
        <View style={[styles.skeleton, shape]}>
        </View>
    )

}

export default SkeletonElement;

// PropTypes
SkeletonElement.propTypes = {
    type:PropTypes.string,
}

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: "#ddd",
        marginVertical: 5,
        marginHorizontal: 0,
        borderRadius: 4
    },

    text: {
        width: '80%',
        height: 12
    },
    title: {
        width: '80%',
        height: 22,
        marginBottom: 10
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    thumbnail: {
        width: 100,
        height: 100,
    }
})