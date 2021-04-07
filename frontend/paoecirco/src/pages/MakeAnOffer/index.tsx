import React, { useEffect, useState, useCallback } from "react";
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

import { debug } from "console";
import ImageSlider from "../../components/Slider";
import Button from "../../components/Button";
import ModalReactDestaque from "../../components/ModalDestaque";
import ImageSliderAnuncio from "../../components/SliderAnuncio";

const AcceptOffer: React.FC = (props: any) => {
  const { id } = (props.location && props.location.state) || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleOpenModal() {
    setIsModalOpen(true);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
  }

  interface Ad {
    id: string;
    clienteId: string;
    titulo: string;
    foto1: string;
    foto2: string;
    foto3: string;
    nomeObjeto: string;
    categoria: string;
    estadoConservacao: string;
    itemDesejado: string;
    descricao: string;
    valorEstimado: number;
  }
  const [adData, setAdData] = useState<Ad>();

  interface Cliente {
    name: string,
    cidade: string,
    estado: string,
    nota: number,
    numTrocas: number,
  }
  const [clienteData, setClienteData] = useState<Cliente>();

  useEffect(() => {
    api.post(`/anuncioss/${id}`).then((response) => {
      setAdData(response.data);
    });
    api.post(`/clientess/${adData?.clienteId}`).then((response) => {
      setClienteData(response.data);
    });
  }, [adData, id]);

  const handleDelete = useCallback(async (data: any) => {
    await api.delete(`/anuncios/${data}`);
    alert("O anuncio foi apagado com sucesso");
  }, []);

  return (
    <>
      <Header />
      <ExternalContainer className="ExternalContainer">
        <ModalReactDestaque
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          id={adData?.id}
        />

        <ContainerFlexVertical className="VerticalContainerLeft">
          <h2> Informações do Anunciante </h2>

          <p> Nome: {clienteData?.name} </p>
          <p> Cidade: {clienteData?.cidade} </p>
          <p> Estado: {clienteData?.estado} </p>
          <p> Avaliação: {clienteData?.nota} </p>
          <p> Trocas concretizadas: {clienteData?.numTrocas} </p>
        </ContainerFlexVertical>

        <ContainerFlexVerticalWider className="VerticalContainerMiddle">
          <h1> {adData?.titulo} </h1>
          
          <ImageSliderAnuncio
            slides={[adData?.foto1, adData?.foto2, adData?.foto3]}
          ></ImageSliderAnuncio>

          <ContainerComments>
            <h2> Comentários </h2>
          </ContainerComments>
        </ContainerFlexVerticalWider>

        <ContainerFlexVertical className="VerticalContainerRight">
          <Button onClick={() => handleDelete(adData?.id)}>
            Encerrar anuncio
          </Button>

          <h2> Informações do anúncio </h2>
          <p> Objeto: {adData?.nomeObjeto} </p>
          <p> Categoria: {adData?.categoria} </p>
          <p> Estado: {adData?.estadoConservacao} </p>
          <p> Descricao: {adData?.descricao} </p>
          <p> Itens desejados em troca: {adData?.itemDesejado} </p>
          <p> Valor estimado: {adData?.valorEstimado} </p>

          <Button onClick={handleOpenModal}>Destacar</Button>
        </ContainerFlexVertical>
      </ExternalContainer>
      <ExibirPropaganda />
    </>
  );
};

//styles

export default AcceptOffer;
