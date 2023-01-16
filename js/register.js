function createUser(name, email, password) {
    let data = JSON.stringify({
        username: name,
        email: email,
        password: password
    });
    fetch("http://localhost:8000/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
        },
        body: data
    }).then(resp => {
            if (resp.ok) {
                window.location.href = "./login.html";
            } else {
                throw new Error('Http error' + resp.statusText)
            }
        }
    ).catch(
        error => {
            console.log(error);
        });
}

function registerCheck(event) {
    event.preventDefault();
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