import React, { useCallback, useRef, useState } from "react";
import "./styles.css";
import Logo from "../../assets/logo.png";
import Avatar from "../../assets/avatar-mini.jpg";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FormHandles } from "@unform/core";
import * as yup from "yup";
import api from "../../services/api";
import { Form } from "@unform/web";
import Input from "../Input";

interface StateBusca {
  name: string;
  titulo: string;
  avaliacao: string;
  cidade: string;
  estado: string;
}

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const formRef = useRef<FormHandles>(null);
  const [state, setState] = useState<StateBusca>({
    name: "",
    avaliacao: "",
    cidade: "",
    estado: "",
    titulo: "",
  });

  function handleLogout() {
    setIsLoggedIn(false);
  }

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          name: yup.string().required("Campo obrigatório"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        console.log(data);
        const resultado = await api.post("clientess", data);

        setState(resultado.data);
        console.log(state);
      } catch (err) {
        //se for um erro do yup, tipo não digitou senha, email inválido, etc
        if (err instanceof yup.ValidationError) {
          return;
        }
      }
    },
    [state]
  );

  return (
    <div className="header">
      <div className="ladoEsquerdo">
        <Link to="/">
          <img src={Logo} alt="logo" className="logo" />
        </Link>

        <div className="containerAleatorio">
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            className="containerAleatorio"
          >
            <Input
              type="text"
              icon={FiSearch}
              name="name"
              onSubmit={handleSubmit}
              placeholder="Buscar um anúncio ou um usuário..."
              className="inputText"
            ></Input>

            <button className="iconContainer" type="submit">
              <Link
                to={{
                  pathname: "/busca",
                  state: {
                    name: state.name,
                    avaliacao: state.avaliacao,
                    cidade: state.cidade,
                    estado: state.estado,
                  },
                }}
              >
                <FiSearch />
              </Link>
            </button>
          </Form>
        </div>
      </div>

      {isLoggedIn ? (
        <div className="loggedContainer">
          <img src={Avatar} className="avatar" alt="avatar" />
          <Link to="/destaques" className="destaques">
            DESTAQUES
          </Link>
          <Link to="/createexchangead" className="linkLogged">
            ANUNCIAR
          </Link>

          <Link to="/makeanoffer" className="link">
            <p> placeholder make an offer</p>
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
