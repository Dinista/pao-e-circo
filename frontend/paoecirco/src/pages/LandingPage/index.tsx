import React from "react";
import Header from "../../components/Header";
import "./styles.css";

import ImageSlider from "../../components/Slider";
import { SliderData } from "../../components/SliderData";
import Categorias from "../../components/Categorias";
import Destaques from "../../components/Destaques";
import ExibirPropaganda from "../../components/ExibirPropaganda";
import { useLocation } from "react-router-dom";

interface IState {
  logado?: boolean;
  id?: string;
}

const Landing: React.FC = () => {
  const location = useLocation<IState>();

  return (
    <>
      <div className="container">
        <Header state={location.state} />
        <Categorias />
        <ImageSlider slides={SliderData} />
        <Destaques />
        <ExibirPropaganda />
      </div>
    </>
  );
};

export default Landing;
