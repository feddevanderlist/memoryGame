window.onload = function () {
    if (hasToken() === false) {
        let url = window.location.href;
        window.location.href = url.substring(0, url.lastIndexOf('/') + 1);
    } else {
        setPageInfo()
    }

}

function setCharacterInDocument(preferred_api) {
    let optionFields = document.querySelector("#character");
    optionFields.value = preferred_api;
}

function setUsername(username) {
    document.getElementById("username").appendChild(document.createTextNode("Welcome " + username));
}

function setPreferredColours(json) {
    if (json.color_found !== "") {
        document.getElementById("preferred_color_found").value = json.color_found;
    }
    if (json.color_closed !== "") {
        document.getElementById("preferred_color_closed").value = json.color_closed;
    }
}


function setEmail(email) {
    document.getElementById("email").value = email;
}

function setPageInfo() {

    fetch("http://localhost:8000/api/player/" + getIDFromLocalStorage(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    })
        .then(resp => {
                if (resp.ok) {
                    resp.json().then(json => {
                        setUsername(json.name);
                        setEmail(json.email);
                    }).catch(
                        error => {
                            console.log(error);
                            window.location.href = "./login.html";
                        })
                } else {
                    removeToken();
                    window.location.href = "./login.html";
                }
            }
        )

    fetch("http://localhost:8000/api/player/" + getIDFromLocalStorage() + "/preferences", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    })
        .then(resp => resp.json())
        .then(json => {
            setCharacterInDocument(json.preferred_api);
            setPreferredColours(json);
        }).catch(
        error => {
            console.log(error);
            window.location.href = "./login.html";
        }
    )
}

function updateEmail(email) {
    let updateEmailPref = confirm("Did you want to update your email for your profile?");
    if (updateEmailPref) {
        updateEmailAPi(email);
    }

}

function updateEmailAPi(email) {
    let body = {  // create the JSON object which will sent as the data in the body
        email: email,

    }
    fetch("http://localhost:8000/api/player/" + getIDFromLocalStorage() + "/email", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(body)
    })
        .then(resp => {
            if (resp.ok) {
                setEmail(email);
            }
            if (resp.code === 401) {
                removeToken();
                window.location.href = "./login.html";
            } else {
                throw new Error("something went wrong");
            }
        })
        .catch(
            error => {
                console.log(error);
                window.location.href = "./profile.html";
            }
        )
}

function updatePreferences() {
    let optionFields = document.querySelector("#character");

    let body = {
        color_found: document.getElementById("preferred_color_found").value,
        color_closed: document.getElementById("preferred_color_closed").value,
        api: optionFields.value
    }

    updatePreferencesAPi(body);
}

function updatePreferencesAPi(body) {
    fetch("http://localhost:8000/api/player/" + getIDFromLocalStorage() + "/preferences", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(body)
    })
        .then(resp => {
            if (resp.status === 401) {
                removeToken();
                window.location.href = "./login.html";
            }
            if (!resp.ok) {
                throw new Error("Something went wrong when updating ");
            }
        }).catch(
        error => {
            console.log(error);
            window.location.href = "./login.html";
        }
    )
}

