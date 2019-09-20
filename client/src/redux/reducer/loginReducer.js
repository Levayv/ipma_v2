import {cloneDeep} from "lodash";
import {saveTokenToLocalStorage} from "../../api/mapStoreToLocal";
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../action-types';

/** Token's default value , when user is Unauthorized */
const emptyToken = "unauthorized";
const initialState = {
    /** User JWT Authorization token , for Guest token = "unauthorized" */
    session: {
        token: emptyToken
    },
};

const loginReducer = function (state = initialState, action) {
    if (action.type === LOGIN_SUCCESS) {
        const newToken = action.payload.response.data.access_token;
        const newState = cloneDeep(state);
        newState.token = newToken;
        saveTokenToLocalStorage(newToken);
        return newState;
    }
    if (action.type === LOGIN_FAILURE) {
        saveTokenToLocalStorage(emptyToken);
        const newState = cloneDeep(state);
        newState.token = emptyToken;
        return newState;
    }

    return state;
};

export default loginReducer;
