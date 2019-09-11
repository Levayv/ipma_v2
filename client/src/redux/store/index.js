import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import root from "../reducer";
import {loggerTest, junk} from "../middleware";

const store = createStore(
    root,
    applyMiddleware(
        thunk,
        loggerTest,
        junk,
    )
);

// todo remove , for testing purposes only
window.store = store;

export default store;