import logo from './logo.svg';
import './App.css';
import WelcomeMessage from "./components/WelcomeMessage";
import LoginForm from "./components/LoginForm";
import NewUserForm from "./components/NewUserForm";
import {Fragment, useState} from 'react';
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
      <Fragment>
          <Switch>
              <Route path="/" exact>
                  <LoginForm />
              </Route>
              <Route path="/newuser" exact>
                  <NewUserForm />
              </Route>
          </Switch>
      </Fragment>
  );
}

export default App;
