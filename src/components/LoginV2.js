import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom'
import Card from './Card';
import classes from './LoginV2.module.css';
import Button from './Button';
import VirtualKeyBoard from "./VirtualKeyBoard";
import {ReCAPTCHA} from "react-google-recaptcha";
import ButtonOthers from "./ButtonOthers";
import NotificationForgotPassword from "./NotificationForgotPassword";
import Captcha from "./Captcha";

const Login = (props) => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);
    const [isCaptcha, setIsCaptcha] = useState(false);
    const [isForgotPwd, setIsForgotPwd] = useState(false);
    const [virtualKeyBoard, setVirtualKeyBoard] = useState(false);

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);

        setFormIsValid(
            event.target.value.includes('@') && enteredPassword.trim().length > 5
        );
    };

    const passwordChangeHandler = (input) => {
        setEnteredPassword(input);

        setFormIsValid(
            input.trim().length > 5 && enteredEmail.includes('@') && isCaptcha
        );
    };

    const validateCaptcha = (result) => {
        if(result) {
            alert("Captcha Válido!")
            setIsCaptcha(true)
            setFormIsValid(true)
        } else {
            alert("Captcha Inválido!")
        }
    }

    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'));
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 5);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        // if(!isCaptcha) {
        //     alert('Necessário ativar o captcha para proseguir')
        // } else {
        //     props.onLogin(enteredEmail, enteredPassword);
        // }
        props.onLogin(enteredEmail, enteredPassword);

    };


    const verifyCaptcha = (event) => {
        setIsCaptcha(event.target.checked);
    }

    const showVirtualKeyBoard = (event) => {
        setVirtualKeyBoard(true);
    }

    const hideVirtualKeyBoard = (event) => {
        setVirtualKeyBoard(false);
    }

    const forgotPwdHandler = (event) => {
        event.preventDefault();
        setIsForgotPwd(true);
    }

    const clearState = (event) => {
        event.preventDefault();
        setIsForgotPwd(false);
    }

    function onChangeCaptcha(value) {
        console.log("Captcha value:", value);
    }

    return (
        <Fragment>
                {isForgotPwd && <NotificationForgotPassword onConfirm={clearState}/>}
                <form className={classes.form} onSubmit={submitHandler}>
                    <div className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''}`} >
                        <input
                            type="email"
                            id="email"
                            value={enteredEmail}
                            onChange={emailChangeHandler}
                            onBlur={validateEmailHandler}
                            onFocus={hideVirtualKeyBoard}
                        />
                        <label htmlFor="password">Usuário</label>
                    </div>
                    <div className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''}`} >
                        <input
                            type="password"
                            id="password"
                            value={enteredPassword}
                            //defaultValue={enteredPassword}
                            //onChange={passwordChangeHandler}
                            onBlur={validatePasswordHandler}
                            onFocus={showVirtualKeyBoard}

                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className={classes.control}>
                        <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                            Entrar
                        </Button>
                    </div>
                    <div>
                        <ButtonOthers onClick={forgotPwdHandler}>Esqueçi minha senha!</ButtonOthers>
                    </div>
                </form>
            <div className={classes.vkeyboard}>
                {virtualKeyBoard && <VirtualKeyBoard onPassword={passwordChangeHandler}/>}
                <div className={classes.captcha}>
                    {enteredPassword.length > 5 && <Captcha onValidate={validateCaptcha}/>}
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
