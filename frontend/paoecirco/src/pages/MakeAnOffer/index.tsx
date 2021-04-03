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

import { debug } from "console";
import ImageSlider from "../../components/Slider";
import Button from "../../components/Button";

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

    id: string, 
    titulo: string, 
    foto1: string;
    foto2: string;
    foto3: string; 
    nomeObjeto: string,
    categoria: string,
    estadoConservacao: string,
    itemDesejado: string,
    descricao: string, 
    valorEstimado: number,
  };
  const [adData, setAdData] = useState<Ad>();

  useEffect(() => {
    api.post(`/anuncioss/${id}`).then((response) => {
      console.log(response.data);
      setAdData(response.data);
      console.log(adData);
    });
    // { /*api.post("usuarioss", adData.userId).then(()) ... */}
  }, [adData, id]);

  {/* Ainda não funciona */}
  const handleDelete = useCallback(async (data: any) => {
    await api.delete(`/anuncios/${data}`);
    alert("O anuncio foi apagado com sucesso");
    /*
    setAdData((oldAd) =>
      oldAd.filter((ad) => ad.id !== data)
    );
    */
  }, []);
  {/* Ainda não funciona */}



  return (
    <>
      <Header />
      <ExternalContainer className="ExternalContainer">
        <ContainerFlexVertical className="VerticalContainerLeft">
          <h2> Informações do Anunciante </h2>

          <ImageSlider slides={[adData?.foto1, adData?.foto2, adData?.foto3]}></ImageSlider>

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

          {/* Ainda não funciona */}
          <Button onClick={() => handleDelete(adData?.id)}>
                  Encerrar anuncio
          </Button>
          {/* Ainda não funciona */}
          
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
