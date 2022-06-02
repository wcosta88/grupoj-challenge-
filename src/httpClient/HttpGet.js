import {URL_GetQRCode} from "./HttpConstants";

let _headers = {
    'Content-Type': 'application/json',
    'client_id': '20tfh1piiu8pja1khmjuve6ra0'
}

const httpGetQrCode = async (sessionId) => {
    const response = await fetch(URL_GetQRCode, {
        method: 'GET',
        headers: {
            session: sessionId
        }
    });

   return response;
}

export { httpGetQrCode }
