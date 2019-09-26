import axios from 'axios';

import {LOGIN_REQUEST} from '../action-types/actionTypes'
import {LOGIN_FAILURE} from '../action-types/actionTypes'
import {LOGIN_SUCCESS} from '../action-types/actionTypes'
import {LOGIN_REFRESH} from '../action-types/actionTypes'

/**
 * Dispatched before fetching , representing request start
 * @return object redux action
 * */
function loginRequest() {
    const payload = {};
    return {type: LOGIN_REQUEST, payload}
}

/**
 * Dispatched after successful response was handled
 * @param credentials initial credentials which was sent with request
 * @param response successful response
 * @return object redux action
 * */
function loginSuccess(credentials, response) {
    const payload = {credentials, response};
    return {type: LOGIN_SUCCESS, payload}
}

/**
 * Dispatched after failed response was handled
 * @param credentials initial credentials which was sent with request
 * @param error failed response errors
 * @return object redux action
 * */
function loginFailure(credentials, error) {
    const payload = {credentials, error};
    return {type: LOGIN_FAILURE, payload}
}

/**
 * Attempt to login using axios, will dispatch other actions via redux-thunk
 * @param credentials which will be attached to the request
 * @return function redux-thunk action
 * */
export function loginAttempt(credentials) {
    return function (dispatch) {
        dispatch(loginRequest());
        return axios.post(
            "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/auth/login",
            {
                email: credentials.login,
                password: credentials.password,
            }
        ).then(response => dispatch(loginSuccess(credentials, response))
        ).catch(error => dispatch(loginFailure(credentials, error)),
        ).finally(()=>dispatch(loginRefresh())
        );
    };
}

/**
 * Refresh to initial state , use after handling loginAttempt success/
 * @return object redux action
 * */
export function loginRefresh() {
    return {type: LOGIN_REFRESH}
}