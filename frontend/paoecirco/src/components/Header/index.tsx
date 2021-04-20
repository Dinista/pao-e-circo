import React, { useCallback, useRef, useState } from "react";
import "./styles.css";
import Logo from "../../assets/logo.png";
import Avatar from "../../assets/avatar-default.jpg";
import { FiSearch } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { FormHandles } from "@unform/core";
import * as yup from "yup";
import api from "../../services/api";
import { Form } from "@unform/web";
import Input from "../Input";
import Dropdown from "../DropDownNotificacao";

interface StateBuscaUsuario {
  name: string;
  titulo: string;
  avaliacao: string;
  cidade: string;
  estado: string;
}

interface StateBuscaAnuncio {
  titulo: string;
  valorEstimado: string;
  foto1: string;
  descricao: string;
  itemDesejado: string;
  clienteId: string;
}

const Header: React.FC = () => {
  const history = useHistory();
  const loginId = localStorage.getItem("loginid") || "";

  const propsValid = (loginId: any) => {
    if (loginId === "") return false;
    else return true;
  };

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(
    propsValid(loginId) ? true : false
  );

  const formRef = useRef<FormHandles>(null);
  const formRef1 = useRef<FormHandles>(null);

  const [stateUsuario, setStateUsuario] = useState<StateBuscaUsuario>({
    name: "",
    avaliacao: "",
    cidade: "",
    estado: "",
    titulo: "",
  });

  const [stateAnuncio, setStateAnuncio] = useState<StateBuscaAnuncio>({
    titulo: "",
    descricao: "",
    foto1: "",
    valorEstimado: "",
    itemDesejado: "",
    clienteId: "flavin do pneu",
  });

  function handleLogout() {
    localStorage.removeItem("loginid");
    setIsLoggedIn(false);
    window.location.reload()
  }

  interface NameFormData {
    anuncio: string;
  }

  const handleSubmitUsuario = useCallback(async (data: NameFormData) => {
    try {
      formRef1.current?.setErrors({});
      const schema = yup.object().shape({
        name: yup.string().required("Campo obrigatório"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const resultado = await api.post("findbynameusuario", data);

      history.push({
        pathname: "/buscausuario",
        state: {
          foto:
            "https://www.ahnegao.com.br/wp-content/uploads/2015/04/capa.jpg",
          nome: resultado.data[0].name,
          cidade: resultado.data[0].cidade,
          id: resultado.data[0].id,
          estado: resultado.data[0].estado,
        },
      });
    } catch (err) {
      //se for um erro do yup, tipo não digitou senha, email inválido, etc
      if (err instanceof yup.ValidationError) {
        return;
      }
    }
  }, []);

  interface AnuncioFormData {
    anuncio: string;
  }

  const handleSubmitAnuncio = useCallback(async (data: AnuncioFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = yup.object().shape({
        anuncio: yup.string().required("Campo obrigatório"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const resultado = await api.post("/findbyname", data);
      const dono = await api.post(
        `/findclientebyid/${resultado.data[0].clienteId}`
      );

      history.push({
        pathname: "/buscaanuncio",
        state: {
          foto1: resultado.data[0].foto1,
          id: resultado.data[0].id,
          descricao: resultado.data[0].descricao,
          titulo: resultado.data[0].titulo,
          anunciante: dono.data[0].name,
          itemDesejado: resultado.data[0].itemDesejado,
          valorEstimado: resultado.data[0].valorEstimado,
        },
      });
    } catch (err) {
      //se for um erro do yup, tipo não digitou senha, email inválido, etc
      if (err instanceof yup.ValidationError) {
        return;
      }
    }
  }, []);

  return (
    <div className="header">
      <div className="ladoEsquerdo">
        <Link to="/">
          <img src={Logo} alt="logo" className="logo" />
        </Link>

        <div className="containerAleatorio">
          <Form
            ref={formRef1}
            onSubmit={handleSubmitUsuario}
            className="containerAleatorio"
          >
            <Input
              type="text"
              icon={FiSearch}
              name="name"
              onSubmit={() => handleSubmitUsuario}
              placeholder="Buscar um usuário..."
              className="inputText"
            ></Input>

            <button className="iconContainer" type="submit" name="submitButton">
              Buscar usuário
            </button>
          </Form>
          <Form
            ref={formRef}
            onSubmit={handleSubmitAnuncio}
            className="containerAleatorio"
          >
            <Input
              type="text"
              icon={FiSearch}
              name="anuncio"
              onSubmit={() => handleSubmitAnuncio}
              placeholder="Buscar um anúncio..."
              className="inputText"
            ></Input>
            <button className="iconContainer" type="submit" name="submitButton">
              Buscar anúncio
            </button>
          </Form>
        </div>
      </div>

      {isLoggedIn ? (
        <div className="loggedContainer">
          <Link to={{ pathname: `/perfil/${loginId}`, state: { id: loginId } }}>
            <img src={Avatar} className="avatar" alt="avatar" />
          </Link>

          <Link to="/destaques" className="destaques">
            DESTAQUES
          </Link>
          <Link to="/createexchangead" className="linkLogged">
            ANUNCIAR
          </Link>
          <Dropdown />

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
