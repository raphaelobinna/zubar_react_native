import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { INPUT_GRAY, LIGHT_GRAY } from './colors';

const BASE_FONT_SIZE = 4;
const SECTION_HEADING = {
    h1: {
        fontFamily: "gilroy-bold",
        fontSize: BASE_FONT_SIZE * 9,
        color: '#000000',
        marginTop: BASE_FONT_SIZE * 0.67,
        marginBottom: BASE_FONT_SIZE * 0.67
    },
    h2: {
        fontFamily: "gilroy-bold",
        fontSize: BASE_FONT_SIZE * 8,
        color: '#000000',
        marginTop: BASE_FONT_SIZE * 0.83,
        marginBottom: BASE_FONT_SIZE * 0.83
    },
    h3: {
        fontFamily: "gilroy-bold",
        fontSize: BASE_FONT_SIZE * 7,
        color: '#000000',
        marginTop: BASE_FONT_SIZE * 1,
        marginBottom: BASE_FONT_SIZE * 1
    },
    h4: {
        fontFamily: "gilroy-bold",
        fontSize: BASE_FONT_SIZE * 6,
        color: '#000000',
        marginTop: BASE_FONT_SIZE * 1.33,
        marginBottom: BASE_FONT_SIZE * 1.33
    },
    h5: {
        fontFamily: "gilroy-bold",
        fontSize: BASE_FONT_SIZE * 4.5,
        color: '#000000',
        marginTop: BASE_FONT_SIZE * 1.67,
        marginBottom: BASE_FONT_SIZE * 1.67
    },
    h6: {
        fontFamily: "gilroy-bold",
        fontSize: BASE_FONT_SIZE * 4,
        color: '#000000',
        marginTop: BASE_FONT_SIZE * 2.33,
        marginBottom: BASE_FONT_SIZE * 2.33
    },
    r: {
        fontFamily: "gilroy-regular",
        fontSize: 16,
        color: '#000000',
    },

};

const SECTION_TEXT = {
    textLargeLeft: {
        alignSelf: 'flex-start',
        fontFamily: "gilroy-regular",
        fontSize: 16,
        marginBottom:5,
        color: '#4D4D4D'
    },
    textLargeBoldLeft: {
        alignSelf: 'flex-start',
        fontFamily: "gilroy-medium",
        fontSize: 16,
        marginBottom:5,
        color: '#4D4D4D'
    },
    textLargeRight: {
        alignSelf: 'flex-end',
        fontFamily: "gilroy-regular",
        fontSize: 16,
        marginBottom:5,
        color: '#4D4D4D'
    },
    textLargeBoldRight: {
        alignSelf: 'flex-end',
        fontFamily: "gilroy-medium",
        fontSize: 16,
        marginBottom:5,
        color: '#4D4D4D'
    },
    textMediumRight: {
        alignSelf: 'flex-end',
        fontFamily: "gilroy-regular",
        fontSize: 12,
        color: 'rgba(112, 112, 112, 0.7)'
        
    },
    textMediumLeft: {
        alignSelf: 'flex-start',
        fontFamily: "gilroy-regular",
        fontSize: 12,
        color: 'rgba(112, 112, 112, 0.7)'
    },
    textSubMediumLeft: {
        fontFamily: "gilroy-medium",
        fontSize: 14,
        lineHeight: 18,
        color: 'rgba(112, 112, 112, 1)',
        textAlign: 'left'
    },
    detailMediumRight:{
        fontFamily: "gilroy-bold",
        fontSize: 14,
        color: '#4D4D4D',
        lineHeight: 18,
        textAlign: 'right'
    },
    detailMediumLeft:{
        fontFamily: "gilroy-regular",
        fontSize: 14,
        lineHeight: 18,
        color: 'rgba(112, 112, 112, 1)',
        textAlign: 'left'
    }

}

export {
    SECTION_HEADING,
    SECTION_TEXT
}