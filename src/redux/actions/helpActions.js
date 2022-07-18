import { USER_HELP_MESSAGE, SAVE_GENDER, SAVE_BOOLEAN_CHOICE, SAVE_FLAG_CHOICE, ONBOARD_INVITE, SHOULD_RELOAD_COURIERS } from './types';

export const saveGenderAction = () => {
    return (dispatch) => {
        const gender = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }]

        dispatch({ type: SAVE_GENDER, payLoad: gender });
    }
}

export const saveFlagAction = () => {
    return (dispatch) => {
        const flags = [{ value: 0, label: 0 }, { value: 1, label: 1 }, { value: 2, label: 2 }, { value: 3, label: 3 },
            { value: 4, label: 4 }, { value:5, label: 5 }]

        dispatch({ type: SAVE_FLAG_CHOICE, payLoad: flags });
    }
}

export const saveBooleanChoiceAction = () => {
    return (dispatch) => {
        const boolean = [{ value: 1, label: 'true' }, { value:0, label: 'false' }]
        dispatch({ type: SAVE_BOOLEAN_CHOICE, payLoad: boolean });
    }
}