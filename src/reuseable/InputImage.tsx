import * as React from "react";
import PropTypes, { InferProps } from 'prop-types';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerModal } from "../presenters/modals/ImagePickModal";


function InputImage({ style = {}, children, title, edit, onRemove, returnInput }: InferProps<typeof InputImage.propTypes>) {

    const [Image, setImage] = React.useState({});

    const [modalVisible, setModalVisible] = React.useState(false)

    // React.useEffect(() => {
    //     (async () => {
    //         if (Platform.OS !== 'web') {
    //             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //             if (status !== 'granted') {
    //                 alert('Sorry, we need camera roll permissions to make this work!');
    //             }
    //         }
    //     })();
    // }, []);

    const pickImage = async () => {
        if (Platform.OS !== 'web') {
            const { status, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            console.log(canAskAgain);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
             base64: true,
        });

        if (!result.cancelled) {
            setImage(result);
            returnInput(result);
            setModalVisible(false);
        }
    };

    const chooseCamera = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            // base64: true,
        });

        if (!result.cancelled) {
            setImage(result);
            returnInput(result);
            setModalVisible(false);
        }
    };

    return (
        <>

            <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.input, style.input]}>
                {children ?? null}
            </TouchableOpacity>

            <ImagePickerModal
                edit={edit}
                title={title}
                onRemove={onRemove}
                modalVisible={modalVisible}
                modalControl={(value) => setModalVisible(value)}
                onClose={() => setModalVisible(false)}
                cancelButtonText={'Take Photo'}
                confirmButtonText={'Choose from Library'}
                onConfirm={() => pickImage()}
                onCancel={() => chooseCamera()}
            />


        </>
    );
}

export default InputImage;

// PropTypes
InputImage.propTypes = {
    returnInput: PropTypes.func.isRequired,
    style: PropTypes.shape({
        input: PropTypes.object,
    }),
    children: PropTypes.element,
    title: PropTypes.string,
    onRemove: PropTypes.func,
    edit: PropTypes.bool,
}

const styles = StyleSheet.create({
    input: {
        padding: '1%',
    }
});