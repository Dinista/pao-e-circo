import { FormHandles } from "@unform/core";
import React, { useCallback, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { MdSubtitles } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { Container, TituloDestaque, ContainerItemDestaque } from "./styles";
import Header from "../../components/Header";

const BuscaUsuario: React.FC = (props: any) => {
  const { image, name, avaliacao, cidade, estado } =
    (props.location && props.location.state) || {};

  return (
    <>
      <Header />

      <Container>
        <TituloDestaque>RESULTADOS DA BUSCA</TituloDestaque>
        {
          <div>
            <ContainerItemDestaque>
              <img src={image} alt="dataimg" className="cardAvatar" />
              <div className="container2">
                <p className="descricaoCardContainer">{name}</p>
                <div className="vendedorContainer">
                  <BsPersonFill className="iconePessoa" /> Vendedor: {name}
                </div>
                <div className="avaliacaoContainer">
                  <AiFillStar className="iconeEstrela" /> Avaliação: {avaliacao}
                </div>
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
    </>
  );
};

//styles

export default BuscaUsuario;
