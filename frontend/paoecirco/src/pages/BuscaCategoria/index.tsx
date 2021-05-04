import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { MdAttachMoney, MdDescription } from "react-icons/md";
import {
  Container,
  TituloDestaque,
  ContainerItemDestaque,
  ImageContainer,
} from "./styles";
import Header from "../../components/Header";
import ExibirPropaganda from "../../components/ExibirPropaganda";
import api from "../../services/api";
import { Link, useParams } from "react-router-dom";
import Anuncio from "../../components/Anuncio";
import Cliente from "../../../../../backend/src/models/Cliente";

interface DadosAnuncio {
  titulo: string,
  valorEstimado: number,
  itemDesejado: string,
  cliente: Cliente,
  foto1: string,
  id: string,
  descricao: string,
}

const BuscaCategoria: React.FC = (props: any) => {
  const { categoria } = props.location && props.location.state;
  const [anuncios, setAnuncios] = useState<DadosAnuncio[]>([]);
  console.log("PROPS: " + (props.location && props.location.state));
  console.log("ANTES: " + categoria);

  //puxar anuncios do banco pelas categorias
  useEffect(() => {
    api.get(`/findByCategoria/${categoria}`).then((response) => {
      console.log("CATEGORIA:" + categoria);
       if (response.data === "Nenhum resultado obtido") {
      }
      else{
      
        setAnuncios(response.data);
       }
    });
  }, [categoria]);


  return (
    <>
      <Header />

      <Container>
        <TituloDestaque>RESULTADOS DA BUSCA</TituloDestaque>
        {
          <div>
            {console.log(anuncios)}
            {anuncios.map((anuncio) =>
            (
              <div key={anuncio.id}>
              <Anuncio
              anunciante = {anuncio.cliente.name}
              descricao = {anuncio.descricao}
              foto1 = {anuncio.foto1}
              id = {anuncio.id}
              itemDesejado = {anuncio.itemDesejado}
              titulo = {anuncio.titulo}
              valorEstimado = {anuncio.valorEstimado}
              />
              </div>
        
            ))}

            <ExibirPropaganda />
          </div>
        }
      </Container>
    </>
  );
};

export default BuscaCategoria;
