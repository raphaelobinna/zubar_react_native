import { USER_HELP_MESSAGE, SAVE_GENDER, SAVE_BOOLEAN_CHOICE, SAVE_FLAG_CHOICE } from '../actions/types';

const initialState = {
    userHelpMessage: {},
    gender: [],
    boolean: [],
    flag: []
}

export default function helpReducer(state = initialState, action) {

    switch (action.type) {

        case USER_HELP_MESSAGE:
            return {
                ...state,
                helpMessage: action.payLoad
            }

        case SAVE_GENDER:
            return {
                ...state,
                gender: action.payLoad
            }

        case SAVE_BOOLEAN_CHOICE:
            return {
                ...state,
                boolean: action.payLoad
            }

        case SAVE_FLAG_CHOICE:
            return {
                ...state,
                flag: action.payLoad
            }

        default:
            return state;
    }
}