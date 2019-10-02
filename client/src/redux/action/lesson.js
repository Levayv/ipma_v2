import axios from 'axios';

import {READ_SINGLE_LESSON_REQUEST} from '../action-types/actionTypes'
import {READ_SINGLE_LESSON_FAILURE} from '../action-types/actionTypes'
import {READ_SINGLE_LESSON_SUCCESS} from '../action-types/actionTypes'
import {READ_BULK_LESSON_REQUEST} from '../action-types/actionTypes'
import {READ_BULK_LESSON_SUCCESS} from '../action-types/actionTypes'
import {READ_BULK_LESSON_FAILURE} from '../action-types/actionTypes'

/**
 * Attempt to get single lesson by id, using axios. Will dispatch other actions via redux-thunk
 * @param lessonID {int} Lesson's identifier
 * @return function redux-thunk action
 * @see readSingleLessonRequest
 * @see readSingleLessonSuccess
 * @see readSingleLessonFailure
 * */
export function readSingleLessonAttempt(lessonID) {
    return function (dispatch) {
        dispatch(readSingleLessonRequest());
        return axios.get(
            "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/lesson/" + lessonID,
        ).then(response => {
                if (response && response.data){
                    return dispatch(readSingleLessonSuccess(lessonID, response));
                }
            }
        ).catch(error => dispatch(readSingleLessonFailure(lessonID, error)),
        );
    };
}

/**
 * Dispatched before fetching , representing request start
 * @return object redux action
 * @see readSingleLessonAttempt
 * */
function readSingleLessonRequest() {
    const payload = {};
    return {type: READ_SINGLE_LESSON_REQUEST, payload}
}

/**
 * Dispatched after successful response
 * @param lessonID Lesson's identifier initially sent with request
 * @param response successful response
 * @return object redux action
 * @see readSingleLessonAttempt
 * */
function readSingleLessonSuccess(lessonID, response) {
    const payload = {lessonID, response};
    return {type: READ_SINGLE_LESSON_SUCCESS, payload}
}

/**
 * Dispatched after failed response
 * @param lessonID Lesson's identifier initially sent with request
 * @param error failed response errors
 * @return object redux action
 * @see readSingleLessonAttempt
 * */
function readSingleLessonFailure(lessonID, error) {
    const payload = {lessonID, error};
    return {type: READ_SINGLE_LESSON_FAILURE, payload}
}

// --- // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- // --- //

/**
 * Attempt to get lesson's list using axios, will dispatch other actions via redux-thunk
 * @return function redux-thunk action
 * @see readBulkLessonRequest
 * @see readBulkLessonSuccess
 * @see readBulkLessonFailure
 * */
export function readBulkLessonAttempt() {
    return function (dispatch) {
        dispatch(readBulkLessonRequest());
        return axios.get(
            "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/lesson",
        ).then(response => {
                if (response && response.data){
                    return dispatch(readBulkLessonSuccess(response));
                }
            }
        ).catch(error => dispatch(readBulkLessonFailure(error)),
        );
    };
}

/**
 * Dispatched before fetching , representing request start
 * @return object redux action
 * @see readBulkLessonAttempt
 * */
function readBulkLessonRequest() {
    const payload = {};
    return {type: READ_BULK_LESSON_REQUEST, payload}
}

/**
 * Dispatched after successful response
 * @param response successful response
 * @return object redux action
 * @see readBulkLessonAttempt
 * */
function readBulkLessonSuccess(response) {
    const payload = {response};
    return {type: READ_BULK_LESSON_SUCCESS, payload}
}

/**
 * Dispatched after failed response
 * @param error failed response errors
 * @return object redux action
 * @see readBulkLessonAttempt
 * */
function readBulkLessonFailure(error) {
    const payload = {error};
    return {type: READ_BULK_LESSON_FAILURE, payload}
}