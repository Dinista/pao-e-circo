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
  ofertante: string | null | undefined;
  texto: string;
  ofertaTroca?: string;
}

const ModalReactRealizarOferta: React.FC<NewModalProps> = ({
  isOpen,
  onRequestClose,
  anuncio,
  ofertante,
  texto,
}: NewModalProps) => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

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

  const handleCadastrarNovoItem = useCallback(async() => {
    const cliente = localStorage.getItem("loginid") || "";
    if(cliente == "") {
      alert("Necessário estar logado para cadastrar um novo item!");
      return history.push("/signin");
    } else {
      return history.push("/createexchangead");
    }

    
    
  }, []);

  const handleSubmitData = useCallback(async (itemOferecidoId: any) => {
    const cliente = localStorage.getItem("loginid") || "";
    if(cliente == "") {
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

      const anunciante3 = await api.post(`/anuncioss/${anuncio}`);

      const anunciante = anunciante3.data.cliente.id;

      const jorge = {
        anuncio,
        anunciante,
        ofertante,
        texto,
        ofertaTroca: itemOferecidoId.objeto,
      };

      const notificacao = await api.post("/notificacoes", jorge);

      const nomeOfertante = await api.get(`/perfil/${ofertante}`);
      const nomeAnuncio = await api.get(`/findanuncionome/${anuncio}`);
      const nomeAnuncioOfertado = await api.get(
        `/findanuncionome/${itemOferecidoId.objeto}`
      );

      var verificanotificacao = JSON.parse(
        localStorage.getItem(`${anunciante}`) || "[]"
      );
      // Adiciona pessoa ao cadastro
      verificanotificacao.push({
        anuncio: anuncio,
        ofertaTroca: itemOferecidoId,
        ofertante: ofertante,
        nomeOfertante: nomeOfertante.data[0].name,
        nomeAnuncioOfertado: nomeAnuncioOfertado.data,
        nomeAnuncio: nomeAnuncio.data,
        idNotificacao: notificacao.data.notificacao.idNotificacao,
      });
      localStorage.setItem(
        `${anunciante}`,
        JSON.stringify(verificanotificacao)
      );

      alert("A oferta foi realizada com sucesso");

      //history.push("/");
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
            defaultValue={objetosUsuarioLogado[1]}
          ></Select>
          <SubText text="O item ainda estará disponível até que o outro usuário aceite a proposta de troca." />

          <ButtonPropaganda name="submitButton" type="submit">
            Oferecer item selecionado
          </ButtonPropaganda>
        </Form>

        <ButtonPropaganda onClick={handleCadastrarNovoItem}> Cadastrar novo item </ButtonPropaganda>
      </Container>
    </Modal>
  );
};

export default ModalReactRealizarOferta;
