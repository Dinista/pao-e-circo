import React, { useEffect, useState, useCallback, useRef } from "react";
import api from "../../services/api";
import {
  ExternalContainer,
  ContainerFlexVertical,
  ContainerFlexVerticalWider,
  ContainerComments,
  SliderBox,
  StyledButton,
  StyledButtonWider,
  ContainerComment,
  TextoComentario,
  DataComentario,
} from "./styles";

import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import ExibirPropaganda from "../../components/ExibirPropaganda";
import ModalReactDestaque from "../../components/ModalDestaque";
import ModalReactRealizarOferta from "../../components/ModalRealizarOferta";
import ModalReactAjudaOnline from "../../components/ModalAjudaOnline";
import ModalReactExcluirAnuncio from "../../components/ModalExcluirAnuncio";
import ImageSliderAnuncio from "../../components/SliderAnuncio";
import Cliente from "../../../../../backend/src/models/Cliente";
import ModalReactDenuncia from "../../components/ModalDenuncia";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";
import SubText from "../../components/Subtext";
import Input from "../../components/Input";
import { FiAlignJustify } from "react-icons/fi";
import InvisibleInput from "../../components/InvisibleInput";


const Oferta: React.FC = (props: any) => {
  const { id } = props.location && props.location.state;
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [ehDonoAnuncio, setEhDonoAnuncio] = useState<boolean | undefined>();
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>();
  
  // const [ehSeguidor, setEhSeguidor] = useState<boolean | undefined>();

  const [isModalDestaqueOpen, setIsModalDestaqueOpen] = useState(false);
  function handleOpenModalDestaque() {
    setIsModalDestaqueOpen(true);
  }
  function handleCloseModalDestaque() {
    setIsModalDestaqueOpen(false);
  }

  const [isModalRealizarOfertaOpen, setIsModalRealizarOfertaOpen] = useState(
    false
  );
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

  const [isModalAjudaOnlineOpen, setIsModalAjudaOnlineOpen] = useState(false);
  function handleOpenModalAjudaOnline() {
    setIsModalAjudaOnlineOpen(true);
  }
  function handleCloseModalAjudaOnline() {
    setIsModalAjudaOnlineOpen(false);
  }

  const [isModalExcluirAnuncioOpen, setIsModalExcluirAnuncioOpen] = useState(
    false
  );
  function handleOpenModalExcluirAnuncio() {
    setIsModalExcluirAnuncioOpen(true);
  }
  function handleCloseModalExcluirAnuncio() {
    setIsModalExcluirAnuncioOpen(false);
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

  interface Comentario {
    id?: string;
    anuncio: string;
    texto: string;
    comentador: Cliente | undefined;
    data: Date;
    nomeComentador: string;
  }
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  useEffect(() => {
    api.post(`/anuncioss/${id}`).then((response) => {
      setAdData(response.data);
      setEhDonoAnuncio(
        localStorage.getItem("loginid" || "") === adData?.cliente.id
      );
    });
  }, []);


  // useEffect(() => {    
  //   if(localStorage.getItem("loginid" || "") == "") {
  //     setIsLoggedIn(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   api.post("/verificaseguidor", data);
  // }, [id])

  useEffect(() => {
    api.post(`/encontrarcomentariosanuncio/${id}`).then((response) => {
      if (response.data[0] !== undefined) {
        setComentarios(response.data[0].comentarios);
      }
    });
  }, [id]);

  const handleSeguirAnuncio = useCallback(async (data: any) => {
    
    console.log(localStorage.getItem("loginid"))
    
    if(localStorage.getItem("loginid") == null) {
      alert("Para seguir um anúncio é necessário fazer login!");
      history.push("/signin");
    }

    api.post("/verificaseguidor", data).then((response) => {
      if (response.data == "") {
        console.log("Não seguia!");
        // nao segue, então insere na lista de seguidores!
        api.put("/seguir", data);
      } else {
        console.log("Seguia!");
        api.put("/deixardeseguir", data);
      }
    });
  }, []);

  const handleCommentSubmit = useCallback(
    async (data: Comentario) => {
      try {
        const cliente = localStorage.getItem("loginid") || "";
        if (cliente === "") {
          alert("Para comentar em um anuncio é necessário logar!");
          history.push("/signin");
        }
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          texto: yup
            .string()
            .min(5, "O comentário deve ter pelo menos 5 caracteres.")
            .required("Campo obrigatório."),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        data.data = new Date();

        let objClienteLogado = await api.post(`/findclientebyid/${cliente}`);
        data.comentador = objClienteLogado.data[0];

        await api.post("/comentar", data);

        alert("Comentario realizado com successo!");
        history.push("/");
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
      }
    },
    [history]
  );
  return (
    <>
      <Header />
      <ExternalContainer className="ExternalContainer">
        <ModalReactDestaque
          isOpen={isModalDestaqueOpen}
          onRequestClose={handleCloseModalDestaque}
          id={adData?.id}
        />

        <ModalReactAjudaOnline
          isOpen={isModalAjudaOnlineOpen}
          onRequestClose={handleCloseModalAjudaOnline}
        />

        <ModalReactRealizarOferta
          isOpen={isModalRealizarOfertaOpen}
          onRequestClose={handleCloseModalRealizarOferta}
          ofertante={localStorage.getItem("loginid" || "")}
          anuncio={id}
          texto="bora trocar aí po"
        />

        <ModalReactDenuncia
          isOpen={isModalDenunciaOpen}
          onRequestClose={handleCloseModalDenuncia}
          idDenunciante={localStorage.getItem("loginid" || "")}
          idAnuncio={adData?.id}
        />

        <ModalReactExcluirAnuncio
          isOpen={isModalExcluirAnuncioOpen}
          onRequestClose={handleCloseModalExcluirAnuncio}
          idAnuncio={adData?.id}
        />

        <ContainerFlexVertical className="VerticalContainerLeft">
          <h2> Informações do Anunciante </h2>

          <p> <b>Nome:</b> {adData?.cliente.name} </p>
          <p> <b>Cidade:</b> {adData?.cliente.cidade} </p>
          <p> <b>Estado:</b> {adData?.cliente.estado} </p>
          <p> <b>Avaliação</b>: {adData?.cliente.nota} </p>
          <p> <b>Trocas concretizadas</b>: {adData?.cliente.numTrocas} </p>
        </ContainerFlexVertical>

        <ContainerFlexVerticalWider className="VerticalContainerMiddle">
          <h1> {adData?.titulo} </h1>
          <SliderBox> 
            <ImageSliderAnuncio
              slides={[adData?.foto1, adData?.foto2, adData?.foto3]}
            ></ImageSliderAnuncio>
          </SliderBox>

        </ContainerFlexVerticalWider>

        <ContainerFlexVertical className="VerticalContainerRight">
          <h2> Informações do anúncio </h2>
          <p> <b>Objeto:</b> {adData?.nomeObjeto} </p>
          <p> <b>Categoria:</b> {adData?.categoria} </p>
          <p> <b>Estado:</b> {adData?.estadoConservacao} </p>
          <p> <b>Descricao:</b> {adData?.descricao} </p>
          <p> <b>Itens desejados em troca:</b> {adData?.itemDesejado} </p>
          <p> <b>Valor estimado:</b> {adData?.valorEstimado} </p>
          
          {ehDonoAnuncio ? (
            <div>
              <StyledButton onClick={handleOpenModalExcluirAnuncio}>Encerrar anuncio</StyledButton>

              <StyledButton onClick={handleOpenModalDestaque}>Destacar</StyledButton>

              <Link
                to={{
                  pathname: "/editaranuncio",
                  state: { idAnuncio: adData?.id },
                }}
                className="linkContainer"
              >
                <StyledButton>Editar anúncio</StyledButton>
              </Link>
            </div>
          ) : (
            <>
              <StyledButton onClick={handleOpenModalRealizarOferta}>
                Oferecer item
              </StyledButton>

              <StyledButton onClick={handleOpenModalAjudaOnline}>
                Ajuda
              </StyledButton>

              <StyledButton
                onClick={() =>
                  handleSeguirAnuncio({
                    idAnuncio: adData?.id,
                    idCliente: localStorage.getItem("loginid"),
                  })
                }
              >
                Seguir anúncio
              </StyledButton>

              <StyledButton onClick={handleOpenModalDenuncia}>
                Denunciar anúncio
              </StyledButton>
            </>
          )}

          
        </ContainerFlexVertical>
      </ExternalContainer>

      <ContainerComments>
            <h2> Comentários </h2>
            {comentarios.map((comentario) => (
              <ContainerComment> 
                <div key={comentario.id}>
                  <p><b>{comentario.comentador?.name}</b></p>
                  <DataComentario>{comentario.data}</DataComentario>
                  <TextoComentario>{comentario.texto}</TextoComentario>
                </div>
              </ContainerComment>
            ))}
            {ehDonoAnuncio ? (
              <Form ref={formRef} onSubmit={handleCommentSubmit}>
                <Input
                  name="texto"
                  icon={FiAlignJustify}
                  placeholder=" Ex: 'Ele é pesado?'"
                ></Input>
                <SubText text="Comente ou responda dúvidas sobre seu anuncio. Pelo menos 5 caracteres." /> <br/>

                <InvisibleInput
                  name="anuncio"
                  defaultValue={adData?.id}
                ></InvisibleInput>

                <StyledButtonWider name="submitButton" type="submit">
                  Enviar comentário
                </StyledButtonWider>
              </Form>
            ) : (
              <Form ref={formRef} onSubmit={handleCommentSubmit}>
                <Input
                  name="texto"
                  icon={FiAlignJustify}
                  placeholder=" Ex: 'Ele é pesado?'"
                ></Input>

                <SubText text="Caso deseje, faça um comentário. Pelo menos 5 caracteres." /> <br/>
                
                <InvisibleInput
                  name="anuncio"
                  defaultValue={adData?.id}
                ></InvisibleInput>

                <StyledButtonWider name="submitButton" type="submit">
                  Enviar comentário
                </StyledButtonWider>
              </Form>
            )}
      </ContainerComments>
      <ExibirPropaganda/>
    </>
  );
};

export default Oferta;