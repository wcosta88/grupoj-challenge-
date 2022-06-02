const headers = {
    'Content-Type': 'application/json',
    'client_id': '20tfh1piiu8pja1khmjuve6ra0'
}

function isResponseSuccessul(httpResponse) {
    if(httpResponse.ok) {
        return true
    } else {
        return false
    }
}

async function parseHttpBody(httpResponse) {
    let body = await httpResponse.json()
    return body
}

export {isResponseSuccessul, parseHttpBody, headers}
