import axios from 'axios';
// import store from '../redux/store'

export default function initAxios() {

    initAxiosConfiguration();
    initAxiosInterceptors();

}

function initAxiosConfiguration() {

}

function initAxiosInterceptors() {
    axios.interceptors.request.use(function (request) { // .ts >> AxiosRequestConfig: request

        // console.log("✉️ intercepted request")
        // console.log("request = ...")
        // console.log(request);

        request.headers['Authorization'] = localStorage.getItem("token");

        return request;
    });

    axios.interceptors.response.use(function (response) { // .ts >> AxiosResponse: response

        // console.log("✉️ intercepted response")
        // console.log("response = ...")
        // console.log(response);

        localStorage.setItem("token", response.headers['Authorization']);

        return response;
    });
}
