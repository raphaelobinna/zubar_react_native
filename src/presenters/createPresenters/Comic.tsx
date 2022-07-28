import React, { useState } from 'react';

import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { HeaderLeft } from '../../header/HeaderLeft';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { PaperBoardLayout } from '../../layouts/PaperBoardLayout';
import { BLACK, GRAY, LIGHT_ORANGE, LIGHT_PINK, LIGHT_PURPLE, LIGHT_RED, SITE_COLOR, WHITE } from '../../style';
import InputText from '../../reuseable/InputText';
import InputTextArea from '../../reuseable/InputTextArea';
import InputImage from '../../reuseable/InputImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { isEmpty } from '../../helpers/helper';
import { useAppDispatch } from '../../redux/actions/constants';
import { storeAComicAction } from '../../redux/actions/comicActions';
import { useDispatch } from 'react-redux';

export default function ComicCreate({ navigation }) {

    const dispatch = useAppDispatch()

    const [input, setInput] = useState({
        comic_name: '',
        description: '',
        images: [],
    })

    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //       headerShown: true,

    //       headerTitle : () => (<HeaderLeft />)
    //     }); 
    //   }, [navigation]); 
    

    function deleteItem(item) {
        setInput({
            ...input,
            images: input.images.filter(i => i.uri !== item.uri)
        })
    }

    function onSubmit() {
        if(!isEmpty(input.comic_name) && !isEmpty(input.description) && !isEmpty(input.images)) {
            dispatch(storeAComicAction(input, ()=> navigation.goBack()))
            return;
        }
        alert('Please fill all the fields')
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.imageSingle} >
                <Image style={{ height:'100%', width:'100%' }} resizeMode={'cover'} source={{ uri: item.uri }} />
                <Icon name="delete-circle-outline" onPress={() => deleteItem(item)} style={styles.deleteIcon}  size={30} color={LIGHT_RED} />
            </TouchableOpacity>
        )
    }

    console.log(input )

    return (

        <PaperBoardLayout style={Container} navigation={navigation} >
            <View style={styles.article}>
                <InputText label={'Title'} style={InputStyle} placeholder={'Enter your title'} returnInput={value => setInput({ ...input, comic_name: value })} />
            </View>

            <View style={styles.article}>
                <InputTextArea label={'Description'} numberOfLines={4} style={InputStyle} placeholder={'Enter your description'} returnInput={value => setInput({ ...input, description: value })} />
            </View>

            <View style={styles.imageContainer}>

                <InputImage title={'Upload Comic Slide'} edit={false} onRemove={() => { }} returnInput={(value) => value && setInput({...input, images: [...input.images, value]  })} >
                    <View style={styles.plusCircle}>
                        <Icon style={{alignSelf:'center'}} name="plus" size={30} color={SITE_COLOR} />
                    </View>

                </InputImage>

            </View>

            <FlatList

                data={input.images}
                numColumns={2}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />

            <TouchableOpacity style={styles.floatingIcon} onPress={() => onSubmit()} >
                <Icon name="cloud-upload" size={50} color={isEmpty(input.images) ? GRAY : SITE_COLOR} />
            </TouchableOpacity>

        </PaperBoardLayout>

    );
}

const Container = StyleSheet.create({
    container: {
        paddingHorizontal: wp(5),
    }
});

const InputStyle = StyleSheet.create({
    inputFence: {
        borderWidth: 0,
        backgroundColor: 'rgba(29, 113, 185, 0.04)',
        marginLeft: '1%',
        marginRight: '1%',
    },
    input: {
        color: BLACK,
        fontSize: 14,
        lineHeight: 16,
        fontFamily: 'gilroy-regular',
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        paddingTop: 60,
        paddingHorizontal: 28,
    },
    article: {
        marginVertical: '3%'
    },
    svg: {
        marginBottom: hp(5),
        alignSelf: 'center'
    },
    largeText: {
        fontSize: hp(5),
        fontFamily: 'gilroy-bold',

        color: BLACK,
        marginBottom: 32
    },
    boldText: {
        fontFamily: 'gilroy-bold',
        color: SITE_COLOR
    },
    smallText: {
        fontSize: hp(2),
        textAlign: 'center',
        fontFamily: 'gilroy-regular',
        color: GRAY,

    },
    plusCircle: {
        alignSelf: 'center',
        height: hp(5),
        justifyContent: 'center',
        backgroundColor: 'rgba(29, 113, 185, 0.04)',
        width: hp(5),
        borderRadius: hp(5),

    },
    separator:{
        height: 10,
        width:10,
      
    },
    imageContainer: {
        height: hp(15),
        width: wp(90),
        borderWidth: 2,
        marginBottom:10,
        borderStyle:'dashed',
        borderColor:'rgba(29, 113, 185, 0.4)',
        borderRadius: hp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageSingle: {
        height: hp(15),
        width: wp(50),
     
        borderRadius:10,
       
    },
    deleteIcon:{
        position:'absolute',
        marginLeft:6,
        marginTop:4
    }, 
    floatingIcon:{
        position:'absolute',
        top:hp('60%'),
        right:wp('5%'),
    }
})