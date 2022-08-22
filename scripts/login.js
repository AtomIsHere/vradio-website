const usernameField = document.getElementById("username-field");
const passwordField = document.getElementById("password-field");

const submitButton = document.getElementById("submit-button");

submitButton.addEventListener('click', async function () {
    let username = usernameField.value
    let password = passwordField.value

    let response = await fetch('http://' + apiLocation + '/account/login?username=' + username + "&password=" + password);
    let status = response.status

    console.log(status)

    if(status === 403 || status === 404) {
        alert("Invalid account details!")
    } else if(status === 200) {
        response.text().then((token) => {
            let authDetails = new AuthenticationDetails(username, token)

            setCookie("vradio-auth", JSON.stringify(authDetails), 7)
            window.location.href = "index.html"
        })
    } else {
        alert("Something went wrong!")
    }
});