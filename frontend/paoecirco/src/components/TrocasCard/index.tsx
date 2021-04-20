import React, { useCallback, useRef, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { components } from "react-select";
import { FaExchangeAlt } from "react-icons/fa";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

interface TrocasCard {
    id_1: string,
    nome1: string,
    nomeObjeto1: string,
    foto1: string,
    Avaliação_Cliente1: number,
    dataTroca: string,
    SeuObj: string,
    fotoDoSeuObj: string,
}

const TrocasCard: React.FC<TrocasCard> = ({ id_1, nome1, nomeObjeto1, foto1, Avaliação_Cliente1, SeuObj, fotoDoSeuObj, dataTroca }) => {
    const numNota = Avaliação_Cliente1;
    const stringNota = numNota.toFixed(1);
    const array = stringNota.split(".");
    const estrelas_cheias = parseInt(array[0])
    const arrayEstrelas = [] as any

    function estrelas() : any{
        for (let i = 0; i < estrelas_cheias; ++i) {
            arrayEstrelas.push(<BsStarFill/>);
        }
        if(parseInt(array[1]) > 0){
            arrayEstrelas.push(<BsStarHalf/>);
        }
        if(arrayEstrelas.length < 5){
            const j = 5 - arrayEstrelas.length;
            for (let i = 0; i < j; ++i) {
                arrayEstrelas.push(<BsStar/>);
            }
        }
        
        return arrayEstrelas
    }

    return (
        <div className="Container_class">
            <ul className="gridCard-troca">
                <li className="Img1-troca"><img className = "img-product"src={fotoDoSeuObj} alt={SeuObj}/></li>
                <li className="troca-titulo1">{SeuObj}</li>
                <li className="Icon-troca"><FaExchangeAlt /></li>
                <li className="Img2-troca"><img className = "img-product"src={foto1} alt={nomeObjeto1}/></li>
                <li className="troca-titulo2">{nomeObjeto1}</li>
                <li className="Estrelas-troca">{estrelas()}<li className= "NumNota">{numNota.toFixed(1)}</li></li>
                <li className="info-troca1">Data da troca: <b className="Destaque-troca">{dataTroca}</b></li>
                <li className="info-troca2"> Com o usuário: <b className="Destaque-troca">{nome1}</b> </li>
                <li className="info-troca3"> Avaliação: <b className="Destaque-troca">{numNota.toFixed(1)}</b> </li>
            </ul>
        </div>
    )
};

export default TrocasCard;