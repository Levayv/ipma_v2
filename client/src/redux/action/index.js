import axios from 'axios';

//       _                   _
//      | |                 (_)
//      | |     ___   __ _   _ _ __
//      | |    / _ \ / _` | | | '_ \
//      | |___| (_) | (_| | | | | | |
//      \_____/\___/ \__, | |_|_| |_|
//                    __/ |
//                   |___/

import {LOGIN_SUCCESS} from '../action-types'

function loginSuccess(credentials, response) {
    const payload = {credentials, response};
    return {type: LOGIN_SUCCESS, payload}
}

import {LOGIN_FAILURE} from '../action-types'

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

//       _                               ______               _
//      | |                              | ___ \             | |
//      | |     ___ ___ ___  ___  _ __   | |_/ /___  __ _  __| |
//      | |    / _ / __/ __|/ _ \| '_ \  |    // _ \/ _` |/ _` |
//      | |___|  __\__ \__ | (_) | | | | | |\ |  __| (_| | (_| |
//      \_____/\___|___|___/\___/|_| |_| \_| \_\___|\__,_|\__,_|
//

export function readSingleLessonAttempt(lessonID) {
    return function (dispatch) {
        dispatch(readSingleLessonRequest());
        return axios.get(
            "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/lesson/" + lessonID,
        ).then(response => dispatch(readSingleLessonSuccess(lessonID, response))
        ).catch(error => dispatch(readSingleLessonFailure(lessonID, error)),
        );
    };
}

import {READ_SINGLE_LESSON_REQUEST} from '../action-types'

function readSingleLessonRequest() {
    const payload = {};
    return {type: READ_SINGLE_LESSON_REQUEST, payload}
}

import {READ_SINGLE_LESSON_SUCCESS} from '../action-types'

function readSingleLessonSuccess(lessonID, response) {
    const payload = {lessonID, response};
    return {type: READ_SINGLE_LESSON_SUCCESS, payload}
}

import {READ_SINGLE_LESSON_FAILURE} from '../action-types'

function readSingleLessonFailure(lessonID, error) {
    const payload = {lessonID, error};
    return {type: READ_SINGLE_LESSON_FAILURE, payload}
}

//       _                               ______               _   _           _ _
//      | |                              | ___ \             | | | |         | | |
//      | |     ___ ___ ___  ___  _ __   | |_/ /___  __ _  __| | | |__  _   _| | | __
//      | |    / _ / __/ __|/ _ \| '_ \  |    // _ \/ _` |/ _` | | '_ \| | | | | |/ /
//      | |___|  __\__ \__ | (_) | | | | | |\ |  __| (_| | (_| | | |_) | |_| | |   <
//      \_____/\___|___|___/\___/|_| |_| \_| \_\___|\__,_|\__,_| |_.__/ \__,_|_|_|\_\

export function readBulkLessonAttempt() {
    return function (dispatch) {
        dispatch(readBulkLessonRequest());
        return axios.get(
            "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/lesson",
        ).then(response => dispatch(readBulkLessonSuccess(response))
        ).catch(error => dispatch(readBulkLessonFailure(error)),
        );
    };
}

import {READ_BULK_LESSON_REQUEST} from '../action-types'

function readBulkLessonRequest() {
    const payload = {};
    return {type: READ_BULK_LESSON_REQUEST, payload}
}

import {READ_BULK_LESSON_SUCCESS} from '../action-types'

function readBulkLessonSuccess(response) {
    const payload = {response};
    return {type: READ_BULK_LESSON_SUCCESS, payload}
}

import {READ_BULK_LESSON_FAILURE} from '../action-types'

function readBulkLessonFailure(error) {
    const payload = {error};
    return {type: READ_BULK_LESSON_FAILURE, payload}
}

// todo delete

//       _                                                    _
//      | |                                                  | |
//      | |     ___ ___ ___  ___  _ __     ___ _ __ ___  __ _| |_ ___
//      | |    / _ / __/ __|/ _ \| '_ \   / __| '__/ _ \/ _` | __/ _ \
//      | |___|  __\__ \__ | (_) | | | | | (__| | |  __| (_| | ||  __/
//      \_____/\___|___|___/\___/|_| |_|  \___|_|  \___|\__,_|\__\___|
//
// import {LESSON_CREATE_SUCCESS} from '../action-types'
//
// function lessonCreateSuccess(lesson, response) {
//     const payload = {lesson, response};
//     return {type: LESSON_CREATE_SUCCESS, payload}
// }
//
// import {LESSON_CREATE_FAILURE} from '../action-types'
//
// function lessonCreateFailure(lesson, error) {
//     const payload = {lesson, error};
//     return {type: LESSON_CREATE_FAILURE, payload}
// }
//
// export function lessonCreateAttempt(lesson) {
//     return function (dispatch) {
//         return axios.post(
//             "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/lesson",
//             {
//                 name: lesson.name,
//                 link: lesson.link,
//                 topic_id: lesson.topic,
//             }
//         ).then(response => dispatch(lessonCreateSuccess(lesson, response))
//         ).catch(error => dispatch(lessonCreateFailure(lesson, error)),
//         );
//     };
// }
//
//       _                                _   _           _       _
//      | |                              | | | |         | |     | |
//      | |     ___ ___ ___  ___  _ __   | | | |_ __   __| | __ _| |_ ___
//      | |    / _ / __/ __|/ _ \| '_ \  | | | | '_ \ / _` |/ _` | __/ _ \
//      | |___|  __\__ \__ | (_) | | | | | |_| | |_) | (_| | (_| | ||  __/
//      \_____/\___|___|___/\___/|_| |_|  \___/| .__/ \__,_|\__,_|\__\___|
//                                             | |
//                                             |_|
//
// import {LESSON_UPDATE_SUCCESS} from '../action-types'
//
// function lessonUpdateSuccess(lesson, response) {
//     const payload = {lesson, response};
//     return {type: LESSON_UPDATE_SUCCESS, payload}
// }
//
// import {LESSON_UPDATE_FAILURE} from '../action-types'
//
// function lessonUpdateFailure(lesson, error) {
//     const payload = {lesson, error};
//     return {type: LESSON_UPDATE_FAILURE, payload}
// }
//
// export function lessonUpdateAttempt(lesson) {
//     return function (dispatch) {
//         return axios.post(
//             "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/lesson/"+lesson.id,
//             {
//                 id: lesson.id,
//                 name: lesson.name,
//                 link: lesson.link,
//                 topic_id: lesson.topic,
//             }
//         ).then(response => dispatch(lessonCreateSuccess(lesson, response))
//         ).catch(error => dispatch(lessonCreateFailure(lesson, error)),
//         );
//     };
// }