import React from "react";
import Modal from "react-modal";
import { Container, Ptwo } from "./styles";

interface AjudaModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const ModalReactAjudaOnline: React.FC<AjudaModalProps> = ({
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
        <h2>Como realizar uma oferta</h2>
        <p> Gostou deste anúncio? Para fazer uma oferta ao seu dono, siga esse passo-a-passo.</p>
        <p> 1. Primeiramente, clique no botão "Oferecer item". </p> 
        <Ptwo> (Caso não esteja logado, você será redirecionado a uma página onde pode fazer login ou criar uma nova conta).</Ptwo>
        <p> 2. Após logar-se, ou caso já esteja logado, ao clicar em "Oferecer item" uma janela se abrirá contendo uma caixa de seleção, um botão escrito "Cadastrar novo item" e "Oferecer item selecionado" </p>
        <Ptwo> Ainda não tem nenhum item cadastrado em nosso site? Clique no botão "Cadastrar novo item", ou clique no botão "Anunciar", 
          que fica no topo da tela, e você será redirecionado a página de criação de anúncio.</Ptwo> 
        <p> 3. Após cadastrar um item, ou caso já tenha cadastrado o item que deseja oferecer, o selecione na caixa de seleção e clique em Oferecer Item Selecionado</p>
        <p> Pronto! Caso o dono do anúncio queira trocar com você, você será notificado e receberá os dados de contato do anunciante para que possam concluir a troca.</p> 
      </Container>
    </Modal>
  );
};

export default ModalReactAjudaOnline;
