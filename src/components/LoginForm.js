import React, {useEffect, useState} from 'react';
import httpPostReq from "../httpClient/HttpPost";
import './LoginForm.module.css'
import {URL_CheckQRCode, URL_GetQRCode, URL_SIGIN, URL_ValidateMFA} from "../httpClient/HttpConstants";
import {headers, isResponseSuccessul, parseHttpBody} from "../httpClient/HttpHelper";
import MainHeader from "./MainHeader";
import Login from "./Login";
import Home from "./Home"
import Notification from "./Notification";
import NotificationQrCode from "./NotificationQrCode";
import {httpGetQrCode} from "../httpClient/HttpGet";
import NotificationMfa from "./NotificationValidateMfa";


function LoginForm(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [registerMfa, setRegisterMfa] = useState(false);
    const [isMfaConfirmed, setIsMfaConfirmed] = useState(false);
    const [validateMfa, setValidateMfa] = useState(false);
    const [sessionId, setSessionId] = useState();
    const [qrCode, setQrCode] = useState();
    const [userName, setUserName] = useState();
    const [isError, setIsError] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const loginHandler = async (email, password) => {
        const response = await fetch(URL_SIGIN,{
            method: 'POST',
            body: JSON.stringify({
                username: email,
                password: password
            }),
            headers: headers
        });

        if(response.ok) {
            let bodyContent = await response.json()
            console.log(bodyContent)
            if(bodyContent.data.message === "Necessário cadastrar um MFA para prosseguir") {
                setSessionId(bodyContent.data.session)

                let responseQrCode = await httpGetQrCode(bodyContent.data.session)
                if(responseQrCode.ok) {
                    let bodyContentQrCode = await responseQrCode.json()
                    setQrCode(bodyContentQrCode.data.codigo_qr_code)
                    setSessionId(bodyContentQrCode.data.session)
                } else {
                    let bodyContentQrCode = await responseQrCode.json()
                }
                setRegisterMfa(true)
            }
            if(bodyContent.data.message ==="Necessário validar o MFA para prosseguir") {
                setSessionId(bodyContent.data.session);
                setUserName(email)
                setValidateMfa(true)
            }
        } else {
            let bodyContent = await response.json()
            setErrorMessage(bodyContent.testes.data.mensagem)
            setIsError(true)
        }
    }

    const logoutHandler = () => {
        setIsLoggedIn(false);
    }

    const isNewUserHandler = (event) => {
        event.preventDefault();
        setIsNewUser(true)
    }

    const confirmMfaHandler = async (code) => {
        const response = await fetch(URL_CheckQRCode,{
            method: 'POST',
            body: JSON.stringify({
                user_code: code,
                friendly_device_name: ""
            }),
            headers: {
                session: sessionId
            }
        });
        if(response.ok) {
            let bodyContent = await response.json()
            console.log(bodyContent)
            setRegisterMfa(false)
            setIsMfaConfirmed(true)

        } else {
            let bodyContent = await response.json()
            console.log(bodyContent)
        }
    }

    const cleanState = () => {
        if(isMfaConfirmed) {
            setIsMfaConfirmed(false)
        }
        if(validateMfa) {
            setValidateMfa(false)
        }
    }

    const confimrHandler = (event) => {
        event.preventDefault();
        setIsError(false);
    }

    const confirmMfa = async (mfaCode) => {
        const response = await fetch(URL_ValidateMFA,{
            method: 'POST',
            body: JSON.stringify({
                username: userName,
                software_token_mfa_code: mfaCode
            }),
            headers: {
                session: sessionId,
                client_id: '20tfh1piiu8pja1khmjuve6ra0'
            }
        });
        if(response.ok) {
            setIsLoggedIn(true)
            setValidateMfa(false)
        } else {
            let bodyContent = await response.json()
            console.log(bodyContent)
        }
}

    return (
      <React.Fragment>
          <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler}/>
          <main>
              {!isLoggedIn && <Login onLogin={loginHandler} />}
              {isLoggedIn && <Home onLogout={logoutHandler} />}
              {registerMfa && <NotificationQrCode title={"Necessário cadastrar um MFA para prosseguir"}
                                             message={"Use o QR Code para cadastrar o seu MFA"} qrCode={qrCode} onConfirmMfa={confirmMfaHandler} />}
              {isMfaConfirmed && <Notification title={"Confirmação MFA"}
                                                     message={"Confirmação de criação de mfa para o usuário realizada com sucesso"} onConfirm={cleanState} />}
              {validateMfa && <NotificationMfa title={"Chave MFA"}
                                               message={"Entre sua chave MFA e clique OK"} onConfirmMfa={confirmMfa}/>}
              {isError && <Notification message={errorMessage} title={'ERRO!'} color={'red'} onConfirm={confimrHandler}/>}
          </main>
      </React.Fragment>
    );
}

export default LoginForm
