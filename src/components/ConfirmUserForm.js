import {useState} from "react";
import httpPostReq from "../httpClient/HttpPost";
import {URL_CONFIRMUSER, URL_NEWUSER} from "../httpClient/HttpConstants";
import {headers, isResponseSuccessul, parseHttpBody} from "../httpClient/HttpHelper";
import Notification from "./Notification";
import Card from "./Card";
import classes from "./ConfirmUserForm.module.css";
import Button from "./Button";


function ConfirmUserForm(props) {
    const [code, setCode] = useState('')
    const [error, setError] = useState();
    const [success, setSuccess] =  useState();

    const coderHandler = (event) => {
        event.preventDefault();
        setCode(event.target.value)
    }

    const submitHandler = async (event) => {
        console.log(props.username)
        console.log(code)
        event.preventDefault();
        let response = await fetch(URL_CONFIRMUSER, {
            method: 'POST',
            body: JSON.stringify({
                username: props.username,
                confirmation_code: code
            }),
            headers: headers
        });

        if(response.ok) {
            let bodyContent = await response.json();
            props.onConfirm()
        } else {
            let bodyContent = await response.json();
            setError(bodyContent)
            console.log(bodyContent);
        }

    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <input type='text' value={code} onChange={coderHandler}/>
                    <label>Codigo de Confirmacao </label>
                </div>
                <div className={classes.control}>
                    <Button type={'submit'}>OK</Button>
                </div>
            </form>
            {success && <Card ><p>{success}</p></Card>}
            {error && <Card>
                <h2>ERRO!</h2>
                <p>{error.testes.data.mensagem}</p>
            </Card>}
        </div>);
}

export default ConfirmUserForm
