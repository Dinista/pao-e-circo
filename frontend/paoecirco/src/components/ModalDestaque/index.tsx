import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useRef, useState } from "react";
import * as yup from "yup";
import Modal from "react-modal";
import Input from "../Input";
import { ButtonPropaganda, Container, ImagemContainer } from "./styles";
import api from "../../services/api";

interface NewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  id: string;
}

const ModalReact: React.FC<NewModalProps> = ({
  isOpen,
  onRequestClose,
  id,
}: NewModalProps) => {
  {
    const formRefImagem = useRef<FormHandles>(null);
    const formRefEmpresa = useRef<FormHandles>(null);
    const formRefData = useRef<FormHandles>(null);

    const handleSubmitImagem = useCallback(async (data: any) => {
      try {
        formRefImagem.current?.setErrors({});
        const schema = yup.object().shape({
          imageName: yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await api.put(`propagandaimage/${id}`, data);
        alert("A propaganda foi alterada com sucesso");
      } catch {}
    }, []);

    const handleSubmitEmpresa = useCallback(async (data: any) => {
      try {
        formRefEmpresa.current?.setErrors({});

        const schema = yup.object().shape({
          empresaContratante: yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(data);

        await api.put(`propagandaempresa/${id}`, data);
        alert("A propaganda foi alterada com sucesso");
      } catch {}
    }, []);

    const handleSubmitData = useCallback(async (data: any) => {
      try {
        formRefEmpresa.current?.setErrors({});

        const schema = yup.object().shape({
          dataExpiracao: yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        formRefImagem.current?.setErrors({});
        console.log(id);
        await api.put(`propagandadata/${id}`, data);
        alert("A propaganda foi alterada com sucesso");
      } catch (err) {}
    }, []);

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        appElement={document.getElementById("root") as HTMLElement}
      >
        <Container>
          <h2>Atualizar dados</h2>
          <Form ref={formRefImagem} onSubmit={handleSubmitImagem}>
            <ImagemContainer>
              <Input
                type="text"
                placeholder="Atualizar imagem"
                name="imageName"
              />
              <ButtonPropaganda type="submit" onClick={handleSubmitImagem}>
                Atualizar imagem
              </ButtonPropaganda>
            </ImagemContainer>
          </Form>
          <Form ref={formRefEmpresa} onSubmit={handleSubmitEmpresa}>
            <ImagemContainer>
              <Input
                name="empresaContratante"
                type="text"
                onSubmit={handleSubmitEmpresa}
                placeholder="Atualizar empresa"
              />
              <ButtonPropaganda type="submit" onClick={handleSubmitEmpresa}>
                Atualizar empresa
              </ButtonPropaganda>
            </ImagemContainer>
          </Form>
          <Form ref={formRefData} onSubmit={handleSubmitData}>
            <ImagemContainer>
              <Input
                name="dataExpiracao"
                type="date"
                className=""
                placeholder="Atualizar data de expiração"
              />
              <ButtonPropaganda type="submit" onClick={handleSubmitData}>
                Atualizar data
              </ButtonPropaganda>
            </ImagemContainer>
          </Form>
        </Container>
      </Modal>
    );
  }
};

export default ModalReact;
