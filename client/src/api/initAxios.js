import axios from 'axios';
import Swal from 'sweetalert2'

import {saveTokenToLocalStorage} from './mapStoreToLocal';
import {loadTokenFromLocalStorage} from './mapStoreToLocal';
import history from '../route/history';

export default function initAxios() {

    initAxiosConfiguration();
    initAxiosInterceptors();

}

function initAxiosConfiguration() {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
}

function initAxiosInterceptors() {
    axios.interceptors.request.use(
        function (request) { // .ts >> AxiosRequestConfig: request
            const token = loadTokenFromLocalStorage();
            if (token) {
                request.headers.authorization = token;
            }

            // todo STOPSHIP remove logger
            console.log('[Log] Axios Request is ', request);

            return request;
        }
    );

    axios.interceptors.response.use(
        response => { // .ts >> AxiosResponse: response

            saveTokenToLocalStorage(response.headers.authorization);

            // todo STOPSHIP remove logger
            console.log('[Log] Axios Response is ', response);

            return response;
        },
        error => {

            console.log('[Log] Axios Response errors are ', error);

            if (error.response === undefined) {
                Swal.fire({
                    type: 'error',
                    title: "Error - Network error occurred",
                    text: "* check network connection , wifi / ethernet "
                        + "* check server availability inside same network",
                    confirmButtonText: "Back to Home Page",
                }).then(result => {
                        if (result.value) {
                            history.push("/home/");
                        }
                    }
                );
                redirectWithPurge('/home')
            } else {
                if (error.response.status !== undefined) {
                    switch (error.response.status) {
                        case 401:
                            Swal.fire({
                                type: 'error',
                                title: "Error 401 - Un-Authorized",
                                text: error.response.data.message,
                                // text: "You must be logged in to complete this action",
                                confirmButtonText: "Back to Log-in",
                            }).then(result => {
                                    if (result.value) {
                                        redirectWithPurge("/auth/login/");
                                    }
                                }
                            );
                            redirectWithPurge('/auth/login');
                            break;
                        case 403:
                            Swal.fire({
                                type: 'error',
                                title: "Error 403 - Forbidden",
                                text: error.response.data.message,
                                showConfirmButton: true,
                                showCancelButton: true,
                                // confirmButtonColor: Color.BLUE,
                                // cancelButtonColor: Color.GREY,
                                confirmButtonText: "Back to Log-in",
                                cancelButtonText: "Back to Dashboard",
                            }).then(result => {
                                    if (result.value) {
                                        redirectWithPurge("/auth/login/");
                                    } else if (
                                        result.dismiss === Swal.DismissReason.cancel
                                    ) {
                                        redirectWithPurge("/dashboard/")
                                    }
                                }
                            );
                            redirectOnly('/dashboard', error.response.headers.authorization);
                            break;
                        case 500:
                            Swal.fire({
                                type: 'error',
                                title: "Error 500 - Internal Server Error",
                                // todo format using html/jsx
                                text: "* Please contact system administrator "
                                    + "* Don't call him at 04:00 AM and tell him about this error"
                                    + "* Technical Details : "
                                    + error.response.data.message,
                                showConfirmButton: true,
                                // confirmButtonColor: Color.BLUE,
                                cancelButtonText: "Back to Home Page",
                            }).then(result => {
                                    if (result.value) {
                                        redirectWithPurge("/home/");
                                    }
                                }
                            );
                            break;
                        default:
                            break;
                    }
                } else {
                    // todo Research use cases
                    console.log("Error XXX - Response with no status");
                    redirectWithPurge("/home");
                }
            }
            return Promise.reject(error);
        }
    );

}


/**
 * Redirect and invalidate Token
 * @param pathname {string} Redirection path
 * */
function redirectWithPurge(pathname , alertText) {
    saveTokenToLocalStorage(undefined);
    history.push(pathname , {alertText:alertText});
}

function redirectOnly(pathname, token) {
    saveTokenToLocalStorage(token);
    history.push(pathname);
}