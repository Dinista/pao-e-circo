import React, { useEffect, useState } from "react";
import { Container, ContainerImg, Imagem } from "./styles";
import { Link } from "react-router-dom";
import api from "../../services/api";

interface SliderDataa {
  titulo: string;
  foto1: string;
  descricao: string;
  id: string;
}

const ImageSlider = () => {
  const [sliderData, setSliderData] = useState<SliderDataa[]>([]);
  const [index, setIndex] = useState(0);

  const delay = 10000;

  useEffect(() => {
    api.get("/findallanuncios").then((response) => {
      setSliderData(response.data.anuncios);
    });
  }, []);

  useEffect(() => {
    setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {};
  }, [index]);

  return (
    <Container>
      <ContainerImg
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {sliderData.map((slide, index) => (
          <Imagem key={index} src={slide.foto1} alt="éisso"></Imagem>
        ))}
      </ContainerImg>
    </Container>
  );
};

export default ImageSlider;
