import {useState} from "react";
import httpPostReq from "../httpClient/HttpPost";
import {URL_CheckQRCode} from "../httpClient/HttpConstants";
import {isResponseSuccessul, parseHttpBody} from "../httpClient/HttpHelper";
import Notification from "./Notification";
import Card from "./Card";


function MfaConfirmationForm(props) {
    const [code, setCode] = useState();

    const codeHandler = (event) => {
        event.preventDefault()
        setCode(event.target.value)
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        const requestBody = {
            "user_code": code,
            "friendly_device_name": ""
        }
        let httpResponse = await httpPostReq(URL_CheckQRCode, requestBody, {session: props.session});
        let body = await httpResponse.json()
        console.log(httpResponse);
        console.log(body);
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Codigo MFA </label>
                    <input type='text' onChange={codeHandler}/>
                </div>
                <div>
                    <button type={'submit'}>OK</button>
                </div>
            </form>
        </div>);
}

export default MfaConfirmationForm
