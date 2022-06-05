import {Fragment, useRef, useState} from 'react';
import httpPostReq from "../httpClient/HttpPost";
import {URL_NEWUSER} from "../httpClient/HttpConstants";
import Notification from "./Notification";
import {isResponseSuccessul, parseHttpBody} from "../httpClient/HttpHelper";
import ConfirmUserForm from "./ConfirmUserForm";
import classes from "./NewUserForm.module.css";
import Button from "./Button";
import NotificationConfirmUser from "./NotificationConfirmUser";
import VirtualKeyBoard from "./VirtualKeyBoard";

function NewUserForm(props) {
    const [enteredName, setName] = useState('');
    const [enteredLastName, setLastName] = useState('');
    const [enteredEmail, setEmail] = useState('');
    const [enteredPassword, setPassword] = useState('');
    const [enteredCountry, setCountry] = useState('');
    const [enteredPhone, setPhone] = useState('');
    const [enteredAddress, setAddress] = useState('');
    const reqResponse = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUserReg, setIsUserReg] = useState(false);
    const [virtualKeyBoard, setVirtualKeyBoard] = useState(false);


     const submitHandler = async (event) => {
        event.preventDefault();
        const requestBoby = {
            "username": enteredEmail,
            "password": enteredPassword,
            "attributes": {
                "name": enteredName,
                "middle_name": enteredLastName,
                "email": enteredEmail,
                "locale": enteredCountry,
                "phone_number": enteredPhone,
                "address": enteredAddress
            }
        }
        let httpResponse = await httpPostReq(URL_NEWUSER, requestBoby);

         if(isResponseSuccessul(httpResponse)) {
             await successHandler(httpResponse)
         } else {
             await errorHandler(httpResponse)
         }
    }

    const successHandler = async (httpResponse) => {
        let body = await parseHttpBody(httpResponse)
        setSuccess(body.data.message)
    }

    const errorHandler = async (httpResponse) => {
        let body = await parseHttpBody(httpResponse)
        setError(body.testes.data.mensagem)
    }

    const confimrHandler = (event) => {
        event.preventDefault();
        setSuccess(null);
        setError(null);
        setIsUserReg(null)
    }

    const userRegisteredHandler = (event) => {
         //event.preventDefault()
        setSuccess(null);
        setError(null);
        setIsUserReg(true);
    }

    const passwordChangeHandler = (input) => {
        setPassword(input);

    };

    const showVirtualKeyBoard = (event) => {
        setVirtualKeyBoard(true);
    }

    const hideVirtualKeyBoard = (event) => {
        setVirtualKeyBoard(false);
    }

    const nameChangeHandler = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const lastNameChangeHandler = (event) => {
        event.preventDefault();
        setLastName(event.target.value);
    }

    const emailChangeHandler = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
    }

    const countryChangeHandler = (event) => {
        event.preventDefault();
        setCountry(event.target.value);
    }

    const phoneChangeHandler = (event) => {
        event.preventDefault();
        setPhone(event.target.value);
    }

    const addressChangeHandler = (event) => {
        event.preventDefault();
        setAddress(event.target.value);
    }

    return (
        <Fragment>
            <div className={classes.formBox}>
                <div>
                    <form onSubmit={submitHandler}>
                        <div className={classes.control}>
                            <input
                                type='text'
                                value={enteredName}
                                onFocus={hideVirtualKeyBoard}
                                onChange={nameChangeHandler}
                            />
                            <label>Nome </label>
                        </div>
                        <div className={classes.control}>
                            <input
                                type='text'
                                value={enteredLastName}
                                onFocus={hideVirtualKeyBoard}
                                onChange={lastNameChangeHandler}
                            />
                            <label>Sobrenome </label>
                        </div>
                        <div className={classes.control}>
                            <input
                                type='text'
                                value={enteredEmail}
                                onFocus={hideVirtualKeyBoard}
                                onChange={emailChangeHandler}
                            />
                            <label>Email </label>
                        </div>
                        <div className={classes.control}>
                            <input
                                   type="password"
                                   id="password"
                                   value={enteredPassword}
                                   onFocus={showVirtualKeyBoard}
                            />
                            <label>Password </label>
                        </div>
                        <div className={classes.control}>
                            <input
                                type='text'
                                value={enteredCountry}
                                onFocus={hideVirtualKeyBoard}
                                onChange={countryChangeHandler}
                            />
                            <label>Pais </label>
                        </div>
                        <div className={classes.control}>
                            <input
                                type='text'
                                value={enteredPhone}
                                onFocus={hideVirtualKeyBoard}
                                onChange={phoneChangeHandler}
                            />
                            <label>Telefone </label>
                        </div>
                        <div className={classes.control}>
                            <input
                                type='text'
                                value={enteredAddress}
                                onFocus={hideVirtualKeyBoard}
                                onChange={addressChangeHandler}
                            />
                            <label>Endereco </label>
                        </div>
                        <div className={classes.actions}>
                            <Button type={'submit'} >Enviar</Button>
                        </div>
                    </form>

                </div>
                <div className={classes.vkeyboard}>
                    {virtualKeyBoard && <VirtualKeyBoard onPassword={passwordChangeHandler}/>}
                </div>
                {success && <NotificationConfirmUser message={success} onConfirm={confimrHandler}><ConfirmUserForm username={enteredEmail} onConfirm={userRegisteredHandler}/></NotificationConfirmUser>}
                {error && <Notification message={error} title={'ERRO!'} color={'red'} onConfirm={confimrHandler}/>}
                {isUserReg && <Notification message={'Cadastro de usuário confirmado com sucesso'} title={'Cadastro Confirmado'} onConfirm={confimrHandler} />}
            </div>
        </Fragment>
    );
}

export default NewUserForm
