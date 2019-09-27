import axios from 'axios';
import {saveTokenToLocalStorage} from "./mapStoreToLocal";
import {loadTokenFromLocalStorage} from "./mapStoreToLocal";

export default function initAxios() {

    initAxiosConfiguration();
    initAxiosInterceptors();

}

function initAxiosConfiguration() {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
}

function initAxiosInterceptors() {
    axios.interceptors.request.use(function (request) { // .ts >> AxiosRequestConfig: request
        const token = loadTokenFromLocalStorage();
        if (token) {
            request.headers.authorization = token;
        }

        console.log('[Log] Axios Request is ', request);

        return request;
    });

    axios.interceptors.response.use(function (response) { // .ts >> AxiosResponse: response

        saveTokenToLocalStorage(response.headers.authorization);

        console.log('[Log] Axios Request is ', response);

        return response;
    });
}
