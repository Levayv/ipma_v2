import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import store from "./redux/store";
import AppRouter from "./route";

ReactDOM.render(
    <Provider store={store}>
        <AppRouter/>
    </Provider>,
    document.getElementById('root')
);
