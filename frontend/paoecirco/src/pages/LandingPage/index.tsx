import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./styles.css";
import ImageSlider from "../../components/Slider";
import Categorias from "../../components/Categorias";
import Destaques from "../../components/Destaques";
import ExibirPropaganda from "../../components/ExibirPropaganda";
import api from "../../services/api";

const Landing: React.FC = () => {
  
  interface SliderData {
    titulo: string,
    foto1: string,
    descricao: string,
    id: string
  }
  const [sliderData, setSliderData] = useState<SliderData[]>([]);

  useEffect(() => {
    api.post("/findallanuncios/").then((response) => {
      console.log(response.data[0]);
      setSliderData(response.data[0]);
      
    });
    console.log(sliderData);
  }, []);
  return (
    <>
      <div className="container">
        <Header />
        <Categorias />
        <ImageSlider slides={sliderData} />
        <Destaques />
        <ExibirPropaganda />
      </div>
    </>
  );
};

export default Landing;
