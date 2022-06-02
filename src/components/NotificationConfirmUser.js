import classes from './NotificationQrCode.module.css'
import Card from "./Card";
import ReactDOM from 'react-dom';
import {Fragment, useEffect} from 'react';
import Button from "./Button";
import {useState} from "react";
import {httpGetQrCode} from "../httpClient/HttpGet";
import QrCode from "./QrCode";
import React from "react";

const Backdrop = (props) => {
    return <div className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
    const [enteredCode, setEnteredCode] = useState('');

    const codeChangeHandler = (event) => {
        setEnteredCode(event.target.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.onConfirm(enteredCode)
    };

    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div>
                <p>{props.message}</p>
            </div>
            <div>
                {props.children}
            </div>
        </Card>
    );
};

function NotificationConfirmUser(props) {
    return (
        <Fragment>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    title={props.title}
                    message={props.message}
                    children={props.children}
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

export default NotificationConfirmUser
