import { USER_HELP_MESSAGE, SAVE_GENDER, SAVE_BOOLEAN_CHOICE, SAVE_FLAG_CHOICE, STORE_COMIC, INDEX_COMIC, SEARCH_COMIC, SHOW_COMIC, EDIT_COMIC, DELETE_COMIC, SHOULD_RELOAD_COMIC } from '../actions/types';

const initialState = {
    singleComic: {},
    comics: [],
    searchComic: [],
    shouldReload: false,
}

export default function comicReducer(state = initialState, action) {

    switch (action.type) {

        case STORE_COMIC:
            return {
                ...state,
                singleComic: action.payLoad
            }

        case INDEX_COMIC:
            return {
                ...state,
                comics: action.payLoad.data.data
            }

        case SEARCH_COMIC:
            return {
                ...state,
                searchComic: action.payLoad
            }

        case SHOW_COMIC:
            return {
                ...state,
                singleComic: action.payLoad
            }

        case EDIT_COMIC:
            return {
                ...state,
                singleComic: action.payLoad
            }

        case DELETE_COMIC:
            return {
                ...state,
                singleComic: action.payLoad
            }

            case SHOULD_RELOAD_COMIC:
            return {
                ...state,
                shouldReload: !state.shouldReload,
            }

        default:
            return state;
    }
}