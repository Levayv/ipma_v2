import axios from 'axios';
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
                //todo add popup
                console.log("Network error occurred");
                console.log(" * check network connection , wifi / ethernet ");
                console.log(" * check server availability inside same network");
                redirectWithPurge('/home')
            } else {
                if (error.response.status !== undefined) {
                    switch (error.response.status) {
                        case 401:
                            //todo add popup
                            redirectWithPurge('/auth/login');
                            break;
                        case 403:
                            break;
                        case 500:
                            //todo add popup
                            console.log("Internal server error occurred");
                            console.log(" * Please contact system administrator ");
                            console.log(" * Don't call him at 04:00 AM and tell him about this error");
                            console.log(" * Technical Details : " + error.response.data.message);
                            redirectWithPurge("/home");
                            break;
                        default:
                            break;
                    }
                }else{
                    // todo Research use cases
                    console.log("Error XXX - Response with no status");
                    redirectWithPurge("/home");
                }
            }
            return error;
        }
    );

}

/**
 * Redirect and invalidate Token
 * @param pathname {string} Redirection path
 * */
function redirectWithPurge(pathname) {
    saveTokenToLocalStorage(undefined);
    //todo add popup
    console.log('[Log] Redirecting to ', pathname);
    history.push(pathname);
}