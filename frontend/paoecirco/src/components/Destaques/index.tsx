import React from "react";
import "./styles.css";
import { SliderData } from "../SliderData";
import { MdSubtitles } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsPersonFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

const Destaques: React.FC = ({ slides }: any) => {
  return (
    <div className="containerDestaque">
      <h1 className="tituloDestaque">DESTAQUES</h1>
      {SliderData.map((data) => (
        <div key={data.titulo}>
          <div className="containerItemDestaque">
            <img src={data.image} alt="dataimg" className="cardAvatar" />
            <div className="container2">
              <div className="tituloCard">
                <MdSubtitles className="iconCardContainer" />
                {data.titulo}
              </div>
              <p className="descricaoCardContainer">{data.descricao}</p>
              <div className="valorContainer">
                <RiMoneyDollarCircleLine className="iconeDolar" />
                Valor: {data.valor}
                R$
              </div>
              <div className="vendedorContainer">
                <BsPersonFill className="iconePessoa" /> Vendedor:{" "}
                {data.anunciante}
              </div>
              <div className="avaliacaoContainer">
                <AiFillStar className="iconeEstrela" /> Avaliação:{" "}
                {data.avaliacao}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Destaques;
