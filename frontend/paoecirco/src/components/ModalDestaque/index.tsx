import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useRef, useState } from "react";
import * as yup from "yup";
import Modal from "react-modal";
import { ButtonPropaganda, Container, ImagemContainer } from "./styles";
import api from "../../services/api";
import Select from "../Select";
import SubText from "../Subtext";
import { useHistory } from "react-router";

interface NewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  id: string | undefined;
}

const planos = [
  { value: 30, label: "30 dias - R$ 29,90" },
  { value: 60, label: "60 dias - R$ 49,90" },
  { value: 90, label: "90 dias - R$ 64,90" },
];

const ModalReactDestaque: React.FC<NewModalProps> = ({
  isOpen,
  onRequestClose,
  id,
}: NewModalProps) => {
  const formRefData = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmitData = useCallback(
    async (planoDias: any) => {
      try {
        const schema = yup.object().shape({});

        await schema.validate(planoDias, {
          abortEarly: false,
        });
        await api.put(`anunciodestaque/${id}`, planoDias);
        alert("O anuncio foi destacado com sucesso");
        history.push("/");
      } catch (err) {}
    },
    [id]
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
        <h2>Destacar anúncio</h2>
        <Form ref={formRefData} onSubmit={handleSubmitData}>
          <Select name="plano" placeholder="Plano" defaultValue={planos[0]} options={planos}></Select>

          <SubText text="Escolha o plano que prefere para o destaque de seu anúncio." />

          <ButtonPropaganda type="submit" onClick={handleSubmitData}>
            Destacar
          </ButtonPropaganda>
        </Form>
      </Container>
    </Modal>
  );
};

export default ModalReactDestaque;
