import { createStore } from "redux";
import root from "../reducer";
const store = createStore(root);

// todo remove , for testing purposes only
window.store = store;

export default store;