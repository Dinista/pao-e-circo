import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import {
  Container,
  TituloDestaque,
  ContainerItemDestaque,
  ImageContainer,
} from "./styles";
import Header from "../../components/Header";
import ExibirPropaganda from "../../components/ExibirPropaganda";

const BuscaAnuncio: React.FC = (props: any) => {
  const { titulo, valorEstimado, itemDesejado, anunciante } =
    (props.location && props.location.state) || {};

  return (
    <>
      <Header />

      <Container>
        <TituloDestaque>RESULTADOS DA BUSCA</TituloDestaque>
        {
          <div>
            <ContainerItemDestaque>
              <ImageContainer
                src="https://cdn-images.win.gg/resize/w/1200/h/678/format/jpg/type/progressive/fit/cover/path/news/43207fd5e34f87c48d584fc5c11befb8/a5781441559308f9a8ec02269ff2dfba/original.jpg"
                alt="dataimg"
                className="cardAvatar"
              />
              <div className="container2">
                <h1 className="descricaoCardContainer">{titulo}</h1>
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
            <ExibirPropaganda />
          </div>
        }
      </Container>
    </>
  );
};

export default BuscaAnuncio;
