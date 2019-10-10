import axios from 'axios';
import {saveTokenToLocalStorage} from "./mapStoreToLocal";
import {loadTokenFromLocalStorage} from "./mapStoreToLocal";

export default function initAxios() {

    initAxiosConfiguration();
    initAxiosInterceptors();

}

function initAxiosConfiguration() {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
}

function initAxiosInterceptors() {
    axios.interceptors.request.use(function (request) { // .ts >> AxiosRequestConfig: request

        request.headers['Authorization'] = loadTokenFromLocalStorage();

        return request;
    });

    axios.interceptors.response.use(function (response) { // .ts >> AxiosResponse: response

        saveTokenToLocalStorage(response.headers['Authorization']);

        return response;
    });
}
