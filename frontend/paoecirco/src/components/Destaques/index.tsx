import React, { useEffect, useState } from "react";
import "./styles.css";
import { MdSubtitles } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsPersonFill } from "react-icons/bs";
import api from "../../services/api";
import { Link } from "react-router-dom";

interface Data {
  titulo: string;
  foto1: string;
  descricao: string;
  id: string;
  valorEstimado: string;
}

const Destaques: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    api.get("/findAllDestaques").then((response) => {
      console.log("MANSDJHKBHDFOFKVDHJOJHVFJVFLJ");
      setData(response.data);
    });
  }, []);

  return (
    <div className="containerDestaque">
      <h1 className="tituloDestaque">DESTAQUES</h1>
      {data.map((data) => (
        <div key={data.id}>
          <div className="containerItemDestaque">
            <img src={data.foto1} alt="dataimg" className="cardAvatar" />
            <div className="container2">
              <Link
                className="linkContainerDestaques"
                to={{
                  pathname: "/makeanoffer",
                  state: {
                    id: data.id,
                  },
                }}
              >
                <div className="tituloCard">
                  <MdSubtitles className="iconCardContainer" />
                  {data.titulo}
                </div>
              </Link>
              <p className="descricaoCardContainer">{data.descricao}</p>
              <div className="valorContainer">
                <RiMoneyDollarCircleLine className="iconeDolar" />
                Valor: {data.valorEstimado}
                R$
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Destaques;
