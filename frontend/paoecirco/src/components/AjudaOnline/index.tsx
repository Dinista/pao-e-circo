import React from "react";
import Modal from "react-modal";
import { Container, Ptwo } from "./styles";

interface AjudaModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const AjudaOnline: React.FC<AjudaModalProps> = ({
  isOpen,
  onRequestClose
}: AjudaModalProps) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      appElement={document.getElementById("root") as HTMLElement}
    >
      <Container>
        <h2>Bem Vindo a Pagina Pão e Circo</h2>
        <p> O objetivo desse sistema é fazer trocas sem monetização ou seja aqui só é possivel trocar um item por outro.</p>
        <p> Para começar a buscar por itens utilize a barra de busca de anuncio. </p> 
        <Ptwo> (É possivel tambem utilizar a barra de categorias para pesquisar um item por uma categoria que desejar).</Ptwo>
        <p> A baixo da barra de categorias se encontra os principais anuncios se nosso sistema </p>
        <Ptwo> Você pode destacar um anuncio se quiser que ele apareça em nossa pagina principal</Ptwo> 
        <p> Caso deseje anunciar um item comece pelo botão ANUNCIAR</p>
        <p> Desejamos uma otima experiencia em nosso sistema!</p> 
      </Container>
    </Modal>
  );
};

export default AjudaOnline;
