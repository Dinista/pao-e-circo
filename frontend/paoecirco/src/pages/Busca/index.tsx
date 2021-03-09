import { FormHandles } from "@unform/core";
import React, { useCallback, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { MdSubtitles } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

import Header from "../../components/Header";

const Busca: React.FC = (props: any) => {
  const { image, name, avaliacao, cidade, estado } =
    (props.location && props.location.state) || {};

  return (
    <>
      <Header />

      <div className="containerDestaque">
        <h1 className="tituloDestaque">DESTAQUES</h1>
        {
          <div>
            <div className="containerItemDestaque">
              <img src={image} alt="dataimg" className="cardAvatar" />
              <div className="container2">
                <p className="descricaoCardContainer">{name}</p>
                <div className="vendedorContainer">
                  <BsPersonFill className="iconePessoa" /> Vendedor: {name}
                </div>
                <div className="avaliacaoContainer">
                  <AiFillStar className="iconeEstrela" /> Avaliação: {avaliacao}
                </div>
                <div className="avaliacaoContainer">
                  <AiFillStar className="iconeEstrela" /> Cidade: {cidade}
                </div>
                <div className="avaliacaoContainer">
                  <AiFillStar className="iconeEstrela" /> Estado: {estado}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
};

//styles

export default Busca;
