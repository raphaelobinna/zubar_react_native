import * as React from "react";
import PropTypes, { InferProps } from 'prop-types';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function InputImage({style={}, children, returnInput}: InferProps<typeof InputImage.propTypes>) {

  const [Image, setImage] = React.useState({});

    React.useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            setImage(result);
            returnInput(result);
        }
    };

    return (
        <TouchableOpacity onPress={pickImage} style={[styles.input, style.input]}>
            {children ?? null}
        </TouchableOpacity>
    );
}

export default InputImage;

// PropTypes
InputImage.propTypes = {
    returnInput:PropTypes.func.isRequired,
    style:PropTypes.shape({
        input:PropTypes.object,
    }),
    children:PropTypes.element,
}

const styles = StyleSheet.create({
    input:{
        padding:'1%',
    }
});