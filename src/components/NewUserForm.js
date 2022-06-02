import {Fragment, useRef, useState} from 'react';
import httpPostReq from "../httpClient/HttpPost";
import {URL_NEWUSER} from "../httpClient/HttpConstants";
import Notification from "./Notification";
import {isResponseSuccessul, parseHttpBody} from "../httpClient/HttpHelper";
import ConfirmUserForm from "./ConfirmUserForm";
import classes from "./NewUserForm.module.css";
import Card from "./Card";
import Navigation from "./Navigation";
import Button from "./Button";
import NotificationConfirmUser from "./NotificationConfirmUser";

function NewUserForm(props) {
    const name = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const country = useRef();
    const phone = useRef();
    const address = useRef();
    const reqResponse = useRef();
    const [error, setError] = useState();
    const [success, setSuccess] =  useState();
    const [isUserReg, setIsUserReg] = useState(false);


     const submitHandler = async (event) => {
        event.preventDefault();
        const requestBoby = {
            "username": email.current.value,
            "password": password.current.value,
            "attributes": {
                "name": name.current.value,
                "middle_name": lastName.current.value,
                "email": email.current.value,
                "locale": country.current.value,
                "phone_number": phone.current.value,
                "address": address.current.value
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
        console.log(email.current.value)
        setSuccess(body.data.message)
    }

    const errorHandler = async (httpResponse) => {
        let body = await parseHttpBody(httpResponse)
        console.log(body)
        console.log(email.current.value)
        setError(body.testes.data.mensagem)
    }

    const confimrHandler = (event) => {
        event.preventDefault();
        setSuccess(null);
        setError(null);
        setIsUserReg(null)
    }

    const userRegisteredHandler = (event) => {
         event.preventDefault()
        setSuccess(null);
        setError(null);
        setIsUserReg(true);
    }

    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Banco Pan</h1>
            </header>
            <Card className={classes.login}>
                <form onSubmit={submitHandler}>
                    <div className={'Form-Controls'}>
                        <div className={classes.control}>
                            <label>Nome </label>
                            <input type='text' ref={name}/>
                        </div>
                        <div className={classes.control}>
                            <label>Sobrenome </label>
                            <input type='text' ref={lastName} />
                        </div>
                        <div className={classes.control}>
                            <label>Email </label>
                            <input type='text' ref={email} />
                        </div>
                        <div className={classes.control}>
                            <label>Password </label>
                            <input type='password' ref={password} />
                        </div>
                        <div className={classes.control}>
                            <label>Pais </label>
                            <input type='[text]' ref={country} />
                        </div>
                        <div className={classes.control}>
                            <label>Telefone </label>
                            <input type='text' ref={phone} />
                        </div>
                        <div className={classes.control}>
                            <label>Endereco </label>
                            <input type='text' ref={address} />
                        </div>
                        <div className={classes.actions}>
                            <Button type={'submit'} >Enviar</Button>
                        </div>
                    </div>
                </form>
                {success && <NotificationConfirmUser message={success} onConfirm={confimrHandler}><ConfirmUserForm username={email.current.value} onConfirm={userRegisteredHandler}/></NotificationConfirmUser>}
                {error && <Notification message={error} title={'ERRO!'} color={'red'} onConfirm={confimrHandler}/>}
                {isUserReg && <Notification message={'Cadastro de usuário confirmado com sucesso'} title={'Cadastro Confirmado'} onConfirm={confimrHandler} />}
            </Card>
        </Fragment>
    );
}

export default NewUserForm
