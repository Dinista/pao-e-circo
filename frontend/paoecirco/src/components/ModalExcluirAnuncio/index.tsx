import React, { useCallback } from "react";
import Modal from "react-modal";
import { Container } from "./styles";
import api from "../../services/api";
import { useHistory } from "react-router";
import Button from "../Button";

interface NewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  idAnuncio: string | undefined
}

const ModalReactExcluirAnuncio: React.FC<NewModalProps> = ({
  isOpen,
  onRequestClose,
  idAnuncio
}: NewModalProps) => {
  const history = useHistory();

  const handleDelete = useCallback(async (data: any) => {
    console.log("Deletando comentários");
    api.delete(`/deleteCommentsByAnuncioId/${data}`).then((response) => {
      console.log("Response deletando comentarios: " + response); 
    });
    
    console.log("Deletando denúncias");
    api.delete(`/deleteDenunciasByAnuncioId/${data}`).then((response) => {
      console.log("Response deletando anuncios: " + response); 
    });
    
    console.log("Deletando anúncio");
    api.delete(`/anuncios/${data}`).then((response) => {
      console.log("Response deletando anuncio: " + response); 
    });

    alert("O anuncio foi apagado com sucesso");
    history.push("/");
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
        <h2>Excluir anúncio</h2>
        <p> Deseja realmente excluir esse anúncio? Essa operação não poderá ser desfeita </p>
          
        <Button onClick={() => handleDelete(idAnuncio)}>
          Encerrar anuncio
        </Button>
        
      </Container>
    </Modal>
  );
};

export default ModalReactExcluirAnuncio;
