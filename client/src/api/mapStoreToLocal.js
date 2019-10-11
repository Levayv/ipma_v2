import {emptyToken} from '../redux/reducer/authReducer'

/**
 * Sets token to Local Storage, if undefined deletes existing token
 * @param token string Token
 * */
export function saveTokenToLocalStorage(token) {
    if (token !== undefined) {
        localStorage.setItem("token", token);
    }else{
        localStorage.setItem("token", emptyToken);
    }
}

/**
 * Gets token from Local Storage , or false if there is no token in local storage
 * @return string|boolean Token
 * */
export function loadTokenFromLocalStorage() {

    const token = localStorage.getItem("token");

    if (!validateToken(token)) {
        return false;
    }

    return "Bearer " + token;
}

/**
 * @return {boolean} true if validation criteria are met, false otherwise
 * */
function validateToken(token) {
    // todo research - add more validation logic , if possible

    if (token === emptyToken) return false;
    if (token === "undefined") return false;
    if (token === "null") return false;
    if (token === null) return false;
    if (token === undefined) return false;
    //
    return true;
}