import React, { useState } from "react";
import "./styles.css";
import Logo from "../../assets/logo.png";
import Avatar from "../../assets/avatar-mini.jpg";
import { FiSearch } from "react-icons/fi";

const Header: React.FC = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div id="app">
      <div className="header">
        <img src={Logo} alt="logo" className="logo" />
        <input
          type="text"
          placeholder="Buscar um anúncio ou um usuário..."
          className="inputText"
          id="input"
        ></input>
        <button className="iconContainer">
          <FiSearch />
        </button>
        {isLoggedIn ? (
          <div className="loggedContainer">
            <img src={Avatar} className="avatar" alt="avatar" />
            <button className="login">Quero anunciar</button>
          </div>
        ) : (
          <button className="login">Login</button>
        )}
      </div>
    </div>
  );
};

export default Header;
