import { DELETE_COMIC, EDIT_COMIC, INDEX_COMIC, SEARCH_COMIC, SHOW_COMIC, STORE_COMIC } from './types';
import Axios from '../../connection/defaultClient';
import errorHandler from '../../handlers/errorHandler';
import successHandler from '../../handlers/successHandler';
import { toggleActivityLoadingAction } from "../actions/alertActions";
import { mapAs } from '../../helpers/helper';


export const storeAComicAction = (payLoad, callBack) => {
    return (dispatch) => {

        Axios.post(`/api/comic/upload`, { ...payLoad })
            .then(data => {
                dispatch({ type: STORE_COMIC, payLoad: data });
                successHandler(data, true)
                callBack()
            })
            .catch((error) => {
                errorHandler(error, true);
            });
    }
}

export const getAllComicsAction = (payLoad) => {
    return (dispatch) => {
console.log('reacheddd', payLoad)
        Axios.post(`/api/comics`, {...payLoad})
            .then(data => {
console.log('facts',data)
                dispatch({ type: INDEX_COMIC, payLoad: data.data });
            })
            .catch((error) => {
                console.log('dhsjd', error)
                errorHandler(error, true);
            });
    }
}

export const searchComicsAction = (payLoad) => {
    return (dispatch) => {
        dispatch(toggleActivityLoadingAction());
        Axios.post(`/api/comic/name`, { ...payLoad })
            .then(data => {
                dispatch({ type: SEARCH_COMIC, payLoad: data.data });
                dispatch(toggleActivityLoadingAction());
            })
            .catch((error) => {
                dispatch(toggleActivityLoadingAction());
                errorHandler(error, true);
            });
    }
}

export const showAComicAction = (payLoad) => {
    return (dispatch) => {
        dispatch(toggleActivityLoadingAction());
        Axios.get(`/api/company/show`, { params: { ...payLoad } })
            .then(data => {
                dispatch({ type: SHOW_COMIC, payLoad: data });
                dispatch(toggleActivityLoadingAction());
            })
            .catch((error) => {
                dispatch(toggleActivityLoadingAction());
                errorHandler(error, true);
            });
    }
}

export const editAComicAction = (payLoad) => {
    return (dispatch) => {
        dispatch(toggleActivityLoadingAction());
        Axios.post(`/api/comic/update`, { ...payLoad })
            .then(data => {
                dispatch({ type: EDIT_COMIC, payLoad: data });
                dispatch(toggleActivityLoadingAction());
            })
            .catch((error) => {
                dispatch(toggleActivityLoadingAction());
                errorHandler(error, true);
            });
    }
}

export const deleteAComicAction = (payLoad) => {
    return (dispatch) => {
        dispatch(toggleActivityLoadingAction());
        Axios.post(`/comic/delete`, { ...payLoad })
            .then(data => {
                dispatch({ type: DELETE_COMIC, payLoad: data });
                dispatch(toggleActivityLoadingAction());
            })
            .catch((error) => {
                dispatch(toggleActivityLoadingAction());
                errorHandler(error, true);
            });
    }
}