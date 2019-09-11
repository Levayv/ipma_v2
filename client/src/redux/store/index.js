import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import root from "../reducer";

const store = createStore(root, applyMiddleware(thunk));

// todo remove , for testing purposes only
window.store = store;

export default store;