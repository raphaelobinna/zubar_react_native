import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

function Badge({style={}, count=0, children}: InferProps<typeof Badge.propTypes>) {
    return (
        <React.Fragment>
            {count<1?
                <View>
                    {children}
                </View>
            :
                <View>
                    {children}
                    <View style={[styles.dot, style.dot]}>
                        <Text style={[styles.text, style.text]}>
                            {count>99?99:count}
                        </Text>
                    </View>
                </View>
            }
        </React.Fragment>
    )
}

export default Badge;

// PropTypes
Badge.propTypes = {
    style:PropTypes.shape({
        dot:PropTypes.object,
        text:PropTypes.object,
    }),
    count:PropTypes.number.isRequired,
    children:PropTypes.element.isRequired,
}

const styles = StyleSheet.create({
    dot:{
        position:'absolute',
        right:0,
        zIndex:10,
        minHeight:9,
        minWidth:15,
        backgroundColor:'red',
        borderRadius: 150,
    },
    text:{
        paddingLeft:1,
        paddingRight:1,
        textAlign:'center',
        color:'white'
    }
});