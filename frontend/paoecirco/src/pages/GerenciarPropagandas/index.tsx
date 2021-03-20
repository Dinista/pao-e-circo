import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnuncioCard, Container, DivComum, ImgContainer } from "./styles";
import Header from "../../components/Header";
import { PropagandaData } from "../../components/PropagandaData";
import Button from "../../components/Button";
import api from "../../services/api";

interface Propaganda {
  id: string;
  imageName: string;
  empresaContratante: string;
  dataExpiracao: string;
}

const GerenciarPropaganda: React.FC = () => {
  const [propagandaData, setPropagandaData] = useState<Propaganda[]>([]);

  useEffect(() => {
    api
      .get("/propaganda")
      .then((response) => setPropagandaData(response.data.propagandas));
  }, []);

  return (
    <>
      <Header />
      <Container>
        {propagandaData.map((propaganda, index) => {
          return (
            <AnuncioCard key={propaganda.imageName}>
              <h1>Anuncio {index + 1}</h1>
              <DivComum>
                Empresa contratante: {propaganda.empresaContratante}
              </DivComum>
              <DivComum>Data de expiração: {propaganda.dataExpiracao}</DivComum>
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

export default GerenciarPropaganda;
