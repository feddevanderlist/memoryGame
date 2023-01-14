window.onload = function () {
    if (!hasToken()) {
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
    document.getElementById("username").text = "Welcome " + username
}

function setPreferredColours(json) {
    if (json.preferred_color_found !== "") {
        document.getElementById("preferred_color_found").value = json.preferred_color_found;
    }
    if (json.preferred_color_closed !== "") {
        document.getElementById("preferred_color_closed").value = json.preferred_color_closed;
    }
}


function setEmail(email) {
    document.getElementById("email").value = json.email;
}

function setPageInfo() {

    fetch("http://localhost:8000/api/player/" + getIDFromLocalStorage(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + getToken()
        }
    })
        .then(resp => resp.json())
        .then(json => {
            console.log(json);
            setUsername(json.username);
            setCharacterInDocument(json.preferred_api);
            setPreferredColours(json);
            setEmail(json.emails);
        }).catch(
        error => {
            console.log(error);
            window.location.href = "../login.html";
        }
    )
}

function updatePlayerCardPreference(characterName) {
    let updateCardPref = confirm("Did you want to update preferred character profile?");
    if (updateCardPref) {
        updatePreferencesAPi("preferred_api", characterName);
    }
}

function updateColourPreference(colourField) {
    let updateColourPref = confirm("Did you want to update your preferred " + colourField.label.text + " profile?");
    if (updateColourPref) {
        updatePreferencesAPi(colourField.id, colourField.value)
    }
}

function updateEmail(email) {
    let updateEmailPref = confirm("Did you want to update your email for your profile?");
    if (updateEmailPref) {
        updatePreferencesAPi("email", email);
    }

}

function updatePreferencesAPi(fieldName, FieldValue) {
    let body = {  // create the JSON object which will sent as the data in the body
        fieldName: FieldValue,

    }
    fetch("http://localhost:8000/api/player/" + getIDFromLocalStorage(), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(json => {
            console.log(json);
            window.location.href = "../profile.html";
        }).catch(
        error => {
            console.log(error);
            window.location.href = "../login.html";
        }
    )
}

