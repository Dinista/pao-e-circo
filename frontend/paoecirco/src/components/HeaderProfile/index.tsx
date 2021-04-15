import React from "react";
import "./styles.css";
import Avatar from "../../assets/avatar-pic.jpg";

const Cabecalho: React.FC = () => {
    return(
        <div className="cabecalho-perfil-area">
            <ul className="cabecalho">
                <li className="cabecalho-item"><a href="perfil.html" className="cabecalho-link"><img className="cabecalho-user-img" src={Avatar} alt=""></img></a></li>
                <li className="cabecalho-titulo"><h1 className="titulo">Lojinha de trocas do Felipe</h1></li>
                <div className="cabecalho-info">
                    <li className="cabecalho-texto"><text className="idade">21 anos</text></li>
                    <li className="cabecalho-texto"><text className="localizacao">Maringá-Pr</text></li>
                    <li className="cabecalho-texto"><text className="temp-cadastro">Usuário desde 2018</text></li>
                </div>
                <li className= "cabecalho-ranking">
                    <div className="ranting">
                            <h1 className="rating-num">4.0</h1>
                            <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="far fa-star"></i>
                        <div>
                            <span className="fa fa-user"></span> 2 avaliações
                        </div>
                    </div>
                </li>
                <li className="cabecalho-config"><a href="editarPerfil.html" className="cabecalho-link" title="Editar perfil"><i className="fas fa-cog"></i></a></li>
            </ul>
        </div>
    )
}

export default Cabecalho;
