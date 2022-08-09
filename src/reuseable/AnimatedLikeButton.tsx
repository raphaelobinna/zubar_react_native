import React from 'react';
import {
    Transition,
    Transitioning,
    TransitioningView,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';
import { SITE_COLOR } from '../style';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import PropTypes, { InferProps } from 'prop-types';

export const ToggleIcon = ({click, returnInput}: InferProps<typeof ToggleIcon.propTypes>) => {
    const ref = React.useRef<TransitioningView | null>(null);
    const [toggled, setToggled] = React.useState(click??false);


    const toggle = () => setToggled(!toggled);

    console.log('toggled', toggled, click);

    const onPress = () => {
        toggle();
        ref.current?.animateNextTransition();
    };

    return (
        <TouchableOpacity onPress={() => {onPress(); returnInput()}} >
        <Transitioning.View ref={ref} transition={transition}>
            {!toggled ? <Icon name='hearto'  size={hp(3.7)} color={SITE_COLOR} /> : <Icon name='heart' size={hp(3.7)} color={SITE_COLOR} />}
        </Transitioning.View>
        </TouchableOpacity>
    );
};

const transition = (
    <Transition.Together>
        <Transition.Out type="scale" durationMs={100} />
        <Transition.Change interpolation="easeInOut" />
        <Transition.In type="scale" durationMs={100} delayMs={50} />
    </Transition.Together>
);

// PropTypes
ToggleIcon.propTypes = {
    returnInput:PropTypes.func.isRequired,
    click:PropTypes.bool,
}