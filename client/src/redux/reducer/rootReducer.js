import {combineReducers} from 'redux'

import authReducer from "./authReducer";
import lessonReducer from "./lessonReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    lesson: lessonReducer,
});

export default rootReducer;