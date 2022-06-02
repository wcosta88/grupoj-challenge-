import {useState} from "react";
import httpPostReq from "../httpClient/HttpPost";
import {URL_CheckToken, URL_ValidateMFA} from "../httpClient/HttpConstants";
import {isResponseSuccessul, parseHttpBody} from "../httpClient/HttpHelper";
import Notification from "./Notification";
import Card from "./Card";


function MfaValidationForm(props) {
    const [code, setCode] = useState();

    const codeHandler = (event) => {
        event.preventDefault()
        setCode(event.target.value)
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        const requestBody = {
            "username": props.username,
            "software_token_mfa_code": code
        }
        let httpResponse = await httpPostReq(URL_ValidateMFA, requestBody, {session: props.session});
        if(isResponseSuccessul(httpResponse)) {
            //await successHandler(httpResponse);
            let body = await httpResponse.json();
            let httpResponseToken = await httpPostReq(URL_CheckToken, null,
                {Authorization: body.data.AuthenticationResult.AccessToken});
            let responseToken = await httpResponseToken.json();
            props.tokenHandler(responseToken.data.message);
            props.onSuccess()
        }
    }

    const successHandler = async (httpResponse) => {
        let body = await parseHttpBody(httpResponse)
        props.tokenHandler(body.data.AuthenticationResult.AccessToken)
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

export default MfaValidationForm
