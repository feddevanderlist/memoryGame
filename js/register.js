// function to handle success
function success() {
    console.log("succes");
    let data = this.response; //parse the string to JSON
    console.log(data);
    window.location.href = "../index.html";
    return data;
}

// function to handle error
function error(err) {
    console.log('Request Failed', err); //error details will be in the "err" object
    window.location = "index.html";
    return err;
}

function createUser(name, email, password) {
    console.log("trying to login");

    let xhr = new XMLHttpRequest();
    let data = JSON.stringify({
        username: name,
        email: email,
        password: password

    });
    xhr.onload = success();
    xhr.onerror = error();
    xhr.open('POST', "http://localhost:8000/register");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);

}

function formValidation() {

    let name = document.register_player.name;
    let email = document.register_player.email;
    let password = document.register_player.password;

    if (name.value === "") {
        name.nextElementSibling.style.display = "block";
        name.style.border = "1px solid #f00";
        return false;
    } else {
        name.nextElementSibling.style.display = "none";
        name.style.border = "1px solid transparent";
    }

    if (!email.value.match(/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/) || email.value === "") {
        email.nextElementSibling.style.display = "block";
        email.style.border = "1px solid #f00";
        return false;
    } else {
        email.nextElementSibling.style.display = "none";
        email.style.border = "1px solid transparent";
    }


    if (password.value === "" || !password.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/)) {
        password.nextElementSibling.style.display = "block";
        password.style.border = "1px solid #f00";
        return false;
    } else {
        password.nextElementSibling.style.display = "none";
        password.style.border = "1px solid transparent";
    }

    createUser(name.value, email.value, password.value);

}