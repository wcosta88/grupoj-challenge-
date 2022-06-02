const URL_KEY = 'la7zmavwis'

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
    "confirmation_code": "697740"
}

const userCredentials = {
    "username": "wellington.ferraz7@gmail.com",
    "password": "Abc@123"
}

const URL_NEWUSERTEST = `http://localhost:4566/restapis/${URL_KEY}/test/_user_request_/usuario`
const URL_CONFIRMUSERTEST = `http://localhost:4566/restapis/${URL_KEY}/test/_user_request_/usuario_confirmacao`

export {URL_NEWUSERTEST, URL_CONFIRMUSERTEST, addUserContent, confirmUserContent, userCredentials}
