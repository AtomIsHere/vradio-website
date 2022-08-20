fetch("http://" + apiLocation + "/ping").then((result) => {
    if(result.status !== 200) {
        alert("Something went wrong with the API")
    }
}).catch(() => {
    alert("API is currently down, this site will not function.")
})

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
     display.innerHTML = "Logged in as " + authDetails.username
}