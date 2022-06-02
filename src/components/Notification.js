import classes from './Notification.module.css'
import Card from "./Card";
import ReactDOM from 'react-dom';
import { Fragment } from 'react';
import Button from "./Button";
import {useState} from "react";
import {httpGetQrCode} from "../httpClient/HttpGet";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
    return (
        <Card className={classes.modal}>
            {props.color === "red" && <header className={classes.headererror}>
                <h2>{props.title}</h2>
            </header>}
            {props.color !== "red" && <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>}
            <div>
                <p>{props.message}</p>
            </div>
            <div>
                <Button onClick={props.onConfirm}>OK</Button>
            </div>
        </Card>
    );
};

function Notification(props) {
    const [qrCode, setQrCode] = useState(false);

    let response = httpGetQrCode(props.sessionId);

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
                    onConfirm={props.onConfirm}
                    color={props.color}
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

export default Notification
