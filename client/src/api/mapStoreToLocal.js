// temporary solution
export function saveTokenToLocalStorage(token) {
    localStorage.setItem("token", token);
}
export function loadTokenFromLocalStorage() {
    return localStorage.getItem("token");
}

