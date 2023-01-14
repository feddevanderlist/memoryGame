function loginCheck() {
    const formData = new FormData(document.getElementById("login"));

    let name = formData.get("name"); // get the value of the <input name="email">
    let password = formData.get("password"); // get the value of the <input name="password">

    let user = {  // create the JSON object which will sent as the data in the body
        username: name,
        password: password
    }
    console.log(user);
    fetch("http://localhost:8000/api/login_check", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
        .then(resp => resp.json())
        .then(json => {
            localStorage.setItem('jwt', json.token);
            window.location.href = "../index.html";
        }).catch(
        error => {
            console.log(error);
        }
    )
}