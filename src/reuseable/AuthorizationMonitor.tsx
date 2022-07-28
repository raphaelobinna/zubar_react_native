import * as React from 'react';
import { isEmpty } from '../helpers/helper';
import PropTypes, {  InferProps } from 'prop-types';
import { useAppSelector } from '../redux/actions/constants';

function AuthorizationMonitor({ navigation }:InferProps<typeof AuthorizationMonitor.propTypes>)  {

    const authState = useAppSelector(state => state.auth);
    React.useEffect(() => {
        if (isEmpty(authState.user) || isEmpty(authState.token)) {
            navigation.reset({index: 0, routes: [{ name: 'Welcome' }]});
        }
    }, [authState]);

    return (null)
}

export default AuthorizationMonitor;

// PropTypes
AuthorizationMonitor.propTypes = {
    navigation:PropTypes.shape({
        reset:PropTypes.func.isRequired,
    }),
}