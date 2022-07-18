import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SITE_COLOR, WHITE, GRAY } from '../style';

function SolidPillLoaderButton({ style = {}, onPress, title, testID, children, disabled, loading }: InferProps<typeof SolidPillLoaderButton.propTypes>) {

    style = style ?? {};
    return (
        <TouchableOpacity
            testID={testID}
            disabled={disabled}
            style={[styles.button, style.button, disabled && styles.buttonDisabled]}
            onPress={onPress}>
            <View style={[styles.buttonChild, style.buttonChild]}>
                {
                    loading ?
                        <ActivityIndicator size="small" color={WHITE} />
                        :
                        <>
                            <Text style={[styles.buttonText, style.buttonText]}>{title ?? 'Title'}</Text>
                            {children ?? null}
                        </>
                }

            </View>
        </TouchableOpacity>
    );
};

export default SolidPillLoaderButton;

// PropTypes
SolidPillLoaderButton.propTypes = {
    style:PropTypes.shape({
        button:PropTypes.object,
        buttonChild:PropTypes.object,
        buttonText:PropTypes.object,
        buttonDisabled:PropTypes.object,
    }),
    onPress:PropTypes.func.isRequired,
    title:PropTypes.string,
    children:PropTypes.element,
    testID:PropTypes.string,
    disabled:PropTypes.bool,
    loading:PropTypes.bool,
}


const styles = StyleSheet.create({
    button: {
        elevation: 5,
        alignSelf: 'center',
        width: '85%',
        paddingTop: 9,
        paddingBottom: 9,
        backgroundColor: SITE_COLOR,
        borderRadius: 10,
        borderColor: GRAY,
        shadowColor: GRAY
    },
    buttonChild: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignContent: 'center'
    },
    buttonText: {
        fontFamily: "gilroy-regular",
        fontSize: 19,
        color: WHITE,
        alignSelf: 'center',
    },
    buttonDisabled: {
        backgroundColor: GRAY,
    },
});