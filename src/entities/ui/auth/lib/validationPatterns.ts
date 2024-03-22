const emaelRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-/`~=;'_[+!@#$%^&*(),?.":{\].\\.}|<>])[A-Za-z\d-/`~=;'_[+!@#$%^&*(),.?":{\].\\.}|<>]{8,}$/;
export const validateEmail = {
        value: emaelRegex,
        message: 'Invalid format email'
    }
export const validatePassword = {
        value: passwordRegex,
        message: 'Invalid format password'
    }
