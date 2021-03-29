import { FormHandles } from "@unform/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import api from "../../services/api";
import { AiFillStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { MdSubtitles } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
// import { Container, TituloDestaque, ContainerItemDestaque } from "./styles";
import {
  ExternalContainer,
  ContainerFlexVertical,
  ContainerFlexVerticalWider,
  ContainerComments,
} from "./styles";
import Header from "../../components/Header";
import ExibirPropaganda from "../../components/ExibirPropaganda";
import { debug } from "console";

const AcceptOffer: React.FC = (props /* ad id (?) */: any) => {
  
  const { id } = (props.location && props.location.state) || {};
  
  interface Ad {
    /* USER DATA
    nome,
    cidade,
    estado,
    avaliacao,
    numTrocas,
    */
    tituloAnuncio : string, /* imagens,*/
    objeto : string,
    categoria : string,
    estadoConservacao : string,
    descricao : string, 
    itensTroca : string,
    valorEstimado : number,
  };

  const [adData, setAdData] = useState<Ad>();

  useEffect(() => {
    api.post(`/anunciosss/${id}`).then((response) => {
      setAdData(response.data.anuncios);
    });
    // { /*api.post("usuarioss", adData.userId).then(()) ... */}
  }, []);

  return (
    <>
      <Header />
      <ExternalContainer className="ExternalContainer">
        <ContainerFlexVertical className="VerticalContainerLeft">
          <h2> Informações do Anunciante </h2>

          {/* Foto */}

          <p> Nome: {/***/} </p>
          <p> Cidade: {/*cidade*/} </p>
          <p> Estado: {/*estado*/} </p>
          <p> Avaliação: {/*avaliacao*/} </p>
          <p> Trocas concretizadas: {/*numTrocas*/} </p>
        </ContainerFlexVertical>

        <ContainerFlexVerticalWider className="VerticalContainerMiddle">
          <h1> {/*tituloAnuncio*/} </h1>
          {/* FOTO */}

          <ContainerComments>
            <h2> Comentários </h2>
          </ContainerComments>
        </ContainerFlexVerticalWider>

        <ContainerFlexVertical className="VerticalContainerRight">
          <h2> Informações do anúncio </h2>
          <p> Objeto: {adData?.objeto} </p>
          <p> Categoria: {/*categoria*/} </p>
          <p> Estado: {/*estadoConservacao*/} </p>
          <p> Descricao: {/*descricao*/} </p>
          <p> Itens desejados em troca: {/*itensTroca*/} </p>
          <p> Valor estimado: {/*valorEstimado*/} </p>
        </ContainerFlexVertical>
      </ExternalContainer>
      <ExibirPropaganda />
    </>
  );
};

//styles

export default AcceptOffer;
