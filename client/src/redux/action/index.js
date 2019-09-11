import axios from 'axios';

///////////////////////////////////////////////////////////////////////////

import {LOGIN_SUCCESS} from '../action-types'

export function loginSuccess(credentials, response) {
    const payload = {credentials, response};
    return {type: LOGIN_SUCCESS, payload}
}

///////////////////////////////////////////////////////////////////////////

import {LOGIN_FAIL} from '../action-types'

export function loginFail(credentials, error) {
    const payload = {credentials, error};
    return {type: LOGIN_FAIL, payload}
}

///////////////////////////////////////////////////////////////////////////
// import {LOGIN_ATTEMPT} from "../action-types"

export function loginAttempt(credentials) {
    // return {type: LOGIN_ATTEMPT, payload}
    return function (dispatch) {
        return axios.post(
            "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/auth/login",
            {
                email: credentials.login,
                password: credentials.password,
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(response => dispatch(loginSuccess(credentials, response))
        ).catch(error => dispatch(loginFail(credentials, error)),
        );
    };
}

///////////////////////////////////////////////////////////////////////////
