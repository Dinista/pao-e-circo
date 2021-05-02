import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { RiMapPinLine } from "react-icons/ri"
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { FiThumbsUp } from "react-icons/fi";
import ReactStars from "react-rating-stars-component";
import { HiThumbUp, HiOutlineThumbUp } from "react-icons/hi";
import api from "../../services/api";
import { render } from "react-dom";

interface cabecalho {
    idade: any,
    nome: any,
    cidade: any,
    estado: any,
    nota: any,
    numAv: number,
    avatar: any,
    data: any,
    isOwner: boolean
}


const Cabecalho: React.FC<cabecalho> = ({ isOwner, idade, nome, cidade, estado, nota, numAv, avatar, data }) => {
    const history = useHistory();
    const loginId = localStorage.getItem("loginid");
    const urlParams = useParams() as object;
    const receiver = (urlParams as any).id;
    const [hasNote, setHasNote] = useState(true);
    const [dropMenu, SetDrop] = useState() as any;
    

    // tratamento find Nota
    useEffect(() => {
        const findData = {
            idClienteReceiver: receiver,
            idClienteGiver: loginId
        }
        api.post("/findNota", findData).then(async (response) => {

            if (response.data.length < 1) {
                setHasNote(false);
                console.log("comprimento", response.data.length)
            }

            const newNota = await response?.data[0]?.nota;

            SetDrop(
                <ReactStars
                    count={5}
                    size={32}
                    value={newNota}
                    isHalf={true}
                    onChange={(newRating) => { AtualizaNota(newRating) }}
                    activeColor="#ffd700"
                />
            )
        });
    }, [hasNote]);

    // tratamento create/put nota
    function AtualizaNota(nota: number) {
        console.log("Olha", hasNote)

        if (loginId == null) {
            history.push(`/signin`);
        }

        if (hasNote === false) {
            const data = {
                idClienteReceiver: receiver,
                nota: nota,
                idClienteGiver: loginId
            }
            api.post("/createNota", data).then((response) => {
                alert("Nota cadastrada!")
            })
        } 
        
        if (hasNote === true) {
            const data = {
                idClienteReceiver: receiver,
                nota: nota,
                idClienteGiver: loginId
            }
            api.put("/updateNota", data).then((response) => {
                console.log(response);
                alert("Nota alterada!")
            })

        };
    }



    // tratamento get nota
    function notaVerification(): any {
        if (nota === null || nota == undefined || nota == 0 || nota?.toString() == "NaN") {
            return ("N/A")
        } else {
            return (nota.toFixed(1))
        }
    }

    function massageVerification(): any {
        if (nota === null || nota == undefined || nota == 0 || nota?.toString() == "NaN") {
            return ("nenhuma avaliação")
        } else {
            return (`baseado em ${numAv} avaliações`)
        }
    }


    function estrelas(): any {
        if (nota === null || nota == undefined || nota == 0 || nota?.toString() == "NaN") {
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
                <li className="cabecalho-item"><div className="cabecalho-user-img img-resize" style={{ backgroundImage: `url(${avatar})` }}></div></li>
                <div className="subGrid">
                    <li className="cabecalho-titulo"><h1 className="titulo">Lojinha de trocas do {nome}</h1></li>
                    <div className="cabecalho-info">
                        <li className="cabecalho-texto"><div className="idade">{idade} anos</div></li>
                        <li className="cabecalho-texto"><div className="localizacao"><RiMapPinLine /> {cidade}, {estado}</div></li>
                        <li className="cabecalho-texto"><div className="temp-cadastro">Usuário desde {data?.split("-")[0]}</div></li>
                    </div>
                </div>
                <div className="cabecalho-ranking">
                    <div className="ranting">
                        <h1 className="rating-num">{notaVerification()}</h1>
                        <div className="Estrelas-cabecalho">{estrelas()}</div>
                        <div className="qntAvaliação">{massageVerification()}</div>
                    </div>
                </div>
                {isOwner && <div className="cabecalho-config"><Link to="/editarperfil" className="fa-cog" title="Editar perfil"><AiOutlineSetting /></Link></div>}
                {!isOwner &&
                    <div className="feedback-User" >
                        {!hasNote && <HiOutlineThumbUp style={{ color: "#f05b78" }} /> || <HiThumbUp style={{ color: "#f05b78" }} />}
                        <div className="feedBack-DropMenu">
                            {dropMenu}
                        </div>
                    </div>}
            </ul>
        </div>
    )
};

export default Cabecalho;
