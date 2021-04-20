import React, { useEffect, useState } from "react";
import "./styles.css";
import Avatar from "../../assets/avatar-pic.jpg";
import { AiOutlineSetting } from "react-icons/ai";
import { RiMapPinLine } from "react-icons/ri"
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

interface cabecalho {
    idade: any,
    nome: any,
    cidade: any,
    estado: any,
    nota: any,
}


const Cabecalho: React.FC<cabecalho> = ({ idade, nome, cidade, estado, nota }) => {

    function notaVerification(): any {
        if (nota === null || nota == undefined) {
            return ("N/A")
        } else {
            return (nota.toFixed(1))
        }
    }

    function massageVerification(): any {
        if (nota === null || nota == undefined) {
            return ("nenuma avaliação")
        } else {
            return ("baseado em avaliações")
        }
    }


    function estrelas(): any {
        if (nota === null || nota == undefined) {
            //setHas(true)
            //setMsg("Não fez nenhuma troca")
            return [<BsStar />, <BsStar />, <BsStar />, <BsStar />, <BsStar />]
        } else {
            const stringNota = nota.toFixed(1);
            const array = stringNota.split(".");
            const estrelas_cheias = parseInt(array[0])
            const arrayEstrelas = [] as any
            for (let i = 0; i < estrelas_cheias; ++i) {
                arrayEstrelas.push(<BsStarFill />);
            }
            if (parseInt(array[1]) > 0) {
                arrayEstrelas.push(<BsStarHalf />);
            }
            if (arrayEstrelas.length < 5) {
                const j = 5 - arrayEstrelas.length;
                for (let i = 0; i < j; ++i) {
                    arrayEstrelas.push(<BsStar />);
                }
            }

            return arrayEstrelas
        }
    }


    return (
        <div className="cabecalho-perfil-area">
            <ul className="cabecalho">
                <li className="cabecalho-item"><a className="cabecalho-link"><img className="cabecalho-user-img" src={Avatar} alt=""></img></a></li>
                <div className="subGrid">
                    <li className="cabecalho-titulo"><h1 className="titulo">Lojinha de trocas do {nome}</h1></li>
                    <div className="cabecalho-info">
                        <li className="cabecalho-texto"><div className="idade">{idade} anos</div></li>
                        <li className="cabecalho-texto"><div className="localizacao"><RiMapPinLine /> {cidade}, {estado}</div></li>
                        <li className="cabecalho-texto"><div className="temp-cadastro">Usuário desde 2018</div></li>
                    </div>
                </div>
                <div className="cabecalho-ranking">
                    <div className="ranting">
                        <h1 className="rating-num">{notaVerification()}</h1>
                        <div className = "Estrelas-cabecalho">{estrelas()}</div>
                        <div className="qntAvaliação">{ massageVerification()}</div>
                    </div>
                </div>
                <div className="cabecalho-config"><a className="fa-cog" title="Editar perfil"><AiOutlineSetting /></a></div>
            </ul>
        </div>
    )
}

export default Cabecalho;
