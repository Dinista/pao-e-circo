import React, { useCallback, useRef } from "react";
import logo from "../../assets/logo.png";
import "./styles.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import ExibirPropaganda from "../../components/ExibirPropaganda";
import { FormHandles } from "@unform/core";
import api from "../../services/api";
import { Form } from "@unform/web";
import Input from "../../components/Input";

interface SignInFormData {
  email: string;
  senha: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          name: yup
            .string()
            .email("E-mail inválido.")
            .required("Insira um e-mail."),
          senha: yup.string().required("Insira a senha."),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const teste = await api.post("/login", data);
        if (teste.data.logou) {
          localStorage.setItem("loginid", teste.data.cliente[0].id);
          alert("Login efetuado com sucesso");
          history.push({
            pathname: "/perfil/" + localStorage.getItem("loginid"),
          });
        } else {
          const element = document.getElementById("errorLogin");
          if (element != null) {
            element.style.display = "flex";
          }
        }
      } catch (err) {
        const lista = { name: "", senha: "" }
        if (err instanceof yup.ValidationError) {
          err.inner.forEach(erro => {
            if (erro.path === "name") {
              lista["name"] = erro.message
            } else { lista["senha"] = erro.message }

          });
        }
        formRef.current?.setErrors(lista);
      }
    },
    [history]
  );

  return (
    <div className="signinContainer">
      <Link className="loginLogoContainer" to="/">
        <div>
          <img className="logoanim" src={logo} alt="logo" />
        </div>
      </Link>
      <Form className="Form" ref={formRef} onSubmit={handleSubmit}>
        <div className="inputLoginContainer">
          <div className="emailLoginInputContainer">
            <div id="errorLogin" className="ErrorLogin" >E-mail ou senha incorretos.</div>
            <div className="somaisumcontainerlogin">
              <FaEnvelope className="emailLoginIcon" />
              E-mail
            </div>
            <div className="Div-Input">
              <Input
                type="text"
                name="name"
                id="inputLogin"
                placeholder="exemplo@email.com"
                className="inputLoginSignin"
              />
            </div>
          </div>
        </div>

        <div className="inputLoginContainer">
          <div className="emailLoginInputContainer">
            <div className="somaisumcontainerlogin2">
              <FaLock className="senhaLoginIcon" />
              Senha
            </div>
            <div className="Div-Input">
              <Input
                type="password"
                name="senha"
                id="inputLogin"
                placeholder="•••••••••••"
                className="inputLogin"
              />
            </div>
          </div>
        </div>
        <div className= "btn-align"><button className="buttonLogin" name="submitButton" type="submit">
          Entrar
        </button></div>
      </Form>

      <Link to="/forgot" className="linkEsqueciASenha">
        Não consegue entrar?
      </Link>

      <Link to="/signup" className="linkSignupSignin">
        Não tem conta?
      </Link>
      <ExibirPropaganda />
    </div>
  );
};

export default SignIn;
