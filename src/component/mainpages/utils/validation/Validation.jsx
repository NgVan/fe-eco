export const isEmpty = (value) => {
    if(!value) return true;
    return false;
}

export const isEmail = (email) => {
    //const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const re = /^(\w+@\w+\.\w+(\.\w+)?)$/
    return re.test(email);
}

export const isMatch = (password, confirmPassword) => {
    if(password === confirmPassword) return true;
    return false;
}

export const isLength = (password) => {
    if(password.length < 6) return true;
    return false;
}