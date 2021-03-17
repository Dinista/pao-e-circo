import { FormHandles } from "@unform/core";
import React, { useCallback, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { MdSubtitles } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
// import { Container, TituloDestaque, ContainerItemDestaque } from "./styles";
import { ExternalContainer, ContainerFlexVertical, ContainerFlexVerticalWider, ContainerComments } from "./styles";
import Header from "../../components/Header";

const AcceptOffer: React.FC = (props: any) => {
  const { image, name, avaliacao, cidade, estado } =
    (props.location && props.location.state) || {};

  return (
    <>
      <Header />
      
      <ExternalContainer className="ExternalContainer">
        <ContainerFlexVertical className = "VerticalContainerLeft">
          <h2> Informações do Anunciante </h2>

          {/* Foto */}

          <p> Nome: </p>
          <p> Cidade: </p>
          <p> Avaliação: </p>
          <p> Trocas concretizadas: </p>
        </ContainerFlexVertical>

        <ContainerFlexVerticalWider className = "VerticalContainerMiddle">
          <h1> TITULO ANUNCIO {/* Título do anúncio */} </h1>
          {/* FOTO */ } 

          <ContainerComments>
            <h2> Comentários </h2>
            

          </ContainerComments>

        </ContainerFlexVerticalWider>

        <ContainerFlexVertical className = "VerticalContainerRight">
          <h2> Informações do anúncio </h2>
          <p> Objeto: </p>
          <p> Categoria: </p>
          <p> Estado: </p>
          <p> Descricao: </p>
          <p> Itens desejados em troca: </p>
          <p> Valor estimado: </p>
        </ContainerFlexVertical>
      </ExternalContainer>
      {/*
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
      */}
    </>
  );
};

//styles

export default AcceptOffer;
