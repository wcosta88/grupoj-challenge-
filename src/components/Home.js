import React from 'react';

import Card from './Card';
import classes from './Home.module.css';

const Home = (props) => {
    return (
        <Card className={classes.home}>
            <h1>Bem Vindo ao Portal Banco Pan!</h1>
        </Card>
    );
};

export default Home;
