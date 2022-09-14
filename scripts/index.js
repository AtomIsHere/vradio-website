// Check if REST api is able to be connected to
fetch("http://" + apiLocation + "/ping").then((result) => {
    if(result.status !== 200) {
        alert("Something went wrong with the API")
    }
}).catch(() => {
    alert("API is currently down, this site will not function.")
})

// Place holder variable for auth token
let authDetails = null

// Listen to when user clicks the logout button
document.getElementById("logout-button").addEventListener('click', function () {
    // Check if user is logged in
    if(authDetails !== null) {
        // Send logout request ot REST api
        fetch("http://" + apiLocation + "/account/logout?username=" + authDetails.accountName + "&auth-key=" + authDetails.id).then(() => {
            // Delete auth token cookie
            deleteCookie()
            // Reload website
            location.reload()
        })
    }
})

// Get auth cookie
const authCookie = getCookie("vradio-auth")
// Check if cookie exists
if(authCookie !== "") {
    // Parse cookie as json
    authDetails = JSON.parse(authCookie)

    // Send auth request to REST api
    fetch("http://" + apiLocation + "/account/check-auth?username=" + authDetails.accountName + "&auth-key=" + authDetails.id).then((result) => {
        if(result.status === 200) {
            // Check if token is valid if not delete the token
            result.text().then((authed) => {
                if(authed === "true") {
                    // If token is valid display account details
                    displayAccountDetails(authDetails)
                } else {
                    deleteAuthCookie()
                }
            })
        } else {
            deleteAuthCookie()
        }
    }).catch(() => {
        deleteAuthCookie()
    });
}

// Delete the auth token
function deleteAuthCookie() {
    deleteCookie("vradio-auth")
    authDetails = null;
}

// Function to display account details from auth token
function displayAccountDetails(authDetails) {
    // Hide login section and display the account section
    document.getElementById("account-section").hidden = true
    document.getElementById("account-details").hidden = false

    // Set account paragraph to contain the logged in user
    let display = document.getElementById("account-para")
    display.innerHTML = "Logged in as " + authDetails.accountName
}