import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnuncioCard, Container, DivComum, ImgContainer } from "./styles";
import Header from "../../components/Header";
import Button from "../../components/Button";
import api from "../../services/api";
import ModalReact from "../../components/ModalPropaganda";

interface Propaganda {
  id: string;
  imageName: string;
  empresaContratante: string;
  dataExpiracao: string;
}

const GerenciarPropaganda: React.FC = () => {
  const [propagandaData, setPropagandaData] = useState<Propaganda[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //funções

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  //puxa propagandas do banco
  useEffect(() => {
    api.get("/propaganda").then((response) => {
      setPropagandaData(response.data.propagandas);
    });
  }, []);

  //deleta do banco
  const handleDelete = useCallback(async (data: any) => {
    await api.delete(`/propaganda/${data}`);
    alert("A propaganda foi apagada com sucesso");

    setPropagandaData((oldPropagandas) =>
      oldPropagandas.filter((propaganda) => propaganda.id !== data)
    );
  }, []);

  return (
    <>
      <Header />
      <Container>
        {propagandaData.map((propaganda, index) => {
          return (
            <AnuncioCard key={propaganda.id}>
              <ModalReact
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                id={propaganda.id}
              />

              <h1>Anuncio {index + 1}</h1>
              <ImgContainer
                src={propaganda.imageName}
                alt="éisso"
                className="image"
              />
              <DivComum>
                Empresa contratante: {propaganda.empresaContratante}
              </DivComum>
              <DivComum>Data de expiração: {propaganda.dataExpiracao}</DivComum>
              <Button onClick={handleOpenModal}>Alterar dados</Button>
              <Button onClick={() => handleDelete(propaganda.id)}>
                Encerrar propaganda
              </Button>
            </AnuncioCard>
          );
        })}
      </Container>
    </>
  );
};

export default GerenciarPropaganda;
