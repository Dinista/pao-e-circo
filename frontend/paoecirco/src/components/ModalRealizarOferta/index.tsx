

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useRef, useState } from "react";
import * as yup from "yup";
import Modal from "react-modal";
import Input from "../Input";
// import { ButtonPropaganda, Container, ImagemContainer } from "./styles";
import api from "../../services/api";
import Select from "../Select";
import SubText from "../Subtext";
import { parse } from "path";
/*
interface NewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  id: string | undefined;
}

const ModalReactRealizarOferta: React.FC<NewModalProps> = ({
  isOpen,
  onRequestClose,
  id,
}: NewModalProps) => {
  { const formRefData = useRef<FormHandles>(null);

    const handleSubmitData = useCallback(
      async (planoDias: any) => {
        try {
          
          await api.put(`anunciodestaque/${id}`, time);
          alert("O anuncio foi destacado com sucesso");
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
          <h2>Realizar oferta</h2>         
          <Form ref={formRefData} onSubmit={handleSubmitData}>
            <Select
                name="plano"
                placeholder="Plano"
                options={planos}
            ></Select>
            
            <SubText text="Escolha o plano que prefere para o destaque de seu anúncio." />
            
            <ButtonPropaganda type="submit" onClick={handleSubmitData}>
              Destacar
            </ButtonPropaganda>
          </Form>
        </Container>
      </Modal>
    );
  }
};

export default ModalReactRealizarOferta;
*/
