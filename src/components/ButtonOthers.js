import {Fragment} from "react";


function ButtonOthers(props) {
    return (
        <Fragment>
            <button onClick={props.onClick}>
                {props.children}
            </button>
        </Fragment>
    );
}

export default ButtonOthers;
