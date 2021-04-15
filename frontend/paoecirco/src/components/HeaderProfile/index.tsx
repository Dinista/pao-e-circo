import React from "react";
import "./styles.css";
import Avatar from "../../assets/avatar-pic.jpg";
import {AiOutlineSetting} from "react-icons/ai"

interface cabecalho {
    idade: any,
    nome: any,
    cidade: any,
    estado: any,
}


const Cabecalho: React.FC<cabecalho> = ({idade, nome, cidade, estado}) => {
    return(
        <div className="cabecalho-perfil-area">
            <ul className="cabecalho">
                <li className="cabecalho-item"><a className="cabecalho-link"><img className="cabecalho-user-img" src={Avatar} alt=""></img></a></li>
                <div className = "subGrid">
                    <li className="cabecalho-titulo"><h1 className="titulo">Lojinha de trocas do {nome}</h1></li>
                    <div className="cabecalho-info">
                        <li className="cabecalho-texto"><div className="idade">{idade} anos</div></li>
                        <li className="cabecalho-texto"><div className="localizacao">{cidade}, {estado}</div></li>
                        <li className="cabecalho-texto"><div className="temp-cadastro">Usuário desde 2018</div></li>
                    </div>
                </div>
                <div className= "cabecalho-ranking">
                    <div className="ranting">
                            <h1 className="rating-num">4</h1>
                        <div className = "qntAvaliação">{2} avaliações</div>
                    </div>
                </div>
                <div className="cabecalho-config"><a className="fa-cog" title="Editar perfil"><AiOutlineSetting/></a></div>
            </ul>
        </div>
    )
}

export default Cabecalho;
