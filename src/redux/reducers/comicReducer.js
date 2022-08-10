import {
  STORE_COMIC,
  INDEX_COMIC,
  SEARCH_COMIC,
  SHOW_COMIC,
  EDIT_COMIC,
  DELETE_COMIC,
  SHOULD_RELOAD_COMIC,
  FILTER_COMIC,
} from "../actions/types";

const initialState = {
  singleComic: {},
  comics: [],
  searchComic: [],
  filteredComic: [],
  shouldReload: false,
};

export default function comicReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_COMIC:
      return {
        ...state,
        singleComic: action.payLoad,
      };

    case INDEX_COMIC:
      return {
        ...state,
        comics: action.payLoad.data.data,
      };

    case FILTER_COMIC:
      return {
        ...state,
        filteredComic: action.payLoad.data,
      };

    case SEARCH_COMIC:
      return {
        ...state,
        searchComic: action.payLoad,
      };

    case SHOW_COMIC:
      return {
        ...state,
        singleComic: action.payLoad,
      };

    case EDIT_COMIC:
      return {
        ...state,
        singleComic: action.payLoad,
      };

    case DELETE_COMIC:
      return {
        ...state,
        singleComic: action.payLoad,
      };

    case SHOULD_RELOAD_COMIC:
      return {
        ...state,
        shouldReload: !state.shouldReload,
      };

    default:
      return state;
  }
}
