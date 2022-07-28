import { DELETE_SONG, EDIT_SONG, INDEX_SONG, SEARCH_SONG, SHOULD_RELOAD_SONG, SHOW_SONG, STORE_SONG } from '../actions/types';

const initialState = {
    singleSong: {},
    songs: [],
    searchSong: [],
    shouldReload: false,
}

export default function songReducer(state = initialState, action) {

    switch (action.type) {

        case STORE_SONG:
            return {
                ...state,
                singleSong: action.payLoad
            }

        case INDEX_SONG:
            return {
                ...state,
                songs: action.payLoad.data.data
            }

        case SEARCH_SONG:
            return {
                ...state,
                singleSong: action.payLoad
            }

        case SHOW_SONG:
            return {
                ...state,
                singleSong: action.payLoad
            }

        case EDIT_SONG:
            return {
                ...state,
                singleSong: action.payLoad
            }

        case DELETE_SONG:
            return {
                ...state,
                singleSong: action.payLoad
            }

            case SHOULD_RELOAD_SONG:
            return {
                ...state,
                shouldReload: !state.shouldReload,
            }

        default:
            return state;
    }
}