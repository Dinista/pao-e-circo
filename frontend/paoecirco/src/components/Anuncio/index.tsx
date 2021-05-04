import React, { useCallback, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { MdAttachMoney, MdDescription } from "react-icons/md";
import { Link } from "react-router-dom";
import {
    Container,
    TituloDestaque,
    ContainerItemDestaque,
    ImageContainer,
  } from "./styles";

interface DadosAnuncio {
    titulo: string,
    valorEstimado: number,
    itemDesejado: string,
    anunciante: string,
    foto1: string,
    id: string,
    descricao: string,
}

const Anuncio: React.FC<DadosAnuncio> = ({ titulo, valorEstimado, itemDesejado, anunciante,foto1,id,descricao }) => {

    return (
        <ContainerItemDestaque>
              <ImageContainer
                src={foto1}
                alt="dataimg"
                className="cardAvatar"
              />
              <div className="container2">
                <Link
                  className="linkContainerDestaques"
                  to={{
                    pathname: "/makeanoffer",
                    state: {
                      id: id,
                    },
                  }}
                >
                  <h1 className="descricaoCardContainer">{titulo}</h1>
                </Link>

                <div className="avaliacaoContainer">
                  <MdDescription className="iconeEstrela" /> Descrição:{" "}
                  {descricao}
                </div>
                <div className="vendedorContainer">
                  <BsPersonFill className="iconePessoa" /> Vendedor:{" "}
                  {anunciante}
                </div>
                <div className="avaliacaoContainer">
                  <AiFillStar className="iconeEstrela" /> Item desejado:{" "}
                  {itemDesejado}
                </div>
                <div className="avaliacaoContainer">
                  <MdAttachMoney className="iconeEstrela" /> Valor estimado:{" "}
                  {valorEstimado}
                </div>
              </div>
            </ContainerItemDestaque>
    );
};

//styles

export default Anuncio;