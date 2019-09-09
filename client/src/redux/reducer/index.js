import {CRUD_READ_ALL} from "../action-types";
import {CRUD_READ} from "../action-types";
import {FORM_DATA_UPDATE} from "../action-types";

const initState = {
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
    page: null
};
function root(state = initState, action) {
    // todo refactor to seperate reducers and combine them
    // switch (action.type) {
    //     case ACTTION_TYPE_1:
    //         break;
    //     case ACTTION_TYPE_2:
    //         break;
    // }
    if (action.type === CRUD_READ_ALL) {
        let data = action.payload.data;
        return Object.assign({}, state, {
                bulkList: action.payload.bulkData
            }
        )
    }
    if (action.type === CRUD_READ) {
        let singleRecord = action.payload.singleRecord;
        return Object.assign({}, state, {
                singleRecord: action.payload.singleRecord
            }
        )
    }
    if (action.type === FORM_DATA_UPDATE) {
        const nameOfProperty = Object.keys(action.payload)[0];
        const value = action.payload[nameOfProperty];
        let match;
        match = "name";
        if (nameOfProperty === match){
            return Object.assign({}, state, {
                    formData:{
                        name: action.payload.name,
                        link: state.formData.link,
                    }
                }
            )
        }
        match = "link";
        if (nameOfProperty === match){
            return Object.assign({}, state, {
                    formData:{
                        name: state.formData.name,
                        link: action.payload.link,
                    }
                }
            )
        }
    }
    return state;
}

export default root;