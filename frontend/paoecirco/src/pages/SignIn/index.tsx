import React from "react";
import logo from "../../assets/logo.png";
import "./styles.css";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { Link } from "react-router-dom";
import * as yup from "yup";

const SignIn: React.FC = () => {
  function handleLogin() {}

  return (
    <div className="signinContainer">
      <div className="loginLogoContainer">
        <img src={logo} alt="logo" />
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

      <button className="buttonLogin" onClick={handleLogin}>
        Entrar
      </button>

      <Link to="/signup" className="linkSignupSignin">
        Não tem conta?
      </Link>
    </div>
  );
};

export default SignIn;
