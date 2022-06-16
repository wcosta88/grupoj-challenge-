import classes from './NotificationForgotPassword.module.css'
import ReactDOM from 'react-dom';
import { Fragment } from 'react';
import Button from "./Button";
import {useState} from "react";
import {URL_CONFIRMPWD, URL_FORGOTPWD, URL_SIGIN} from "../httpClient/HttpConstants";
import {headers} from "../httpClient/HttpHelper";
import {httpGetQrCode} from "../httpClient/HttpGet";
import VirtualKeyBoard from "./VirtualKeyBoard";


const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
    const [virtualKeyBoard, setVirtualKeyBoard] = useState(false);

    const showVirtualKeyBoard = (event) => {
        setVirtualKeyBoard(true);
    }

    const hideVirtualKeyBoard = (event) => {
        setVirtualKeyBoard(false);
    }

    return (
        <Fragment>
        {!props.isForgotPwd && <div className={classes.modal}>
            {!props.isPwdConfirmed &&
            <Fragment>
                <header className={classes.header}>
                    <h2>Nova Senha</h2>
                </header>
                <div>
                    <p>Digite o nome do usuário</p>
                </div>
                <div>
                    <form onSubmit={props.onSubmit}>
                        <div className={classes.control}>
                            <input
                                type="email"
                                id="email"
                                value={props.value}
                                onChange={props.onChange}
                            />
                            <label htmlFor="password">Usuário</label>
                        </div>
                        <div className={classes.actions}>
                            <Button type="submit">OK</Button>
                        </div>
                    </form>
                </div>
            </Fragment>}
            {props.isPwdConfirmed &&
                <Fragment>
                    <header className={classes.header}>
                        <h2>Senha Confirmada</h2>
                    </header>
                    <div>
                        <p>Nova senha confirmada.</p>
                    </div>
                    <div>
                        <form>
                            <div className={classes.actions}>
                                <Button type="submit" onClick={props.onConfirm}>OK</Button>
                            </div>
                        </form>
                    </div>
                </Fragment>}
            }
        </div>}

        {props.isForgotPwd && <div className={classes.modal}>
                <header className={classes.header}>
                    <h2>Código de Verificação</h2>
                </header>
                <div>
                    <p>Um código foi enviado para seu email.</p>
                    <p>Digite o código de verificação e nova senha.</p>
                </div>
                <div>
                    <form onSubmit={props.onSubmitPwdConfirmation}>
                        <div className={classes.control}>
                            <input
                                id="code"
                                value={props.valueCode}
                                onChange={props.onChangeCode}
                                onFocus={hideVirtualKeyBoard}
                            />
                            <label htmlFor="code">Código</label>
                        </div>
                        <div className={classes.control}>
                            <input
                                type="password"
                                id="password"
                                value={props.valuePassword}
                                onChange={props.onChangePwd}
                                onFocus={showVirtualKeyBoard}
                            />
                            <label htmlFor="password">Senha</label>
                        </div>
                        {virtualKeyBoard && <div className={classes.vkeyboard}><VirtualKeyBoard onPassword={props.onChangePwd}></VirtualKeyBoard></div>}
                        <div className={classes.actions}>
                            <Button type="submit">OK</Button>
                        </div>
                    </form>
                </div>
            </div>}
        </Fragment>
    );
};

function NotificationForgotPassword(props) {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredCode, setEnteredCode] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isForgotPwd, setForgotPwd] = useState(false);
    const [isPwdConfirmed, setConfirmPwd] = useState(false);

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };

    const codeChangeHandler = (event) => {
        setEnteredCode(event.target.value);
    };

    const codePasswordHandler = (input) => {
        setEnteredPassword(input);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const response = await fetch(URL_FORGOTPWD,{
            method: 'POST',
            body: JSON.stringify({
                username: enteredEmail
            }),
            headers: {
                client_id: '20tfh1piiu8pja1khmjuve6ra0'
            }
        });

        if(response.ok) {
            let bodyContent = await response.json();
            setMessage(bodyContent.data.message)
            setForgotPwd(true)
        }
        if(!response.ok) {
            let bodyContent = await response.json();
            console.log(bodyContent)
        }

    }

    const onSubmitPwdConfirmation = async(event) => {
        event.preventDefault();
        console.log(enteredCode)
        const response = await fetch(URL_CONFIRMPWD,{
            method: 'POST',
            body: JSON.stringify({
                username: enteredEmail,
                confirmation_code: enteredCode,
                password: enteredPassword
            }),
            headers: {
                client_id: '20tfh1piiu8pja1khmjuve6ra0'
            }
        });

        if(response.ok) {
            let bodyContent = await response.json();
            setMessage(bodyContent.data.message)
            setConfirmPwd(true)
            setForgotPwd(false)
        }

        if(!response.ok) {
            let bodyContent = await response.json();
            console.log(bodyContent)
        }
    }

    return (
        <Fragment>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    onConfirm={props.onConfirm}
                    onSubmit={submitHandler}
                    onChange={emailChangeHandler}
                    value={enteredEmail}
                    valueCode={enteredCode}
                    valuePassword={enteredPassword}
                    onChangePwd={codePasswordHandler}
                    onChangeCode={codeChangeHandler}
                    onSubmitPwdConfirmation={onSubmitPwdConfirmation}
                    isForgotPwd={isForgotPwd}
                    isPwdConfirmed={isPwdConfirmed}
                />,
                document.getElementById('overlay-root')
            )}
        </Fragment>
    )
}


// function Notification(props) {
//     // onClick={props.onConfirm}
//     return (
//         <Fragment>
//             <div className={'backdrop'} >
//                 <Card className='modal'>
//                     <h2>{props.header}</h2>
//                     <p>{props.message}</p>
//                     {props.children}
//                 </Card>
//             </div>
//         </Fragment>
//     )
// }

export default NotificationForgotPassword
