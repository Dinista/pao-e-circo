import React, { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { MdAttachMoney, MdDescription } from "react-icons/md";
import {
  Container,
  TituloDestaque,
  ContainerItemDestaque,
  ImageContainer,
} from "./styles";
import Header from "../../components/Header";
import ExibirPropaganda from "../../components/ExibirPropaganda";
import api from "../../services/api";
import { Link } from "react-router-dom";

const BuscaAnuncio: React.FC = (props: any) => {
  const {
    titulo,
    valorEstimado,
    itemDesejado,
    anunciante,
    foto1,
    descricao,
    id,
  } = (props.location && props.location.state) || {};

  console.log(id);

  var identificacao: string = id;

  console.log("id: " + identificacao);
  return (
    <>
      <Header />

      <Container>
        <TituloDestaque>RESULTADOS DA BUSCA</TituloDestaque>
        {
          <div>
            <ContainerItemDestaque>
              <ImageContainer
                src={foto1}
                alt="dataimg"
                className="cardAvatar"
              />
              <div className="container2">
                <Link
                  className="linkContainerDestaques"
                  to={{
                    pathname: "/makeanoffer",
                    state: {
                      id: identificacao,
                    },
                  }}
                >
                  <h1 className="descricaoCardContainer">{titulo}</h1>
                </Link>

                <div className="avaliacaoContainer">
                  <MdDescription className="iconeEstrela" /> Valor estimado:{" "}
                  {descricao}
                </div>
                <div className="vendedorContainer">
                  <BsPersonFill className="iconePessoa" /> Vendedor:{" "}
                  {anunciante}
                </div>
                <div className="avaliacaoContainer">
                  <AiFillStar className="iconeEstrela" /> Item desejado:{" "}
                  {itemDesejado}
                </div>
                <div className="avaliacaoContainer">
                  <MdAttachMoney className="iconeEstrela" /> Valor estimado:{" "}
                  {valorEstimado}
                </div>
              </div>
            </ContainerItemDestaque>
            <ExibirPropaganda />
          </div>
        }
      </Container>
    </>
  );
};

export default BuscaAnuncio;
