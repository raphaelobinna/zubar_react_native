import * as React from 'react';
import PropTypes, {  InferProps } from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GRAY, WHITE } from '../style';

 function AccordionWithGlance({style={}, header, children, onPress, isExpanded=false}:InferProps<typeof AccordionWithGlance.propTypes>) {

    const [expanded, toggleExpanded] = React.useState(isExpanded);

    return (
        <View>
            <TouchableOpacity style={[styles.header, style.header]} onPress={()=>toggleExpanded(!expanded)}>
                <View style={[styles.headerContent, style.headerContent]}>
                    {header ?? null}
                </View>
                <View style={[styles.headerBottom, style.headerBottom]}>
                    <View style={[styles.hl, style.hl]}></View>
                    <Icon name={expanded ? 'chevron-up-circle-outline' : 'chevron-down-circle-outline'} size={30} color={GRAY} style={[styles.toggleIcon, style.toggleIcon]} />
                    <View style={[styles.hl, style.hl]}></View>
                </View>
            </TouchableOpacity>

            {expanded && 
            <TouchableOpacity style={[styles.children, style.children]} onPress={()=>onPress()}>
                <View style={[styles.childrenContent, style.childrenContent]}>
                    {children ?? null}
                </View>
                <View style={[styles.childrenBottom, style.childrenBottom]}>
                    <View style={[styles.hr, style.hr]}/>
                </View>
            </TouchableOpacity>}
       </View>
    )
}

// PropTypes
AccordionWithGlance.propTypes = {
    style:PropTypes.shape({
        header:PropTypes.object,
        headerContent:PropTypes.object,
        headerBottom:PropTypes.object,
        hl:PropTypes.object,
        toggleIcon:PropTypes.object,
        children:PropTypes.object,
        childrenContent:PropTypes.object,
        childrenBottom:PropTypes.object,
        hr:PropTypes.object,
    }),
    header:PropTypes.string.isRequired,
    children:PropTypes.element.isRequired,
    onPress:PropTypes.func.isRequired,
    isExpanded:PropTypes.bool,
}

export default AccordionWithGlance;

const styles = StyleSheet.create({
    header:{
        flexDirection: 'column',
        justifyContent:'space-between',
        paddingTop:'3%',
        backgroundColor: WHITE,
    },
    headerContent:{
        paddingLeft:'3%',
        paddingRight:'3%',
    },
    headerBottom:{
        marginTop:'3%',
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:'4%',
    },
    toggleIcon:{
        marginBottom:-15,
        alignSelf:'flex-end',
    },
    hl:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        height:1,
        width:'100%',
        alignSelf:'flex-end',
        color:GRAY
    },
    hr:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        height:1,
        width:'100%',
        alignSelf:'flex-end',
        color:GRAY
    },
    children:{
        flexDirection: 'column',
        justifyContent:'space-between',
        paddingTop:'3%',
        backgroundColor: WHITE,
    },
    childrenContent:{
        paddingLeft:'3%',
        paddingRight:'3%',
    },
    childrenBottom:{
        marginTop:'3%',
        flexDirection:'row',
        justifyContent:'center'
    },
});