import React, { useEffect, useState } from "react";
import { Container, ContainerImg, Imagem } from "./styles";
import api from "../../services/api";

interface Propaganda {
  id: string;
  imageName: string;
  empresaContratante: string;
  dataExpiracao: string;
}

const ExibirPropaganda: React.FC = () => {
  const [propagandaData, setPropagandaData] = useState<Propaganda[]>([]);
  const [index, setIndex] = useState(0);

  const delay = 5000;

  useEffect(() => {
    api.get("/propaganda").then((response) => {
      setPropagandaData(response.data.propagandas);
    });
  }, []);

  useEffect(() => {
    setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === propagandaData.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {};
  }, [index]);

  return (
    <Container>
      <ContainerImg
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {propagandaData.map((propaganda, index) => (
          <Imagem key={index} src={propaganda.imageName}></Imagem>
        ))}
      </ContainerImg>
    </Container>
  );
};

export default ExibirPropaganda;
