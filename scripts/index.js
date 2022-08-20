let authDetails = null;

const authCookie = getCookie("vradio-auth")
if(authCookie !== "") {
    authDetails = JSON.parse(authCookie)
    // TODO: Confirm token is valid
}

if(authDetails !== null) {
    document.getElementById("account-section").hidden = true
    document.getElementById("account-details").hidden = false

    let display = document.getElementById("account-para")
     display.innerHTML = display.innerHTML + authDetails.username
}