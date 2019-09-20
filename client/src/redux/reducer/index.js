import {combineReducers} from 'redux'

import loginReducer from "./loginReducer";
import lessonReducer from "./lessonReducer";

export const rootReducer = combineReducers({
    auth: loginReducer,
    lesson: lessonReducer,
});

export default rootReducer;