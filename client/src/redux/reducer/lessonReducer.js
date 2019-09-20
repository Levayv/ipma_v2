import {cloneDeep} from "lodash";
import {
    READ_SINGLE_LESSON_REQUEST,
    READ_SINGLE_LESSON_SUCCESS,
    READ_SINGLE_LESSON_FAILURE,
    READ_BULK_LESSON_REQUEST,
    READ_BULK_LESSON_SUCCESS,
    READ_BULK_LESSON_FAILURE,
} from '../action-types';

const initialState = {
    single:{
        loading: false,
        data: "",
        error: "",
    },
    bulk:{
        loading: false,
        data: "",
        error: "",
    },
};


const lessonReducer = (state = initialState, action) => {
    // --- --- --- Lesson Read Single --- --- --- //

    if (action.type === READ_SINGLE_LESSON_REQUEST) {
        // clone only lesson object from state
        const newState_Lesson_Single = cloneDeep(state.single);
        newState_Lesson_Single.loading = true;
        newState_Lesson_Single.data = "";
        newState_Lesson_Single.error = "";
        return Object.assign({}, state, {
            single: newState_Lesson_Single
        });
    }
    if (action.type === READ_SINGLE_LESSON_SUCCESS) {
        const newState_Lesson_Single = cloneDeep(state.single);
        newState_Lesson_Single.loading = false;
        newState_Lesson_Single.data = action.payload.response.data;

        // todo hotfix
        newState_Lesson_Single.data.topic = action.payload.response.data.topic_id;

        return Object.assign({}, state, {
            single: newState_Lesson_Single
        });
    }
    if (action.type === READ_SINGLE_LESSON_FAILURE) {
        const newState_Lesson_Single = cloneDeep(state.single);
        newState_Lesson_Single.loading = false;
        newState_Lesson_Single.error = action.payload.error.toString();
        return Object.assign({}, state, {
            single: newState_Lesson_Single
        });
    }

    // --- --- --- Lesson Read Bulk --- --- --- //

    if (action.type === READ_BULK_LESSON_REQUEST) {
        // clone only lesson object from state
        const newState_Lesson_Bulk = cloneDeep(state.bulk);
        newState_Lesson_Bulk.loading = true;
        newState_Lesson_Bulk.data = "";
        newState_Lesson_Bulk.error = "";
        return Object.assign({}, state, {
            bulk: newState_Lesson_Bulk
        });
    }
    if (action.type === READ_BULK_LESSON_SUCCESS) {
        const newState_Lesson_Bulk = cloneDeep(state.bulk);
        newState_Lesson_Bulk.loading = false;
        newState_Lesson_Bulk.data = action.payload.response.data;
        return Object.assign({}, state, {
            bulk: newState_Lesson_Bulk
        });
    }
    if (action.type === READ_BULK_LESSON_FAILURE) {
        const newState_Lesson_Bulk = cloneDeep(state.bulk);
        newState_Lesson_Bulk.loading = false;
        newState_Lesson_Bulk.error = action.payload.error.toString();
        return Object.assign({}, state, {
            bulk: newState_Lesson_Bulk
        });
    }

    return state;
};

export default lessonReducer;
