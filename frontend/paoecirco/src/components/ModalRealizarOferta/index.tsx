

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as yup from "yup";
import Modal from "react-modal";
import Input from "../Input";
import { ButtonPropaganda, Container, ImagemContainer } from "./styles";
import api from "../../services/api";
import Select from "../Select";
import SubText from "../Subtext";
import { parse } from "path";

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
  
  interface Ad {
    id: string
  }
  const [adData, setAdData] = useState<Ad>();

  useEffect(() => {
    api.post(`/anunciosall/${id}`).then((response) => {
      console.log("response front: " + response);
      setAdData(response.data);
    });
  }, [adData, id]);

  { const formRefData = useRef<FormHandles>(null);

    const handleSubmitData = useCallback(
      async (itemOferecidoId: any) => {
        try {
          // await api.put(`anunciosall/${id}`);        Pegar o certo? 
          alert("A oferta foi realizada com sucesso");
        } catch (err) {}
    }, 
    [/* ? */id]
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
            {

            }
            {/*
            <Select
                name="plano"
                placeholder="Plano"
                options={planos}
            ></Select>
            */}
            <SubText text="Escolha o item que vai oferecer." />
            
            <ButtonPropaganda type="submit" onClick={handleSubmitData}>
              Oferecer item selecionado
            </ButtonPropaganda>
          </Form>
        </Container>
      </Modal>
    );
  }
};

export default ModalReactRealizarOferta;

