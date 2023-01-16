function loginCheck(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById("login"));

    let name = formData.get("name"); // get the value of the <input name="email">
    let password = formData.get("password"); // get the value of the <input name="password">

    let user = {  // create the JSON object which will sent as the data in the body
        username: name,
        password: password
    }

    fetch("http://localhost:8000/api/login_check", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(resp => resp.json())
        .then(json => {
            localStorage.setItem('jwt', json.token);
            let url = window.location.href;
            window.location.href = url.substring(0, url.lastIndexOf('/') + 1);
        }).catch(
        error => {
            console.log(error);
        }
    );
}