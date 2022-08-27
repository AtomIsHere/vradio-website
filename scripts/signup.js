const usernameField = document.getElementById("username-field")
const emailField = document.getElementById("email-field")

const passwordField = document.getElementById("password-field")
const confirmPasswordField = document.getElementById("confirm-password-field")

document.getElementById("submit-button").addEventListener("click", async function () {
    let password = passwordField.value
    let confirmedPassword = confirmPasswordField.value

    if(password !== confirmedPassword) {
        alert("Passwords do not match!")
        return
    }

    let username = usernameField.value
    let email = emailField.value

    let response = await fetch("http://" + apiLocation + "/account/create-account?username=" + username + "&email=" + email + "&password=" + password)
    let status = response.status

    if(status !== 200) {
        alert("Something went wrong with the server")
        return
    }

    response.text().then((result) => {
        if(result === "\"SUCCESS\"") {
            window.location.href = "index.html"
        } else {
            alert("Account already exists")
        }
    })

    console.log("a")
})