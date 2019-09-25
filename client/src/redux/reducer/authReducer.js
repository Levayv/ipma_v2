import {cloneDeep} from "lodash";

import {saveTokenToLocalStorage} from "../../api/mapStoreToLocal";
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../action-types';

/** Token's default value , when user is Unauthorized (type must be string) */
export const emptyToken = "";
const initialState = {
    /** User JWT Authorization token , for Guest token = "unauthorized" */
    session: {
        isValid: false,
        token: emptyToken,
    },
};

const loginReducer = function (state = initialState, action) {
    if (action.type === LOGIN_SUCCESS) {
        const newToken = action.payload.response.data.access_token;
        const newState = cloneDeep(state);
        newState.session.token = newToken;
        newState.session.isValid = true;
        saveTokenToLocalStorage(newToken);
        return newState;
    }
    if (action.type === LOGIN_FAILURE) {
        saveTokenToLocalStorage(emptyToken);
        const newState = cloneDeep(state);
        newState.session.token = emptyToken;
        newState.session.isValid = false;
        return newState;
    }

    return state;
};

export default authReducer;
