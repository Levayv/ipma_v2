import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import root from "../reducer";
import {
    loggerTest,
} from "../middleware";

const store = createStore(
    root,
    applyMiddleware(
        thunk,
        loggerTest,
    )
);

// todo STOPSHIP remove , for testing purposes only
window.store = store;

export default store;