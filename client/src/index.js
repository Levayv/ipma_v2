import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import store from "./redux/store/store";
import AppRouter from "./route/AppRouter";

ReactDOM.render(
    <Provider store={store}>
        <AppRouter/>
    </Provider>,
    document.getElementById('root')
);

//
// import axios from 'axios';
// function AppRouter() {
//     axios.post(
//         "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/auth/login",
//         {
//             email: "levayv@mail.ru",
//             password: "1234526789",
//         }
//     ).then(responseData => {
//             console.log("axios success");
//             console.log(responseData)
//         }
//     ).catch(error => {
//             console.log("axios failed");
//             console.log(typeof error);
//             console.log(error.response.data);
//         },
//     ).finally(() => {
//             console.log("finally")
//         }
//     );
//     return (<div> asdgfasddghfgahklsd </div>)
// }