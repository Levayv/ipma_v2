import {LOGIN_TEMP} from "../action-types";

const initState = {
    temp:{
        singleRecord:{
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
    token:"",
};
function root(state = initState, action) {
    // todo refactor to seperate reducers and combine them
    if (action.type === LOGIN_TEMP) {
        return Object.assign({}, state, {
                token: action.payload
            }
        )
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