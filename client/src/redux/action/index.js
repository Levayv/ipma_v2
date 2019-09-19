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

export function loginAttempt(credentials) {
    return function (dispatch) {
        return axios.post(
            "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/auth/login",
            {
                email: credentials.login,
                password: credentials.password,
            }
        ).then(response => dispatch(loginSuccess(credentials, response))
        ).catch(error => dispatch(loginFail(credentials, error)),
        );
    };
}

///////////////////////////////////////////////////////////////////////////

//

//

///////////////////////////////////////////////////////////////////////////
import {LESSON_CREATE_SUCCESS} from '../action-types'

export function lessonCreateSuccess(lesson, response) {
    const payload = {lesson, response};
    return {type: LESSON_CREATE_SUCCESS, payload}
}

///////////////////////////////////////////////////////////////////////////

import {LESSON_CREATE_FAIL} from '../action-types'

export function lessonCreateFail(lesson, error) {
    const payload = {lesson, error};
    return {type: LESSON_CREATE_FAIL, payload}
}

///////////////////////////////////////////////////////////////////////////

export function lessonCreateAttempt(lesson) {
    return function (dispatch) {
        return axios.post(
            "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/lesson",
            {
                name: lesson.name,
                link: lesson.link,
                topic_id: lesson.topic,
            }
        ).then(response => dispatch(lessonCreateSuccess(lesson, response))
        ).catch(error => dispatch(lessonCreateFail(lesson, error)),
        );
    };
}

///////////////////////////////////////////////////////////////////////////
