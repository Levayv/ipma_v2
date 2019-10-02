import axios from 'axios';

import {LOGIN_REQUEST} from '../action-types/actionTypes'
import {LOGIN_SUCCESS} from '../action-types/actionTypes'
import {LOGIN_FAILURE} from '../action-types/actionTypes'
import {LOGIN_ERROR} from '../action-types/actionTypes'
import {LOGIN_REFRESH} from '../action-types/actionTypes'

/**
 * Attempt to login, using axios. Will dispatch other actions via redux-thunk
 * @param credentials which will be attached to the request
 * @return function redux-thunk action
 * @see loginRequest
 * @see loginSuccess
 * @see loginFailure
 * @see loginError
 * @see loginRefresh
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
        ).then(response => {
                if (response && response.data) {
                    if (response.data.isLoginSuccessful === true) {
                        return dispatch(loginSuccess(credentials, response))
                    } else {
                        return dispatch(loginFailure(credentials, response));
                    }
                } else {
                    // will be handled before this step , by axios interceptors
                }
            }
        ).catch(error => {
                return dispatch(
                    loginError(credentials, error)
                );
            },
        ).finally(() => dispatch(loginRefresh())
        );
    };
}

/**
 * Dispatched before fetching , representing request start
 * @return object redux action
 * @see loginAttempt
 * */
function loginRequest() {
    const payload = {};
    return {type: LOGIN_REQUEST, payload}
}

/**
 * Dispatched after **successful** Response and **successful** Login
 * status = 200 & response.data.loginSuccess = true
 * @param credentials initial credentials which was sent with request
 * @param response
 * @return object redux action
 * @see loginAttempt
 * */
function loginSuccess(credentials, response) {
    const payload = {credentials, response};
    return {type: LOGIN_SUCCESS, payload}
}

/**
 * Dispatched after **successful** response and **failed** login
 * status = 200 & response.data.loginSuccess = false
 * @param credentials initial credentials which was sent with request
 * @param response
 * @return object redux action
 * @see loginAttempt
 * */
function loginFailure(credentials, response) {
    const payload = {credentials, response};
    return {type: LOGIN_FAILURE, payload}
}

/**
 * Dispatched after response with errors
 * @param credentials initial credentials which was sent with request
 * @param error
 * @return object redux action
 * @see loginAttempt
 * */
function loginError(credentials, error) {
    const payload = {credentials, error};
    return {type: LOGIN_ERROR, payload}
}

/**
 * Refresh redux store to initial state , use after handling loginAttempt success/
 * @return object redux action
 * @see loginAttempt
 * */
export function loginRefresh() {
    return {type: LOGIN_REFRESH}
}