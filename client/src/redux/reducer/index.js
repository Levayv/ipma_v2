import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from '../action-types';
import {saveTokenToLocalStorage} from "../../api/mapStoreToLocal";

/** Token's default value , when user is Unauthorized */
const emptyToken = "unauthorized";
const initState = {
    /** User JWT Authorization token , for Guest token = "unauthorized" */
    session: {
        token: emptyToken
    },
};

function root(state = initState, action) {
    // todo refactor to separate reducers and combine them
    if (action.type === LOGIN_SUCCESS) {
        const newToken = action.payload.response.data.access_token;
        saveTokenToLocalStorage(newToken);
        return Object.assign({}, state, {
            token: newToken
        });
    }
    if (action.type === LOGIN_FAIL) {
        saveTokenToLocalStorage(emptyToken);
        return Object.assign({}, state, {
            token: emptyToken
        });

    }
    return state;
}

export default root;