import React, { useCallback, useRef, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { components } from "react-select";
import { BsPencil } from "react-icons/bs"
import { useHistory } from "react-router-dom";

interface AnuncioCard {
    id: string;
    Img: string;
    Titulo: string;
    Valor: number;
    isOwner: boolean
}

const AnuncioCard: React.FC<AnuncioCard> = ({ id, Img, Titulo, Valor, isOwner }) => {
    const history = useHistory()

    function destaqueOnclick() {
        history.push({ pathname: "/makeanoffer", state: { id: id } })
    }
    function EditOnclick() {
        history.push({ pathname: "/editaranuncio", state: { id: id } })
    }

    return (
        <div id="CardConteiner">
            <ul className="gridCard">
                <li className="Item-CardAnuncio-Img img-resize" style={{ backgroundImage: `url(${Img})` }}>
                    <Link className="linkContainerDestaques" to={{ pathname: "/makeanoffer", state: { id: id } }} />
                </li>
                {isOwner && <li className="Item-CardAnuncio-Edit"><button className="btn-edit" onClick={EditOnclick}><BsPencil /></button></li>}
                <li className="Item-CardAnuncio-Desc">
                    <div className="sub-grid-desc">
                        <div id="Valor-estimado">Valor estimado: <b id="valor">R${Valor}</b></div>
                        <div id="Titulo-anuncio">{Titulo}</div>
                    </div>
                </li>
                {isOwner && <li className="Item-CardAnuncio-Dest"><button className="btn-destaque" onClick={destaqueOnclick}>Destacar</button></li>}
            </ul>
        </div>
    )
};

export default AnuncioCard;