import {
    // LOGIN_ATTEMPT,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from '../action-types';
import {saveTokenToLocalStorage} from "../../api/mapStoreToLocal";

// todo change default value
/** Token's default value , when user is Unauthorized */
const emptyToken = "unauthorized";
const initState = {
    temp: {
        singleRecord: {
            name: "",
            link: "",
        },
        list: [],
        bulkList: [],
        formData: {
            name: "",
            link: "",
        },
        page: null,
    },
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
    //-------------------------------------------------

    // if (action.type === CRUD_READ_ALL) {
    //     let data = action.payload.data;
    //     return Object.assign({}, state, {
    //             bulkList: action.payload.bulkData
    //         }
    //     )
    // }
    // if (action.type === CRUD_READ) {
    //     let singleRecord = action.payload.singleRecord;
    //     return Object.assign({}, state, {
    //             singleRecord: action.payload.singleRecord
    //         }
    //     )
    // }
    // if (action.type === FORM_DATA_UPDATE) {
    //     const nameOfProperty = Object.keys(action.payload)[0];
    //     const value = action.payload[nameOfProperty];
    //     let match;
    //     match = "name";
    //     if (nameOfProperty === match){
    //         return Object.assign({}, state, {
    //                 formData:{
    //                     name: action.payload.name,
    //                     link: state.formData.link,
    //                 }
    //             }
    //         )
    //     }
    //     match = "link";
    //     if (nameOfProperty === match){
    //         return Object.assign({}, state, {
    //                 formData:{
    //                     name: state.formData.name,
    //                     link: action.payload.link,
    //                 }
    //             }
    //         )
    //     }
    // }
    return state;
}

export default root;