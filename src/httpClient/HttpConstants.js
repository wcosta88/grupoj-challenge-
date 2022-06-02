const URL_KEY = 'z0dmzyn65s'
const URL_NEWUSER = `http://localhost:4566/restapis/${URL_KEY}/test/_user_request_/usuario` // 1
const URL_CONFIRMUSER = `http://localhost:4566/restapis/${URL_KEY}/test/_user_request_/usuario_confirmacao` // 2
const URL_SIGIN = `http://localhost:4566/restapis/${URL_KEY}/test/_user_request_/sign_in` // 3
const URL_GetQRCode = `http://localhost:4566/restapis/${URL_KEY}/test/_user_request_/mfa_qr_code` // 4
const URL_CheckQRCode = `http://localhost:4566/restapis/${URL_KEY}/test/_user_request_/mfa_qr_code_confirmacao` // 5
const URL_ValidateMFA = `http://localhost:4566/restapis/${URL_KEY}/test/_user_request_/validate_mfa` // 6
const URL_CheckToken = `http://localhost:4566/restapis/${URL_KEY}/test/_user_request_/validation_token` //7
const URL_SIGOUT = `http://localhost:4566/restapis/${URL_KEY}/test/_user_request_/sign_out`


const addUserContent = {
    "username": "wellington.ferraz7@gmail.com",
    "password": "Abc@123",
    "attributes": {
        "name": "Wellington",
        "middle_name": "Costa",
        "email": "wellington.ferraz7@gmail.com",
        "locale": "Brasil",
        "phone_number": "+15555555555",
        "address": "Rua Alfa"
    }
}

const confirmUserContent = {
    "username": "wellington.ferraz7@gmail.com",
    "confirmation_code": "332371"
}

const userCredentials = {
    "username": "wellington.ferraz7@gmail.com",
    "password": "Abc@123"
}

const qrCodeConfirmation = {
    "user_code": "552736",
    "friendly_device_name": ""
}

const validatesMFA = {
    "username": "wellington.ferraz7@gmail.com",
    "software_token_mfa_code": "888388"
}

export {URL_NEWUSER, URL_CONFIRMUSER, URL_SIGIN, URL_ValidateMFA, URL_GetQRCode, URL_CheckQRCode, URL_CheckToken,
    URL_SIGOUT, addUserContent, confirmUserContent, userCredentials, qrCodeConfirmation, validatesMFA}
