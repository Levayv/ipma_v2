import {cloneDeep} from "lodash";

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_ERROR,
    LOGIN_REFRESH,
} from '../action-types/actionTypes';

/** @type string Token's default value , when user is Unauthorized */
export const emptyToken = "";

const initialState = {
    /** User JWT Authorization token , for Guest token = "unauthorized" */
    session: {
        /** @type boolean*/
        isReady: false,
        /** @type [string] */
        errors: [],
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
        /** When action.payload.response.data.loginSuccess === true
         * @see loginSuccess() function call */

        const newState = cloneDeep(state);
        newState.session.isReady = true;
        newState.session.errors = [];
        return newState;
    }
    if (action.type === LOGIN_FAILURE) {
        /** When action.payload.response.data.loginSuccess === false
         * @see loginSuccess() function call */

        const newState = cloneDeep(state);
        newState.session.isReady = true;
        newState.session.errors = [...action.payload.response.data.errors];
        return newState;
    }
    if (action.type === LOGIN_ERROR) {
        const newState = cloneDeep(state);
        newState.session.isReady = true;
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
