import axios from 'axios';

import {LOGIN_SUCCESS} from '../action-types/actionTypes'

function loginSuccess(credentials, response) {
    const payload = {credentials, response};
    return {type: LOGIN_SUCCESS, payload}
}

import {LOGIN_FAILURE} from '../action-types/actionTypes'

function loginFailure(credentials, error) {
    const payload = {credentials, error};
    return {type: LOGIN_FAILURE, payload}
}

export function loginAttempt(credentials) {
    return function (dispatch) {
        return axios.post(
            "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/auth/login",
            {
                email: credentials.login,
                password: credentials.password,
            }
        ).then(response => dispatch(loginSuccess(credentials, response))
        ).catch(error => dispatch(loginFailure(credentials, error)),
        );
    };
}