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

const AcceptOffer: React.FC = (props: /* ad id (?) */ any) => {
  const { id } = (props.location && props.location.state) || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleOpenModal() {
    setIsModalOpen(true);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
  }

  interface Ad {
    /* USER DATA
    nome,
    cidade,
    estado,
    avaliacao,
    numTrocas,
    */

    id: string;
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

  useEffect(() => {
    api.post(`/anuncioss/${id}`).then((response) => {
      setAdData(response.data);
    });
    // { /*api.post("usuarioss", adData.userId).then(()) ... */}
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

          <ImageSliderAnuncio
            slides={[adData?.foto1, adData?.foto2, adData?.foto3]}
          ></ImageSliderAnuncio>

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
