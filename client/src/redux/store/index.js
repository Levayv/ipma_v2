import { createStore } from "redux";
import rootReducer from "../reducer/rootReducer";
const store = createStore(rootReducer);

// todo remove , for testing purposes only
window.store = store;

export default store;