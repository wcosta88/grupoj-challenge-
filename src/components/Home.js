import React, {Fragment} from 'react';

import Card from './Card';
import classes from './Home.module.css';
import Button from "./Button";

const Home = (props) => {
    return (
        <Fragment>
            <header >
                <div className={classes.menuContainer}>
                    <nav>
                        <ul className={classes.mainMenu}>
                            <li>
                                <Button onClick={props.onLogout}>Sair</Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className={classes.home}>
                <h1>Bem Vindo ao Pan Online!</h1>
            </div>
            <div className={classes.tokendiv}>{JSON.stringify(props.token.data.AuthenticationResult)}</div>
        </Fragment>
    );
};

export default Home;
