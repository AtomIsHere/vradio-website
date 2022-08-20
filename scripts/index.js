fetch("http://" + apiLocation + "/ping").then((result) => {
    if(result.status !== 200) {
        alert("Something went wrong with the API")
    }
}).catch(() => {
    alert("API is currently down, this site will not function.")
})

const authCookie = getCookie("vradio-auth")
if(authCookie !== "") {
    let authDetails = JSON.parse(authCookie)

    fetch("http://" + apiLocation + "/account/check-auth?username=" + authDetails.username + "&auth-key=" + authDetails.token).then((result) => {
        if(result.status === 200) {
            result.text().then((authed) => {
                if(authed === "true") {
                    displayAccountDetails(authDetails)
                } else {
                    deleteCookie("vradio-auth")
                }
            })
        } else {
            deleteCookie("vradio-auth")
        }
    }).catch(() => {
        deleteCookie("vradio-auth")
    });
}

function displayAccountDetails(authDetails) {
    document.getElementById("account-section").hidden = true
    document.getElementById("account-details").hidden = false

    let display = document.getElementById("account-para")
    display.innerHTML = "Logged in as " + authDetails.username
}