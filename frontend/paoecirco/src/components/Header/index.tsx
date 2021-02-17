import React, { useState } from "react";
import "./styles.css";
import Logo from "../../assets/logo.png";
import Avatar from "../../assets/avatar-mini.jpg";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header: React.FC = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <div className="header">
      <div className="ladoEsquerdo">
        <img src={Logo} alt="logo" className="logo" />

        <div className="containerAleatorio">
          <input
            type="text"
            placeholder="Buscar um anúncio ou um usuário..."
            className="inputText"
            id="input"
          ></input>
          <button className="iconContainer">
            <FiSearch />
          </button>
        </div>
      </div>

      {isLoggedIn ? (
        <div className="loggedContainer">
          <img src={Avatar} className="avatar" alt="avatar" />
          <Link to="/destaques" className="destaques">
            DESTAQUES
          </Link>
          <Link to="/anunciar" className="linkLogged">
            ANUNCIAR
          </Link>
          <button onClick={handleLogout} className="sair">
            SAIR
          </button>
        </div>
      ) : (
        <div className="loggedContainer">
          <Link to="/signin" className="linkSignin">
            <button className="btLogin">Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
