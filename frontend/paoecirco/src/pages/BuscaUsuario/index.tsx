import { FormHandles } from "@unform/core";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Container, TituloDestaque, ContainerItemDestaque } from "./styles";
import Header from "../../components/Header";
import ExibirPropaganda from "../../components/ExibirPropaganda";
import { Link } from "react-router-dom";

const BuscaUsuario: React.FC = (props: any) => {
  const { foto, nome, cidade, estado, id } =
    (props.location && props.location.state) || {};

  return (
    <>
      <Header />

      <Container>
        <TituloDestaque>RESULTADOS DA BUSCA</TituloDestaque>
        {
          <div>
            <ContainerItemDestaque>
              <img src={foto} alt="dataimg" className="cardAvatar" />
              <div className="container2">
                <Link
                  className="linkContainerDestaques"
                  to={{
                    pathname: `/perfil/${id}`,
                    state: {
                      id: id,
                    },
                  }}
                >
                  <h1 className="descricaoCardContainer">{nome} </h1>
                </Link>

                <div className="avaliacaoContainer">
                  <AiFillStar className="iconeEstrela" /> Cidade: {cidade}
                </div>
                <div className="avaliacaoContainer">
                  <AiFillStar className="iconeEstrela" /> Estado: {estado}
                </div>
              </div>
            </ContainerItemDestaque>
          </div>
        }
      </Container>
      <ExibirPropaganda />
    </>
  );
};

//styles

export default BuscaUsuario;
