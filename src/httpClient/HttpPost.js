let _headers = {
    'Content-Type': 'application/json',
    'client_id': '20tfh1piiu8pja1khmjuve6ra0'
}

async function httpPostReq(url, bodyContent = null, otherHeaders = null, error_message='Erro na requisicao POST') {
    let errorStatus
    let responseCode
    try {
        if(otherHeaders) {
            _headers = {..._headers, ...otherHeaders}
        }

        const response = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(bodyContent),
            headers: _headers
        });
        return response
        // if(!response.ok) {
        //     errorStatus = !response.ok
        //     responseCode = response.status
        //     let responseError = await response.json()
        //     throw new Error(`${error_message}.
        //                 HTTP Status Code: ${response.status}
        //                 HTTP Message: ${response.statusText}
        //                 Response Body: ${responseError.testes.data.mensagem}`) // gotta fix this in the BE
        // }
        // const responseBodyContent = await response.json()
        // console.log(`
        //     HTTP Status Code: ${response.status}
        //     HTTP Message: ${response.statusText}
        //     Response Body: ${responseBodyContent.data.message}`)
        // errorStatus = response.ok
        // responseCode = response.status
        // return {...responseBodyContent.data, error: errorStatus, httpCode: responseCode}
    } catch (error) {
        // console.log(error.message)
        //return {message: error.message, error: errorStatus, httpCode: responseCode}
        return error
    }

}

export default httpPostReq
