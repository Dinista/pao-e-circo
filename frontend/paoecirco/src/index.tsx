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
import EditarPerfil from "./pages/EditarPerfil";
import Esqueceu from "./pages/Forgot";


import AvaliarDenuncia from "./pages/AvaliarDenuncia"
import RelatorioAnuncios from "./pages/RelatorioAnuncios";
import RelatorioPropagandas from "./pages/RelatorioPropagandas";
import RelatorioUsuarioCadastrados from "./pages/RelatorioCliente";
import BuscaCategoria from "./pages/BuscaCategoria";

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
        <Route path="/perfil" compoenent={PerfilError}></Route>
        <Route path="/criarpropaganda" component={CriarPropaganda} />
        <Route path="/editaranuncio" component={EditarAnuncio} />
        <Route path="/editarPerfil" component={EditarPerfil} />
        <Route path="/forgot" component={Esqueceu} />
        <Route path="/makeanoffer" component={MakeAnOffer} />

        <Route path="/AvaliarDenuncia" component={AvaliarDenuncia} />
        <Route path="/RelatorioAnuncios" component={RelatorioAnuncios} />
        <Route path="/RelatorioPropagandas" component={RelatorioPropagandas} />
        <Route path="/RelatorioCliente" component={RelatorioUsuarioCadastrados} />
        <Route path="/BuscaCategoria" component={BuscaCategoria} />


        

      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
