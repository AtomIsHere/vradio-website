function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();

    document.cookie = name + "=" + value + ";" + expires + ";path=/"
}

function getCookie(name) {
    let intName = name + "="
    let ca = document.cookie.split(";");

    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while(c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if(c.indexOf(intName) == 0) {
            return c.substring(intName.length, c.length)
        }
    }

    return ""
}

function deleteCookie(name) {
    document.cookie = name + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}