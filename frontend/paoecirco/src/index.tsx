import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import CreateExchangeAd from "./pages/CriarAnuncio";
import BuscaUsuario from "./pages/BuscaUsuario";
import GerenciarPropaganda from "./pages/GerenciarPropagandas";

import CriarPropaganda from "./pages/CriarPropaganda";
import BuscaAnuncio from "./pages/BuscaAnuncio";

import MakeAnOffer from "./pages/Oferta";
import Perfil from "./pages/Perfil";
import PerfilError from "./pages/PerfilError";
import EditarAnuncio from "./pages/EditarAnuncio";

import AvaliarDenuncia from "./pages/AvaliarDenuncia"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/createexchangead" component={CreateExchangeAd} />
        <Route path="/buscausuario" component={BuscaUsuario} />
        <Route path="/buscaanuncio" component={BuscaAnuncio} />
        <Route path="/gerenciarpropaganda" component={GerenciarPropaganda} />
        <Route path="/perfil/:id" component={Perfil} />
        <Route path="/perfil" component={PerfilError} />
        <Route path="/criarpropaganda" component={CriarPropaganda} />
        <Route path="/editaranuncio" component={EditarAnuncio} />

        <Route path="/makeanoffer" component={MakeAnOffer} />

        <Route path="/AvaliarDenunia" component={AvaliarDenuncia} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
