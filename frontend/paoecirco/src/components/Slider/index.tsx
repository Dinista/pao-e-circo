import React, { useState } from "react";
import { SliderData } from "../SliderData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "./styles.css";
import { Link } from "react-router-dom";

const ImageSlider = ({ slides }: any) => {
  const propsValid = (slides: any) => {
    console.log("slides: " + typeof(slides));
    if (slides == undefined || slides == [] || slides == "") return false;
    else return true;
  };

  const [isSlides, setIsSlides] = useState<boolean | undefined>(
    propsValid(slides) ? true : false
  );

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }


  return (
    <div>
    { isSlides ? (
      <section className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {SliderData.map((slide, index) => {
        return (
          <div className="sliderContainer" key={index}>
            <div className={index === current ? "slide active" : "slide"}>
              {index === current && (
                <Link to={{
                  pathname: "/makeanoffer",
                  // TO DO receber como props
                  state: {
                    id: slide.id
                  },
                }} className="linkContainer">
                  <img src={slide.image} alt="éisso" className="image" />
                  <h1 className="tituloSlide">{slide.titulo}</h1>
                  <div className="descricao">{slide.descricao}</div>
                </Link>
                
              )}
            </div>
          </div>
        );
      })}
    </section>

    ) : (
      <div/>
    ) 

    }
    
    

    </div>
  )};

export default ImageSlider;
