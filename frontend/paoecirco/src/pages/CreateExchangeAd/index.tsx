import React from "react";
import logo from "../../assets/logo.png";
import "./styles.css";
import { AiOutlineMail, AiFillLock, AiOutlineSound, AiOutlineDropbox } from "react-icons/ai";
import { Link } from "react-router-dom";
import * as yup from "yup";

const CreateExchangeAd: React.FC = () => {
  function handleExchangeAdCreation() {}

  return (
    <div className="createExchangeAdContainer">
      <div className="createExchangeAdLogoContainer">
        <img src={logo} alt="logo" />
      </div>

      <h1>Criar Anúncio</h1>
        
      <div className="formsContainer">

             
        <div className="tituloAnuncioContainer">
          <div className="tituloAnuncioTextoIconeContainer">
            <AiOutlineSound className="tituloIcon" />
            Título do Anúncio
          </div>
          <input
            type="text"
            name="tituloAnuncioInput"
            id="TituloAnuncioInput"
            placeholder="ex: Sapato social em bom estado, Luva azul semi-nova" 
          />        
        </div>

        <div className="objetoContainer">
          <div className="objetoTextoIconeContainer">
            <AiOutlineDropbox className="objetoIcon" />
            Objeto
          </div>
          <input
            type="text"
            name="objetoInput"
            id="objetoInput"
            placeholder="ex: Sapato, Luva" 
          />        
        </div>

        <div className="_Container">
          <div className="_TextoIconeContainer">
            <AiOutlineDropbox className="_Icon" />
            _
          </div>
          <input
            type="text"
            name="_Input"
            id="_Input"
            placeholder="ex: Sapato, Luva" 
          />        
        </div>

        <div className="_Container">
          <div className="_TextoIconeContainer">
            <AiOutlineDropbox className="_Icon" />
            _
          </div>
          <input
            type="text"
            name="_Input"
            id="_Input"
            placeholder="ex: Sapato, Luva" 
          />        
        </div>

        <div className="_Container">
          <div className="_TextoIconeContainer">
            <AiOutlineDropbox className="_Icon" />
            _
          </div>
          <input
            type="text"
            name="_Input"
            id="_Input"
            placeholder="ex: Sapato, Luva" 
          />        
        </div>

      

      </div>

      <div className="inputLoginContainer">
        <div className="emailLoginInputContainer">
          <div className="somaisumcontainerlogin">
            <AiOutlineMail className="emailLoginIcon" />
            E-mail
          </div>

          <input
            type="text"
            name="inputLogin"
            id="inputLogin"
            placeholder="exemplo@email.com"
            className="inputLogin"
          />
        </div>
      </div>

      <div className="inputLoginContainer">
        <div className="emailLoginInputContainer">
          <div className="somaisumcontainerlogin2">
            <AiFillLock className="senhaLoginIcon" />
            Senha
          </div>

          <input
            type="password"
            name="inputLogin"
            id="inputLogin"
            placeholder="•••••••••••"
            className="inputLogin"
          />
        </div>
      </div>
      <Link to="/forgot" className="linkEsqueciASenha">
        Não consegue entrar?
      </Link>

      <button className="buttonLogin" onClick={handleExchangeAdCreation}>
        Criar
      </button>

      <Link to="/signup" className="linkSignupSignin">
        Não tem conta?
      </Link>
    </div>
  );
};

export default CreateExchangeAd;