import React, { useEffect, useState, useCallback, useRef, InputHTMLAttributes } from "react";
import api from "../../services/api";
// import { Container, TituloDestaque, ContainerItemDestaque } from "./styles";
import {
  ExternalContainer,
  ContainerFlexVertical,
  ContainerFlexVerticalWider,
  ContainerComments,
} from "./styles";

import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import ExibirPropaganda from "../../components/ExibirPropaganda";
import Button from "../../components/Button";
import ModalReactDestaque from "../../components/ModalDestaque";
import ModalReactRealizarOferta from "../../components/ModalRealizarOferta";
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
import { ButtonStyled } from "../CriarAnuncio/styles";

const Oferta: React.FC = (props: any) => {
  const { id } = (props.location && props.location.state);
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [ehDonoAnuncio, setEhDonoAnuncio] = useState<boolean | undefined>();


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

  interface Comentario {
    id?: string; 
    anuncio: string,
    texto: string,
    comentador: Cliente | undefined;
    data: Date;
    nomeComentador: string;
  }
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  interface ClienteLogado { 
    ClienteObj: Cliente;
  }
  const [clienteLogado, setClienteLogado] = useState<ClienteLogado>();


  useEffect(() => {
    api.post(`/anuncioss/${id}`).then((response) => {
      setAdData(response.data);
      setEhDonoAnuncio(localStorage.getItem("loginid" || "") == adData?.cliente.id);
    });
  }, [id]);
  
  useEffect(() => {
    api.post(`/encontrarcomentariosanuncio/${id}`).then((response) => {
      setComentarios(response.data[0].comentarios);    
    });

  }, []);

  const handleDelete = useCallback(async (data: any) => {
    await api.delete(`/anuncios/${data}`);
    alert("O anuncio foi apagado com sucesso");
  }, []);

  const handleSeguirAnuncio = useCallback(async (data: any) => {
    const segue = await api.post("/verificaseguidor", data);
    console.log("SEGUE: " + segue);

    if(segue.data == "") { // nao segue, então insere na lista de seguidores!
      await api.put("/seguir", data);
    } else {
      await api.put("/deixardeseguir", data)
    }
    
  }, []);

  const handleCommentSubmit = useCallback(
    async (data: Comentario) => {
      try {
        const cliente = localStorage.getItem("loginid") || "";
        if(cliente == "") {
          alert("Para comentar em um anuncio é necessário logar");
          history.push("/signin");
        }
        formRef.current?.setErrors({});
        
        const schema = yup.object().shape({
          texto: yup.string().min(5, "O comentário deve ter pelo menos 5 caracteres.").required("Campo obrigatório.")
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
        if(err instanceof yup.ValidationError) {
          console.log(err)
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
            {/* MAP*/}
            {comentarios.map((comentario) => (
              <div key={comentario.texto}>
                <p>{comentario.comentador?.name}</p>
                <p>{comentario.data}</p>
                <p>{comentario.texto}</p>
                </div>
            ))}


          </ContainerComments>
        </ContainerFlexVerticalWider>

        <ContainerFlexVertical className="VerticalContainerRight">
          {ehDonoAnuncio ? ( 
            <div>
              <Button onClick={() => handleDelete(adData?.id)}>
                Encerrar anuncio
              </Button> 
              <Button onClick={handleOpenModalDestaque}>Destacar</Button>

              <Link to={{ pathname: "/editaranuncio", state: { idAnuncio: adData?.id }, }} className="linkContainer">
                <Button>Editar anúncio</Button>

              </Link>
            </div>
            ) : (
              <>
                <Button onClick={handleOpenModalRealizarOferta}>Oferecer item</Button>
                
                <Button onClick={() => handleSeguirAnuncio({idAnuncio: adData?.id, idCliente: localStorage.getItem("loginid" || "")})}>Seguir anúncio</Button>

                <Button onClick={handleOpenModalDenuncia}>Denunciar anúncio</Button>
                
                <Form ref={formRef} onSubmit={handleCommentSubmit}>
                  <Input
                    name="texto"
                    icon={FiAlignJustify}
                    placeholder=" Ex: 'Ele é pesado?'"
                    
                  ></Input>
                  <SubText text="Caso deseje, faça um comentário. Pelo menos 5 caracteres."/>

                  <InvisibleInput name="anuncio" defaultValue={adData?.id}></InvisibleInput>

                  <ButtonStyled name="submitButton" type="submit">
                    Enviar comentário
                  </ButtonStyled>

                </Form>
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

export default Oferta;
