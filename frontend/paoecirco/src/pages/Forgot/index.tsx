import Header from "../../components/Header";
import "./styles.css";
import logo from "../../assets/logo.png";
import { Link, useHistory } from "react-router-dom";
import {FaEnvelope } from "react-icons/fa"
import React, { useState } from "react";
import api from "../../services/api";
import {AiFillCheckCircle , AiFillCloseCircle} from "react-icons/ai";


const Esqueceu: React.FC = () => {
  const [email, setEmail] = useState() as any;

  async function Submit(event) {
    event.preventDefault();
    const a = document.getElementById('iput-forgot') as any;
    const response = await api.get(`/findByemail/${a.value}`)
    console.log(response)
    if (response.data.passou) {
      setEmail(<div className="msg-envio-div"><AiFillCheckCircle className="msg-envio-icon"/><div className="msg-envio">Um e-mail de redefinição de senha foi enviado para: <b>{a.value}</b></div></div>)
    }else{
      setEmail(<div className="erro-msg-envio"><AiFillCloseCircle className="erro-msg-envio-icon"/><div><b>{response.data.erro}</b> Tente novamente.</div></div>)
    }
  }

  return (
    <div className="Forgot-container">
      <Link className="loginLogoContainer" to="/">
        <div>
          <img className="logoanim" src={logo} alt="logo" />
        </div>
      </Link>
      <div className="Forgot-Content">
        {email}
        <h4>Informe seu e-mail, para redefinir sua senha:</h4>
        <form className="form-forgot" onSubmit={Submit}>
          <label htmlFor="email"><FaEnvelope />  E-mail</label>
          <input id="iput-forgot" type="email" name="email" placeholder="E-mail" required />
          <button className="buttonLogin" type="submit">enviar</button>
          <Link to="/signin" style={{marginTop : "25px", alignSelf:"center", color:"rgb(179, 130, 9)"}}>Voltar</Link>
        </form>
      </div>
    </div>
  );
};

export default Esqueceu;