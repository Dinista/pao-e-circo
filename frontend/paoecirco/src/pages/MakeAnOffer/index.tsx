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

import Button from "../../components/Button";
import ModalReactDestaque from "../../components/ModalDestaque";
import ModalReactRealizarOferta from "../../components/ModalRealizarOferta";
import ImageSliderAnuncio from "../../components/SliderAnuncio";
import Cliente from "../../../../../backend/src/models/Cliente";
import ModalReactDenuncia from "../../components/ModalDenuncia";

const AcceptOffer: React.FC = (props: any) => {
  const { id } = (props.location && props.location.state);

  const [isModalDestaqueOpen, setIsModalDestaqueOpen] = useState(false);
  function handleOpenModalDestaque() {
    setIsModalDestaqueOpen(true);
  }
  function handleCloseModalDestaque() {
    setIsModalDestaqueOpen(false);
  }

  const [isModalRealizarOfertaOpen, setIsModalRealizarOfertaOpen] = useState(false);
  function handleOpenModalRealizarOferta() {
    setIsModalRealizarOfertaOpen(true);
  }
  function handleCloseModalRealizarOferta() {
    setIsModalRealizarOfertaOpen(false);
  }

  const [isModalDenunciaOpen, setIsModalDenunciaOpen] = useState(false);
  function handleOpenModalDenuncia() {
    setIsModalDenunciaOpen(true);
  }
  function handleCloseModalDenuncia() {
    setIsModalDenunciaOpen(false);
  }

  interface Ad {
    id: string;
    cliente: Cliente;
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
      setEhDonoAnuncio(localStorage.getItem("loginid" || "") == adData?.cliente.id);
    });
  }, [adData, id]);

  const handleDelete = useCallback(async (data: any) => {
    await api.delete(`/anuncios/${data}`);
    alert("O anuncio foi apagado com sucesso");
  }, []);

  const [ehDonoAnuncio, setEhDonoAnuncio] = useState<boolean | undefined>();

  return (
    <>
      <Header />
      
      <ExternalContainer className="ExternalContainer">
        <ModalReactDestaque
          isOpen={isModalDestaqueOpen}
          onRequestClose={handleCloseModalDestaque}
          id={adData?.id}
        />

        <ModalReactRealizarOferta
          isOpen={isModalRealizarOfertaOpen}
          onRequestClose={handleCloseModalRealizarOferta}
          id={localStorage.getItem("loginid" || "")}
        />

        <ModalReactDenuncia
          isOpen={isModalDenunciaOpen}
          onRequestClose={handleCloseModalDenuncia}
          idDenunciante={localStorage.getItem("loginid" || "")}
          idAnuncio={adData?.id}
        />
        
        <ContainerFlexVertical className="VerticalContainerLeft">
          <h2> Informações do Anunciante </h2>
          
          <p> Nome: {adData?.cliente.name} </p>
          <p> Cidade: {adData?.cliente.cidade} </p>
          <p> Estado: {adData?.cliente.estado} </p>
          <p> Avaliação: {adData?.cliente.nota} </p>
          <p> Trocas concretizadas: {adData?.cliente.numTrocas} </p>
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
          {ehDonoAnuncio ? ( 
            <div>
              <Button onClick={() => handleDelete(adData?.id)}>
                Encerrar anuncio
              </Button> 
              <Button onClick={handleOpenModalDestaque}>Destacar</Button>
            </div>
            ) : (
              <>
                <Button onClick={handleOpenModalRealizarOferta}>Oferecer item</Button>
                <Button onClick={handleOpenModalDenuncia}>Denunciar anúncio</Button>
              </>
          )}
          

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
