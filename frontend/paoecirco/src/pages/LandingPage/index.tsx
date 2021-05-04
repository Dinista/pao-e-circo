import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./styles.css";
import ImageSlider from "../../components/Slider";
import Categorias from "../../components/Categorias";
import Destaques from "../../components/Destaques";
import ExibirPropaganda from "../../components/ExibirPropaganda";
import AjudaOnline from "../../components/AjudaOnline";
import Button from "../../components/Button";
import { StyledButton } from "./styles";

const Landing: React.FC = () => {
  const [isModalAjudaOnlineOpen, setIsModalAjudaOnlineOpen] = useState(false);
  function handleOpenModalAjudaOnline() {
    setIsModalAjudaOnlineOpen(true);
  }
  function handleCloseModalAjudaOnline() {
    setIsModalAjudaOnlineOpen(false);
  }
  return (
    <>
      <div className="container">
        <Header />

        <AjudaOnline
          isOpen={isModalAjudaOnlineOpen}
          onRequestClose={handleCloseModalAjudaOnline}
        />
        <StyledButton onClick={handleOpenModalAjudaOnline}>
          BEM VINDO
      </StyledButton>

        <Categorias />
        <ImageSlider />
        <Destaques />
        <ExibirPropaganda />
      </div>
    </>
  );
};

export default Landing;
