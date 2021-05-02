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
      console.log("Deletando comentários");
      api.delete(`/deleteCommentsByAnuncioId/${data}`).then((response) => { });

      console.log("Deletando denúncias");
      api.delete(`/deleteDenunciasByAnuncioId/${data}`).then((response) => { });

      console.log("Deletando notifacoes");
      api.delete(`/notificacoesanuncios/${data}`).then((response) => { })
      api.delete(`/notificacoesanunciosofertados/${data}`).then((response) => { })

      console.log("Deletando anúncio");
      api.delete(`/anuncios/${data}`).then((response) => { });

      alert("O anuncio foi apagado com sucesso");
      history.push("/");

    } catch (err) {
      console.log("ERRO EXCLUSAO ANUNCIO: " + err + "!");
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
