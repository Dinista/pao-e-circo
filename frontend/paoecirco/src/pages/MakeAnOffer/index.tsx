import React, { useEffect, useState } from "react";
import api from "../../services/api";
// import { Container, TituloDestaque, ContainerItemDestaque } from "./styles";
import {
  ExternalContainer,
  ContainerFlexVertical,
  ContainerFlexVerticalWider,
  ContainerComments,
} from "./styles";
import Header from "../../components/Header";
import ExibirPropaganda from "../../components/ExibirPropaganda";

const AcceptOffer: React.FC = (props: /* ad id (?) */ any) => {
  const { id } = (props.location && props.location.state) || {};

  interface Ad {
    /* USER DATA
    nome,
    cidade,
    estado,
    avaliacao,
    numTrocas,
    */
    titulo: string /* imagens,*/;
    nomeObjeto: string;
    categoria: string;
    estadoConservacao: string;
    itemDesejado: string;
    descricao: string;
    valorEstimado: number;
  }

  const [adData, setAdData] = useState<Ad>();

  useEffect(() => {
    api.post(`/anuncioss/${id}`).then((response) => {
      console.log(response.data);
      setAdData(response.data);
      console.log(adData);
    });
    // { /*api.post("usuarioss", adData.userId).then(()) ... */}
  }, [adData, id]);

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
          <h1> {adData?.titulo} </h1>
          {/* FOTO */}

          <ContainerComments>
            <h2> Comentários </h2>
          </ContainerComments>
        </ContainerFlexVerticalWider>

        <ContainerFlexVertical className="VerticalContainerRight">
          <h2> Informações do anúncio </h2>
          <p> Objeto: {adData?.nomeObjeto} </p>
          <p> Categoria: {adData?.categoria} </p>
          <p> Estado: {adData?.estadoConservacao} </p>
          <p> Descricao: {adData?.descricao} </p>
          <p> Itens desejados em troca: {adData?.itemDesejado} </p>
          <p> Valor estimado: {adData?.valorEstimado} </p>
        </ContainerFlexVertical>
      </ExternalContainer>
      <ExibirPropaganda />
    </>
  );
};

//styles

export default AcceptOffer;
