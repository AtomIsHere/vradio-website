const usernameField = document.getElementById("username-field")
const emailField = document.getElementById("email-field")

const passwordField = document.getElementById("password-field")
const confirmPasswordField = document.getElementById("confirm-password-field")

// Listen to when user clicks the signup button
document.getElementById("submit-button").addEventListener("click", async function () {
    // Store what user entered
    let password = passwordField.value
    let confirmedPassword = confirmPasswordField.value

    // Check if password and confirmation match
    if(password !== confirmedPassword) {
        alert("Passwords do not match!")
        return
    }

    // Store what user entered
    let username = usernameField.value
    let email = emailField.value

    // Register account with the REST api
    let response = await fetch("http://" + apiLocation + "/account/create-account?username=" + username + "&email=" + email + "&password=" + password)
    // Get the status of the response
    let status = response.status

    // Check if status is Ok (Status code 200)
    if(status !== 200) {
        alert("Something went wrong with the server")
        return
    }

    // Get result from REST api call
    response.text().then((result) => {
        // If success go back main page
        if(result === "\"SUCCESS\"") {
            window.location.href = "index.html"
        } else {
            alert("Account already exists")
        }
    })
})