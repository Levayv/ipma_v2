import {cloneDeep} from "lodash";

import {saveTokenToLocalStorage} from "../../api/mapStoreToLocal";
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_REFRESH,
} from '../action-types/actionTypes';

/** @type string Token's default value , when user is Unauthorized */
export const emptyToken = "";
const initialState = {
    /** User JWT Authorization token , for Guest token = "unauthorized" */
    session: {
        /** @type boolean*/
        isReady: false,
        /** @type Array*/
        errors: [],
        /** @type string*/
        token: emptyToken,
    },
};
/** Combined in rootReducer
 * @see rootReducer
 * */
const authReducer = function (state = initialState, action) {
    if (action.type === LOGIN_REQUEST) {
        const newState = cloneDeep(state);
        newState.session.isReady = false;
        newState.session.errors = [];
        return newState;
    }
    if (action.type === LOGIN_SUCCESS) {
        const newToken = action.payload.response.data.access_token;
        const newState = cloneDeep(state);
        newState.session.token = newToken;
        newState.session.isReady = true;
        saveTokenToLocalStorage(newToken);
        return newState;
    }
    if (action.type === LOGIN_FAILURE) {
        saveTokenToLocalStorage(emptyToken);
        const newState = cloneDeep(state);
        newState.session.token = emptyToken;
        newState.session.isReady = true;
        newState.session.errors = ["Error #@!?!","Error #@!?!","Error #@!?!"];
        // newState.session.errors = [action.payload.error.toString()];
        return newState;
    }
    if (action.type === LOGIN_REFRESH) {
        const newState = cloneDeep(state);
        newState.session.isReady = false;
        return newState;
    }

    return state;
};

export default authReducer;
