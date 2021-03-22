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
  const { nome, cidade, estado, avaliacao, numTrocas, tituloAnuncio /*, imagens*/, objeto, categoria, estadoConservacao, descricao, itensTroca, valorEstimado } =
    (props.location && props.location.state) || {};

  return (
    <>
      <Header />
      
      <ExternalContainer className="ExternalContainer">
        <ContainerFlexVertical className = "VerticalContainerLeft">
          <h2> Informações do Anunciante </h2>

          {/* Foto */}

          <p> Nome: {nome} </p>
          <p> Cidade: {cidade} </p>
          <p> Estado: {estado} </p>
          <p> Avaliação: {avaliacao} </p>
          <p> Trocas concretizadas: {numTrocas} </p>
        </ContainerFlexVertical>

        <ContainerFlexVerticalWider className = "VerticalContainerMiddle">
          <h1> {tituloAnuncio} </h1>
          {/* FOTO */ } 

          <ContainerComments>
            <h2> Comentários </h2>
            

          </ContainerComments>

        </ContainerFlexVerticalWider>

        <ContainerFlexVertical className = "VerticalContainerRight">
          <h2> Informações do anúncio </h2>
          <p> Objeto: {objeto} </p>
          <p> Categoria: {categoria} </p>
          <p> Estado: {estadoConservacao} </p>
          <p> Descricao: {descricao} </p>
          <p> Itens desejados em troca: {itensTroca} </p>
          <p> Valor estimado: {valorEstimado} </p>
        </ContainerFlexVertical>
      </ExternalContainer>
    </>
  );
};

//styles

export default AcceptOffer;
