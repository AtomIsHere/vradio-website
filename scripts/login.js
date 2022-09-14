const usernameField = document.getElementById("username-field");
const passwordField = document.getElementById("password-field");

const submitButton = document.getElementById("submit-button");

// Listen to when user clicks the login button
submitButton.addEventListener('click', async function () {
    // Store what user entered
    let username = usernameField.value
    let password = passwordField.value

    // Send login request to the REST api
    let response = await fetch('http://' + apiLocation + '/account/login?username=' + username + "&password=" + password);
    // Get status of REST api call
    let status = response.status

    // print status to console
    console.log(status)

    // Check if status is a failure
    if(status === 403 || status === 404) {
        alert("Invalid account details!")
    } else if(status === 200) {
        // Get response as json
        response.json().then((token) => {
            // Store auth token as cookie
            setCookie("vradio-auth", JSON.stringify(token), 7)
            // Go back to main page
            window.location.href = "index.html"
        })
    } else {
        alert("Something went wrong!")
    }
});