import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom'
import Card from './Card';
import classes from './Login.module.css';
import Button from './Button';
import VirtualKeyBoard from "./VirtualKeyBoard";

const Login = (props) => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);
    const [isCaptcha, setIsCaptcha] = useState(false);
    const [virtualKeyBoard, setVirtualKeyBoard] = useState(false)

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);

        setFormIsValid(
            event.target.value.includes('@') && enteredPassword.trim().length > 5
        );
    };

    const passwordChangeHandler = (input) => {
        setEnteredPassword(input);

        setFormIsValid(
            input.trim().length > 5 && enteredEmail.includes('@')
        );
    };

    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'));
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if(!isCaptcha) {
            alert('Necessário ativar o captcha para proseguir')
        } else {
            props.onLogin(enteredEmail, enteredPassword);
        }

    };


    const verifyCaptcha = (event) => {
        setIsCaptcha(event.target.checked)
    }

    const showVirtualKeyBoard = (event) => {
        setVirtualKeyBoard(true)
    }

    return (
        <Fragment>
            <Card className={classes.login}>
                <form onSubmit={submitHandler}>
                    <div
                        className={`${classes.control} ${
                            emailIsValid === false ? classes.invalid : ''
                        }`}
                    >
                        <label htmlFor="email">E-Mail</label>
                        <input
                            type="email"
                            id="email"
                            value={enteredEmail}
                            onChange={emailChangeHandler}
                            onBlur={validateEmailHandler}
                        />
                    </div>
                    <div
                        className={`${classes.control} ${
                            passwordIsValid === false ? classes.invalid : ''
                        }`}
                    >
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={enteredPassword}
                            //defaultValue={enteredPassword}
                            //onChange={passwordChangeHandler}
                            onBlur={validatePasswordHandler}
                            onFocus={showVirtualKeyBoard}

                        />
                    </div>
                    <div className={classes.actions}>
                        <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                            Login
                        </Button>
                    </div>
                </form>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} >
                        <Link to="/newuser">Novo Usuario</Link>
                    </Button>
                </div>
            </Card>
            <Card className={classes.captcha}>
                <form>
                    <div className={classes.captchaelem}>
                        <input type="checkbox" onChange={verifyCaptcha}/>
                    </div>
                    <div className={classes.captchaelem}>
                        <label>Captcha</label>
                    </div>
                </form>
            </Card>
            {virtualKeyBoard && <VirtualKeyBoard onPassword={passwordChangeHandler}/>}
        </Fragment>
    );
};

export default Login;
