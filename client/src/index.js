import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";

import Register from "./screens/register";
import Login from "./screens/login";
import Forgot from "./screens/forgot";
import Activate from "./screens/activate";
import Reset from "./screens/reset";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={props => <App {...props}/>}/>
        <Route path="/register" exact render={props => <Register {...props}/>}/>
        <Route path="/login" exact render={props => <Login {...props}/>}/>
        <Route path="/users/password/forgot" exact render={props => <Forgot {...props}/>}/>
        <Route path="/users/activate/:token" exact render={props => <Activate {...props}/>}/>
        <Route path="/users/password/reset/:token" exact render={props => <Reset {...props}/>}/>
      </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);
