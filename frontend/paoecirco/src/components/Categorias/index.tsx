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
        <Link className="item"
                to={{
                  pathname: "/BuscaCategoria", state: { categoria: "eletronico"}
                }}>
          <GrTechnology className="gravura" />
          <div className="textoDescricao">Eletrônicos</div>
        </Link>
        <Link className="item"
                to={{
                  pathname: "/BuscaCategoria", state: { categoria: "instrumentoMusical"}
                }}>
          <GiMusicalKeyboard className="gravura" />
          <div className="textoDescricao">Instrumentos musicais</div>
        </Link>
        <Link className="item"
                to={{
                  pathname: "/BuscaCategoria", state: { categoria: "vestuario"}
                }}>
          <GiClothes className="gravura" />
          <div className="textoDescricao">Roupas</div>
        </Link>
        <Link className="item"
                to={{
                  pathname: "/BuscaCategoria", state: { categoria: "ferramenta"}
                }}>
          <GiToolbox className="gravura" />
          <div className="textoDescricao">Ferramentas</div>
        </Link>
        <Link className="item"
                to={{
                  pathname: "/BuscaCategoria", state: { categoria: "brinquedo"}
                }}>
          <GiToyMallet className="gravura" />
          <div className="textoDescricao">Brinquedos</div>
        </Link>
        <Link className="item"
                to={{
                  pathname: "/BuscaCategoria", state: { categoria: "materialEscolar"}
                }}>
          <GiSchoolBag className="gravura" />
          <div className="textoDescricao">Material escolar</div>
        </Link>
        <Link className="item"
                to={{
                  pathname: "/BuscaCategoria", state: { categoria: "movel"}
                }}>
          <GiChest className="gravura" />
          <div className="textoDescricao">Moveis</div>
        </Link>
      </div>
    </>
  );
};

export default Categorias;
