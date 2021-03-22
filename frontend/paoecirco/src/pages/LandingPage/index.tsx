import React from "react";
import Header from "../../components/Header";
import "./styles.css";

import ImageSlider from "../../components/Slider";
import { SliderData } from "../../components/SliderData";
import Categorias from "../../components/Categorias";
import Destaques from "../../components/Destaques";
import ExibirPropaganda from "../../components/ExibirPropaganda";

const Landing: React.FC = () => {
  return (
    <>
      <div className="container">
        <Header />
        <Categorias />
        <ImageSlider slides={SliderData} />
        <Destaques />
        <ExibirPropaganda />
      </div>
    </>
  );
};

export default Landing;
