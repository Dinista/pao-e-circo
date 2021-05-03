import React, { useCallback, useEffect } from "react";
import Modal from "react-modal";
import "./styles.css";
import api from "../../services/api";
import { useHistory } from "react-router";
import { BsTrash } from "react-icons/bs";
import { between } from "polished";

interface NewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  idCliente: string | undefined | null
}

const ModalReactExcluirConta: React.FC<NewModalProps> = ({
  isOpen,
  onRequestClose,
  idCliente
}: NewModalProps) => {
  const history = useHistory();

  const handleDelete = useCallback(async (data: any) => {
    try {
      api.delete(`/clienteDelete/${idCliente}`);
      history.push("/");
      localStorage.removeItem("loginid");

    } catch (err) {
      console.log("ERRO EXCLUSAO Perfil: " + err + "!");
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
      <div className="modal-exclurConta">
        <h2> <BsTrash style={{ color: "rgb(252, 76, 105)" }} /> Excluir conta ?</h2>
        <p>Deseja realmente <b>excluir sua conta</b>? Você <b>perderá todos os seus dados</b> e não poderá recuperá-los!</p>
          <button className="Btn-ExcluirConta" onClick={() => handleDelete(idCliente)}>
            excluir conta
          </button>
        </div>
    </Modal>
  );
};

export default ModalReactExcluirConta;
