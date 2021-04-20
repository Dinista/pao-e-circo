import { useHistory } from "react-router-dom";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as yup from "yup";
import Modal from "react-modal";
import { ButtonPropaganda, Container } from "./styles";
import api from "../../services/api";
import Select from "../Select";
import SubText from "../Subtext";

const objetosUsuarioLogado: any = [];

interface NewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  anuncio: string | null | undefined;
  anunciante: string | null | undefined;
  ofertante: string | null | undefined;
  texto: string;
  ofertaTroca?: string;
}

const ModalReactRealizarOferta: React.FC<NewModalProps> = ({
  isOpen,
  onRequestClose,
  anuncio,
  anunciante,
  ofertante,
  texto,
}: NewModalProps) => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [formState, setFormState] = useState({
    anuncio,
    anunciante,
    ofertante,
    texto,
    ofertaTroca: "",
  });
  useEffect(() => {
    objetosUsuarioLogado.length = 0;

    api.post(`/anunciosall/${ofertante}`).then((response) => {
      objetosUsuarioLogado.push({ value: "", label: "" }); // Coloca a 1a opção vazia
      for (let i = 0; i < response.data.length; i++) {
        objetosUsuarioLogado.push({
          value: response.data[i].id,
          label: response.data[i].titulo,
        });
      }
    });
  }, [isOpen]);

  const formRefData = useRef<FormHandles>(null);

  const handleSubmitData = useCallback(async (itemOferecidoId: any) => {
    if(localStorage.getItem("loginid") || "" == "") {
      alert("Necessário estar logado para realizar uma oferta!");
      return history.push("/signin");
    }
    
    try {
      formRef.current?.setErrors({});

      const schema = yup.object().shape({
        objeto: yup.string().required("Selecione um item!"),
      });

      await schema.validate(itemOferecidoId, {
        abortEarly: false,
      });
      let updatedValue = formState;
      console.log("itemofe: " + itemOferecidoId.objeto);
      updatedValue.ofertaTroca = itemOferecidoId.objeto;

      setFormState({ ...updatedValue });

      await api.post("/notificacoes", formState);

      alert("A oferta foi realizada com sucesso");

      history.push("/");
    } catch (err) {
      alert(err);
    }
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
        <h2>Realizar oferta</h2>
        <Form ref={formRefData} onSubmit={handleSubmitData}>
          <Select
            name="objeto"
            placeholder="Selecione um objeto seu para oferecer"
            options={objetosUsuarioLogado}
          ></Select>
          <SubText text="O item ainda estará disponível até que o outro usuário aceite a proposta de troca." />

          <ButtonPropaganda name="submitButton" type="submit">
            Oferecer item selecionado
          </ButtonPropaganda>
        </Form>
      </Container>
    </Modal>
  );
};

export default ModalReactRealizarOferta;
