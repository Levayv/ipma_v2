import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import {rootReducer} from "../reducer/rootReducer";
import {
    logger,
} from "../middleware/Logger";
// todo STOPSHIP remove logger, for testing purposes only

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk,
        logger,
    )
);

// todo STOPSHIP remove windows.store, for testing purposes only
window.store = store;

export default store;