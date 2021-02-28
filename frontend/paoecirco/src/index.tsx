import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import CreateExchangeAd from "./pages/CreateExchangeAd";
import Busca from "./pages/Busca";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/createexchangead" component={CreateExchangeAd} />
        <Route path="/busca" component={Busca} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
