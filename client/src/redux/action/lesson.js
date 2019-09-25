import axios from 'axios';

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

import {READ_SINGLE_LESSON_REQUEST} from '../action-types/actionTypes'

function readSingleLessonRequest() {
    const payload = {};
    return {type: READ_SINGLE_LESSON_REQUEST, payload}
}

import {READ_SINGLE_LESSON_SUCCESS} from '../action-types/actionTypes'

function readSingleLessonSuccess(lessonID, response) {
    const payload = {lessonID, response};
    return {type: READ_SINGLE_LESSON_SUCCESS, payload}
}

import {READ_SINGLE_LESSON_FAILURE} from '../action-types/actionTypes'

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

import {READ_BULK_LESSON_REQUEST} from '../action-types/actionTypes'

function readBulkLessonRequest() {
    const payload = {};
    return {type: READ_BULK_LESSON_REQUEST, payload}
}

import {READ_BULK_LESSON_SUCCESS} from '../action-types/actionTypes'

function readBulkLessonSuccess(response) {
    const payload = {response};
    return {type: READ_BULK_LESSON_SUCCESS, payload}
}

import {READ_BULK_LESSON_FAILURE} from '../action-types/actionTypes'

function readBulkLessonFailure(error) {
    const payload = {error};
    return {type: READ_BULK_LESSON_FAILURE, payload}
}