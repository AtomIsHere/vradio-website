fetch("http://" + apiLocation + "/ping").then((result) => {
    if(result.status !== 200) {
        alert("Something went wrong with the API")
    }
}).catch(() => {
    alert("API is currently down, this site will not function.")
})

let authDetails = null

document.getElementById("logout-button").addEventListener('click', function () {
    if(authDetails !== null) {
        fetch("http://" + apiLocation + "/account/logout?username=" + authDetails.username + "&auth-key=" + authDetails.token).then(() => {
            deleteCookie()
            location.reload()
        })
    }
})

const authCookie = getCookie("vradio-auth")
if(authCookie !== "") {
    authDetails = JSON.parse(authCookie)

    fetch("http://" + apiLocation + "/account/check-auth?username=" + authDetails.username + "&auth-key=" + authDetails.token).then((result) => {
        if(result.status === 200) {
            result.text().then((authed) => {
                if(authed === "true") {
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

function deleteAuthCookie() {
    deleteCookie("vradio-auth")
    authDetails = null;
}

function displayAccountDetails(authDetails) {
    document.getElementById("account-section").hidden = true
    document.getElementById("account-details").hidden = false

    let display = document.getElementById("account-para")
    display.innerHTML = "Logged in as " + authDetails.username
}