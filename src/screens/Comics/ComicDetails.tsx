import React from 'react';

import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native'
import { PaperBoardLayout } from '../../layouts/PaperBoardLayout';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { BLACK, LIGHT_GRAY, SITE_COLOR } from '../../style';
import { isEmpty } from '../../helpers/helper';
import InputText from '../../reuseable/InputText';
import { useAppDispatch } from '../../redux/actions/constants';
import { likeAComicAction } from '../../redux/actions/comicActions';
import { ToggleIcon } from '../../reuseable/AnimatedLikeButton';


export default function ComicsDetails({ navigation, route }) {
    const { comic } = route.params;

    const dispatch = useAppDispatch()

    const [comment, setComment] = React.useState('');

    const [click, setClick] = React.useState(false);

    function onPress() {
     
        setClick(true);
        dispatch(likeAComicAction({ id: comic.id }))

    }

    return (

        <PaperBoardLayout navigation={navigation} >
            <ScrollView style={{ padding: wp(3) }} >

                <View style={styles.imageContainer}>
                    <Image style={styles.image} resizeMode={'cover'} source={{ uri: comic?.slides[0]?.link }} />
                </View>

                <View style={{ marginBottom: hp(2) }} >
                    <Text style={styles.title}>{comic?.comic_name}</Text>
                    <Text style={styles.description}>{comic?.description}</Text>
                </View>

                <ScrollView horizontal style={styles.cardRow} >
                    {
                        comic?.slides.map((item, index) => (
                            <View key={index} style={styles.card} >
                                <Image style={styles.image} resizeMode={'cover'} source={{ uri: item?.link }} />
                            </View>
                        ))
                    }
                </ScrollView>

                <View style={{ ...styles.cardRow, marginVertical: hp(2) }} >
                    {/* <TouchableOpacity onPress={() => dispatch(likeAComicAction({ id: comic.id }))} >
                        <Icon style={styles.icon} name={'heart-multiple-outline'} size={hp(4)} color={SITE_COLOR} />
                    </TouchableOpacity> */}

                    <ToggleIcon click={click} returnInput={() => onPress()} />

                    <MaterialIcon style={styles.icon} name={'monetization-on'} size={hp(4)} color={LIGHT_GRAY} />

                    <TouchableOpacity style={styles.floatingIcon} onPress={() => navigation.navigate('ComicView', { comic: comic?.slides })} >
                        <Icon name="eye" size={hp(4)} color={'rgba(29, 113, 185, 0.5)'} />
                    </TouchableOpacity>
                </View>



                <Text style={styles.comments} >Comments</Text>
                <View style={styles.cardRow} >
                    <InputText style={InputStyle} placeholder={'Enter a comment'} returnInput={value => setComment(value)} />
                    <Icon name={'waze'} size={hp(4)} color={SITE_COLOR} />
                </View>


                {
                    !isEmpty(comic?.comments) && comic?.comments.map((item, index) => (
                        <Text key={index} style={styles.commentText} >{item?.comment}</Text>
                    ))
                }

            </ScrollView>
        </PaperBoardLayout>

    )

}

const InputStyle = StyleSheet.create({
    inputFence: {
        borderWidth: 0,
        backgroundColor: 'rgba(29, 113, 185, 0.04)',
        marginLeft: '1%',
        width: '90%',
        marginRight: 0

    },
    input: {
        color: BLACK,
        fontSize: 14,
        lineHeight: 16,
        fontFamily: 'gilroy-regular',
    }
});

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: hp(30),
        borderRadius: wp(10),
        marginBottom: hp(2),
    },
    image: {
        width: '100%',
        borderRadius: wp(5),
        height: '100%',
    },
    title: {
        fontSize: hp(2.5),
        fontWeight: 'bold',
        fontFamily: 'gilroy-bold',
        marginBottom: hp(1.5),
        letterSpacing: 0.5,
    },
    description: {
        fontSize: hp(1.7),
        fontFamily: 'gilroy-regular',
        letterSpacing: 0.5,
    },
    card: {
        width: wp(40),
        height: hp(30),
        marginHorizontal: wp(5),
    },
    cardRow: {
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: wp(2),
    },
    comments: {
        marginBottom: hp(2),
        fontSize: hp(2),
        fontFamily: 'gilroy-semiBold',

    },
    commentText: {
        fontSize: hp(1.5),
        marginVertical: hp(1),
        fontFamily: 'gilroy-regular',
    },
    floatingIcon: {
        position: 'absolute',

        right: wp(2),
    }
})