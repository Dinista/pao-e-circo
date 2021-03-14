import { FormHandles } from "@unform/core";
import React, { useCallback, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { AnuncioCard, Container, DivComum, ImgContainer } from "./styles";
import Header from "../../components/Header";
import { PropagandaData } from "../../components/PropagandaData";
import Button from "../../components/Button";

//const handleAlterarImagem = useCallback(PropagandaData, []);

const GerenciarPropaganda: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        {PropagandaData.map((propaganda, index) => {
          return (
            <AnuncioCard>
              <h1>Anuncio {index + 1}</h1>
              <ImgContainer src={propaganda.image} />
              <DivComum>
                Empresa contratante: {propaganda.EmpresaContratante}
              </DivComum>
              <DivComum>Data de expiração: {propaganda.DataExpiracao}</DivComum>
              <Button>Alterar imagem propaganda</Button>
              <Button>Alterar empresa</Button>
              <Button>Alterar data de expiração</Button>
              <Button>Encerrar propaganda</Button>
            </AnuncioCard>
          );
        })}
      </Container>
    </>
  );
};

//styles

export default GerenciarPropaganda;
