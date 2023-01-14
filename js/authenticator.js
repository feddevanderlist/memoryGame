function hasToken() {
    let token = localStorage.getItem('jwt');
    return token != null;
}

function getToken() {
    return localStorage.getItem('jwt');

}

function getPayload(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function getUsernameFromLocalStorage() {
    let payload = getPayload(getToken());
    return payload.username;
}

function getIDFromLocalStorage() {
    let payload = getPayload(getToken());
    return payload.sub;
}

function setNavbar() {
    let navbar = document.getElementById("navbar");
    if (hasToken() === false) {
        let login = document.createElement("a");
        login.setAttribute("href", "login.html");
        login.appendChild(document.createTextNode("Login"));
        navbar.appendChild(login);
        navbar.appendChild(document.createTextNode(" "));
        let register = document.createElement("a");
        register.setAttribute("href", "register.html");
        register.appendChild(document.createTextNode("Register"));
        navbar.appendChild(register);
        return;
    }

    let profile = document.createElement("a");
    profile.setAttribute("href", "profile.html");
    profile.appendChild(document.createTextNode("Profile"));
    navbar.appendChild(profile);
}

