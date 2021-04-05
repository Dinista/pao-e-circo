import React, { useCallback, useRef } from "react";
import logo from "../../assets/logo.png";
import "./styles.css";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
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
          name: yup.string(),
          senha: yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const teste = await api.post("/login", data);
        if (teste.data.logou) {
          alert("Login efetuado com sucesso");
          history.push({
            pathname: "/",
            state: {
              logado: teste.data.logou,
              id: teste.data.cliente[0].id,
            },
          });
        } else alert("Usuário ou senha incorretos");
      } catch (err) {
        console.log("errozao!");

        //se for um erro do yup, tipo não digitou senha, email inválido, etc

        if (err instanceof yup.ValidationError) {
          return;
        }
      }
    },
    [history]
  );

  return (
    <div className="signinContainer">
      <Link className="loginLogoContainer" to="/">
        <div>
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className="inputLoginContainer">
          <div className="emailLoginInputContainer">
            <div className="somaisumcontainerlogin">
              <AiOutlineMail className="emailLoginIcon" />
              E-mail
            </div>

            <Input
              type="text"
              name="email"
              id="inputLogin"
              placeholder="exemplo@email.com"
              className="inputLoginSignin"
            />
          </div>
        </div>

        <div className="inputLoginContainer">
          <div className="emailLoginInputContainer">
            <div className="somaisumcontainerlogin2">
              <AiFillLock className="senhaLoginIcon" />
              Senha
            </div>

            <Input
              type="password"
              name="senha"
              id="inputLogin"
              placeholder="•••••••••••"
              className="inputLogin"
            />
          </div>
          <button className="buttonLogin" name="submitButton" type="submit">
            Entrar
          </button>
        </div>
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
