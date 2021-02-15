import React from "react";
import {
  GiMusicalKeyboard,
  GiClothes,
  GiToolbox,
  GiToyMallet,
  GiSchoolBag,
  GiChest,
} from "react-icons/gi";
import { GrTechnology } from "react-icons/gr";
import { Link } from "react-router-dom";
import "./styles.css";

const Categorias: React.FC = (props) => {
  return (
    <>
      <h1 className="categoriasText">CATEGORIAS</h1>
      <div className="categorias">
        <Link to="/tecnologia" className="item">
          <GrTechnology className="gravura" />
          <div className="textoDescricao">Eletrônicos</div>
        </Link>
        <Link to="/instrumentos" className="item">
          <GiMusicalKeyboard className="gravura" />
          <div className="textoDescricao">Instrumentos musicais</div>
        </Link>
        <Link to="/roupas" className="item">
          <GiClothes className="gravura" />
          <div className="textoDescricao">Roupas</div>
        </Link>
        <Link to="/ferramentas" className="item">
          <GiToolbox className="gravura" />
          <div className="textoDescricao">Ferramentas</div>
        </Link>
        <Link to="/brinquedos" className="item">
          <GiToyMallet className="gravura" />
          <div className="textoDescricao">Brinquedos</div>
        </Link>
        <Link to="/material" className="item">
          <GiSchoolBag className="gravura" />
          <div className="textoDescricao">Material escolar</div>
        </Link>
        <Link to="/moveis" className="item">
          <GiChest className="gravura" />
          <div className="textoDescricao">Moveis</div>
        </Link>
      </div>
    </>
  );
};

export default Categorias;
