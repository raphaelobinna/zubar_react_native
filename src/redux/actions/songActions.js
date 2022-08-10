import {
  DELETE_COMIC,
  DELETE_SONG,
  EDIT_COMIC,
  EDIT_SONG,
  FILTER_SONG,
  INDEX_COMIC,
  INDEX_SONG,
  SEARCH_COMIC,
  SEARCH_SONG,
  SHOULD_RELOAD_COMIC,
  SHOULD_RELOAD_SONG,
  SHOULD_RELOAD_USER,
  SHOW_COMIC,
  SHOW_SONG,
  STORE_COMIC,
  STORE_SONG,
} from "./types";
import Axios from "../../connection/defaultClient";
import errorHandler from "../../handlers/errorHandler";
import successHandler from "../../handlers/successHandler";
import { toggleActivityLoadingAction } from "../actions/alertActions";
import { mapAs } from "../../helpers/helper";

export const storeASongAction = (payLoad, callBack = () => {}) => {
  return (dispatch) => {
    Axios.post(`/api/song/upload`, { ...payLoad })
      .then((data) => {
        dispatch({ type: STORE_SONG, payLoad: data });
        dispatch({ type: SHOULD_RELOAD_SONG, payLoad: true });

        successHandler(data, true);
        callBack(true);
      })
      .catch((error) => {
        callBack(false);

        errorHandler(error, true);
      });
  };
};

export const getAllSongsAction = (payLoad) => {
  return (dispatch) => {
    Axios.post(`/api/songs`, { ...payLoad })
      .then((data) => {
        dispatch({ type: INDEX_SONG, payLoad: data.data });
      })
      .catch((error) => {
        errorHandler(error, true);
      });
  };
};

export const getSongByLikes = (payLoad) => {
  return (dispatch) => {
    Axios.post(`/api/song/all/like`, { ...payLoad })
      .then((data) => {
        dispatch({ type: FILTER_SONG, payLoad: data.data });
      })
      .catch((error) => {
        errorHandler(error, true);
      });
  };
};

export const searchSongsAction = (payLoad) => {
  return (dispatch) => {
    dispatch(toggleActivityLoadingAction());
    Axios.post(`/api/song/name`, { ...payLoad })
      .then((data) => {
        dispatch({ type: SEARCH_SONG, payLoad: data.data });
        dispatch(toggleActivityLoadingAction());
      })
      .catch((error) => {
        dispatch(toggleActivityLoadingAction());
        errorHandler(error, true);
      });
  };
};

export const likeASongAction = (payLoad) => {
  return (dispatch) => {
    console.log(payLoad);
    //  dispatch(toggleActivityLoadingAction());
    Axios.post(`/api/song/like`, { ...payLoad })
      .then((data) => {
        dispatch({ type: SHOULD_RELOAD_USER, payLoad: true });
        dispatch({ type: SHOW_SONG, payLoad: data.data });
        //dispatch(toggleActivityLoadingAction());
      })
      .catch((error) => {
        // dispatch(toggleActivityLoadingAction());
        errorHandler(error, true);
      });
  };
};

export const showASongAction = (payLoad) => {
  return (dispatch) => {
    dispatch(toggleActivityLoadingAction());
    Axios.get(`/api/song`, { params: { ...payLoad } })
      .then((data) => {
        dispatch({ type: SHOW_SONG, payLoad: data });
        dispatch(toggleActivityLoadingAction());
      })
      .catch((error) => {
        dispatch(toggleActivityLoadingAction());
        errorHandler(error, true);
      });
  };
};

export const editASongAction = (payLoad) => {
  return (dispatch) => {
    dispatch(toggleActivityLoadingAction());
    Axios.post(`/api/song/update`, { ...payLoad })
      .then((data) => {
        dispatch({ type: EDIT_SONG, payLoad: data });
        dispatch(toggleActivityLoadingAction());
      })
      .catch((error) => {
        dispatch(toggleActivityLoadingAction());
        errorHandler(error, true);
      });
  };
};

export const deleteASongAction = (id) => {
  return (dispatch) => {
    dispatch(toggleActivityLoadingAction());
    Axios.post(`/song/delete/${id}`)
      .then((data) => {
        dispatch({ type: DELETE_SONG, payLoad: data });
        dispatch(toggleActivityLoadingAction());
      })
      .catch((error) => {
        dispatch(toggleActivityLoadingAction());
        errorHandler(error, true);
      });
  };
};
