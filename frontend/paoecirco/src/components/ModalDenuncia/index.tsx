import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useRef, useState } from "react";
import * as yup from "yup";
import Modal from "react-modal";
import { ButtonPropaganda, Container, ImagemContainer } from "./styles";
import api from "../../services/api";
import Select from "../Select";
import SubText from "../Subtext";
import Input from "../Input/index";
import { useHistory } from "react-router";
import Anuncio from "../../../../../backend/src/models/Anuncio";

interface NewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  idDenunciante: string | null;
  idAnuncio: string | undefined;
}

interface Denuncia {
  categoria: string;
  comentario: string;
  idDenunciante: string | null;
  anuncio: string | undefined;
}

const categorias = [
  { value: "conteudoImproprio", label: "Contém conteúdo impróprio" },
  { value: "anuncioFalso", label: "É um anúncio falso" },
  { value: "objetoIlicito", label: "Troca de objeto ilícito" },
  { value: "discursoDeOdio", label: "Contém discurso de ódio" },
  { value: "outro", label: "Outro" },
];

const ModalReactDenuncia: React.FC<NewModalProps> = ({
  isOpen,
  onRequestClose,
  idDenunciante,
  idAnuncio,
}: NewModalProps) => {
  const formRefData = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmitData = useCallback(
    async (data: Denuncia) => {
      if(localStorage.getItem("loginid") == null) {
        alert("Necessário estar logado para realizar uma denúncia!");
        return history.push("/signin");
      }
  
      try {
        const schema = yup.object().shape({
          categoria: yup.string().required("Selecione uma categoria"),
          comentario: yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        data.anuncio = idAnuncio;
        data.idDenunciante = idDenunciante;

        await api.post("/denunciar", data);
        alert("O anuncio foi denunciado com sucesso");
        history.push("/");
      } catch (err) {
        alert(err);
      }
    },
    [idAnuncio]
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      appElement={document.getElementById("root") as HTMLElement}
    >
      <Container>
        <h2>Denunciar anúncio</h2>
        <Form ref={formRefData} onSubmit={handleSubmitData}>
          <p> Qual o problema com esse anúncio? </p>
          <Select
            name="categoria"
            placeholder="Categoria da denúncia"
            options={categorias}
          ></Select>

          <p>Deseja acrescentar um comentário sobre a denúncia? </p>
          <Input
            name="comentario"
            placeholder="Insira um comentário... "
          ></Input>

          <ButtonPropaganda name="submitButton" type="submit">
            Denunciar
          </ButtonPropaganda>
        </Form>
      </Container>
    </Modal>
  );
};

export default ModalReactDenuncia;
