// Function to add a value to a cookie
function setCookie(name, value, days) {
    // Get current date
    const d = new Date();
    // Add days from function
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    // Define when cookie expires
    let expires = "expires=" + d.toUTCString();

    // Set the cookie with default cookie structure
    document.cookie = name + "=" + value + ";" + expires + ";path=/"
}

// Function to get a cookie from name
function getCookie(name) {
    // Get name from cookie
    let intName = name + "="
    // Split cookie at semicolon
    let ca = document.cookie.split(";");

    // Loop through all strings after split
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];

        // add character until last string is reached
        while(c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        // Get value of last character
        if(c.indexOf(intName) == 0) {
            // Return cookie data
            return c.substring(intName.length, c.length)
        }
    }

    // If cookie is not found return empty string
    return ""
}

// Delete cookie
function deleteCookie(name) {
    // Expire cookie
    document.cookie = name + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}