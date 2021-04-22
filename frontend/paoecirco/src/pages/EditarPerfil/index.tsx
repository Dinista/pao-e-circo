import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "../../components/Header";
import "./styles.css";
import { FaCogs, FaExclamationTriangle, FaPencilAlt } from "react-icons/fa"
import { Redirect } from "react-router-dom";
import axios from "axios"
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import bg_default from "../../assets/bg-default.jpg";
import avatar_default from "../../assets/avatar-default.jpg";
import * as yup from "yup";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi";
import { FaBirthdayCake, FaCity } from "react-icons/fa";
import { GiMailbox } from "react-icons/gi";
import Input from "../../components/Input/index";
import Button from "../../components/Button/index";
import { BsEnvelope } from "react-icons/bs"

interface cliente {
    name: string,
    cpf: string,
    endereco: string,
    dataNasc: string,
    estado: string,
    cidade: string,
    email: string,
    avatar: string,
    capa: string,
    data: string,
}

interface UpdateFormData {
    name: string;
    email: string;
    cpf: string;
    endereco: string;
    estado: string;
    cidade: string;
    senha: string;
    dataNasc: string;
}


const EditarPerfil: React.FC = () => {
    const [perfilData, setperfilData] = useState<cliente>();
    //const AvatarTest = require("../../assets/avatar-pic.jpg")
    const loginId = localStorage.getItem("loginid");
    const [renderimgavatar, setRenderAvatar] = useState(avatar_default);
    const [renderimgcapa, setRenderCapa] = useState(bg_default);
    const [carregouimg, setCarregouimg] = useState(false);
    const [imgcapa, mudouImgCapa] = useState("");
    const [imgavatar, mudouImgAvatar] = useState("");
    const btn_salvarImg = document.getElementById("btn-salvar-alterações");
    const loadingImg = document.getElementById("carregar-img");
    const history = useHistory();

    useEffect(() => {
        if (loginId == null) {
            return history.push("/signin");
        }
    }, [loginId]);


    useEffect(() => {
        if (loginId) {
            api.get(`/perfil/${loginId}`).then((response) => {
                const picked = (({ name, cpf, endereco, dataNasc, estado, cidade, email, avatar, capa, data }) => ({ name, cpf, endereco, dataNasc, estado, cidade, email, avatar, capa, data }))(response.data[0]);
                setperfilData(picked);
            })
        }
    }, []);

    // Carregando do banco de dados
    const [Cardimgcapa, setCardCapa] = useState(bg_default);
    const [Cardimgavatar, setCardAvatar] = useState(avatar_default);

    useEffect(() => {
        if (perfilData?.avatar) {
            setRenderAvatar(perfilData.avatar);
            setCardAvatar(perfilData.avatar);
        }
        if (perfilData?.capa) {
            setRenderCapa(perfilData.capa);
            setCardCapa(perfilData.capa);
        }
    }, [perfilData?.avatar, perfilData?.capa]);



    //Tratamento de imagem

    if (btn_salvarImg != undefined && carregouimg) {
        btn_salvarImg.style.display = "flex"
    }

    async function getUrlImgs() {
        console.log("capa:" + imgcapa)
        console.log("avatar:" + imgavatar)
        const formdata_Avatar = new FormData
        const formdata_Capa = new FormData
        loadingImg?.classList.add("loading");

        if (imgcapa != "" && imgavatar == "") {
            formdata_Capa.append("file", imgcapa);
            formdata_Capa.append("upload_preset", "nh3ml3mu");
            axios.post("https://api.cloudinary.com/v1_1/dxklaxr7g/image/upload", formdata_Capa).then(async (response) => {
                //console.log(response.data.url);
                await api.put(`perfilUpdateCapa/${loginId}`, { capa: response.data.url });
                history.push(`/perfil/${loginId}`);
                window.location.reload();
            })
        }
        if (imgcapa == "" && imgavatar != "") {
            formdata_Avatar.append("file", imgavatar);
            formdata_Avatar.append("upload_preset", "nh3ml3mu");
            axios.post("https://api.cloudinary.com/v1_1/dxklaxr7g/image/upload", formdata_Avatar).then(async (response) => {
                await api.put(`perfilUpdateAvatar/${loginId}`, { avatar: response.data.url });
                history.push(`/perfil/${loginId}`);
                window.location.reload();
            });
        }
        if (imgcapa != "" && imgavatar != "") {
            formdata_Capa.append("file", imgcapa);
            formdata_Capa.append("upload_preset", "nh3ml3mu");
            await axios.post("https://api.cloudinary.com/v1_1/dxklaxr7g/image/upload", formdata_Capa).then(async (response) => {
                //console.log(response.data.url);
                await api.put(`perfilUpdateCapa/${loginId}`, { capa: response.data.url });
            });

            formdata_Avatar.append("file", imgavatar);
            formdata_Avatar.append("upload_preset", "nh3ml3mu");
            await axios.post("https://api.cloudinary.com/v1_1/dxklaxr7g/image/upload", formdata_Avatar).then(async (response) => {
                await api.put(`perfilUpdateAvatar/${loginId}`, { avatar: response.data.url });
                history.push(`/perfil/${loginId}`);
                window.location.reload();
            });
        }
    }

    //tratamento de formulário

    function preview_image(event: any, id: string) {
        var reader = new FileReader();
        reader.onload = function () {
            setCarregouimg(true)
            if (reader.result != null) {
                if (id === "avatar") {
                    mudouImgAvatar(event.target.files[0])
                    setRenderAvatar(reader.result as string)
                } else {
                    mudouImgCapa(event.target.files[0])
                    setRenderCapa(reader.result as string)
                }
            }
        }
        if (event && event.target.files && event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    return (
        <>
            <Header />
            <div className="container-Editperfil">
                <div className="Editar-perfil-grid">
                    <div className="Card-Editar-perfil">
                        <div className="bg-editar img-resize" style={{ backgroundImage: `url(${Cardimgcapa})` }}></div>
                        <div className="Pai-avatar">
                            <div className="avatar-editar img-resize" style={{ backgroundImage: `url(${Cardimgavatar})` }}></div>
                            <div className="nome-editar">{perfilData?.name.split(" ")[0]}</div>
                            <div className="info-editar">usuário desde {perfilData?.data.split("-")[0]}</div>
                        </div>
                        <button className="btn-meuPerfil-editar btn-carregar">meu perfil</button>
                    </div>
                    <div className="header-Editar-perfil"><FaCogs /> Configurações</div>
                    <div className="Content-Editar-perfil">
                        <div className="campo-edit-perfil">
                            <div className="Edit-label">perfil</div>
                            <div className="content-edit-perfil-grid">
                                <li className="Foto">
                                    <div className="igm-Capa img-resize" style={{ backgroundImage: `url(${renderimgavatar})` }}></div>
                                    <ul className="Text-img aling-center">
                                        <li className="img-titulo">foto</li>
                                        <li className="img-desc">capricha na foto de perfil</li>
                                    </ul>
                                    <div className="Aling"><label htmlFor="picture1" className="btn-carregar">carregar foto<input type="file" id="picture1" name="picture1" accept="image/png, image/jpeg" onChange={(event) => { preview_image(event, "avatar") }} /></label></div>
                                </li>
                                <li className="Capa">
                                    <div className="igm-Capa img-resize" style={{ backgroundImage: `url(${renderimgcapa})` }}></div>
                                    <ul className="Text-img aling-center">
                                        <li className="img-titulo">capa</li>
                                        <li className="img-desc">pra ficar bonito</li>
                                    </ul>
                                    <div className="Aling"><label htmlFor="picture2" className="btn-carregar">carregar capa<input type="file" id="picture2" name="picture2" accept="image/png, image/jpeg" onChange={(event) => { preview_image(event, "pic2") }} /></label></div>
                                </li>
                                <div id="btn-salvar-alterações"><button id="carregar-img" className="btn-carregar" onClick={getUrlImgs}>salvar alterações</button></div>
                            </div>
                        </div>
                        <div className="campo-edit-dadosPessoais">
                            <div className="Edit-label">
                                <div>dados pessoais</div>
                                <button className="btn-edit-dados"><FaPencilAlt /></button>
                            </div>
                            <ul className="dados-edit-perfil">
                                <li>
                                    <div className="titulo-edit-dados">nome</div>
                                    <div className="info-edit-dados" id="nome">{perfilData?.name}</div>
                                </li>
                                <li>
                                    <div className="titulo-edit-dados">email</div>
                                    <div className="info-edit-dados" id="email">{perfilData?.email.replace(/.{1,4}(?=\@.*?)/, "••••")}</div>
                                </li>
                                <li>
                                    <div className="titulo-edit-dados">senha</div>
                                    <div className="info-edit-dados" id="senha">•••••••••</div>
                                </li>
                                <li>
                                    <div className="titulo-edit-dados">aniversário</div>
                                    <div className="info-edit-dados" id="niver">{perfilData?.dataNasc.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}</div>
                                </li>
                                <li>
                                    <div className="titulo-edit-dados">cpf</div>
                                    <div className="info-edit-dados" id="cpf">{perfilData?.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "•••.$2.•••-$4")}</div>
                                </li>
                            </ul>
                            <Form ref={()=>{}} onSubmit={()=>{}} className= "form-edit">
                                <Input name="name" icon={FiUser} placeholder="Nome" className= "input-edit"/>
                                <Input name="email" icon={BsEnvelope} placeholder="E-mail" style={{width: "100%!important"}}/>
                                <Input name="senha" icon={FiLock} placeholder="Senha" type="password" style={{width: "100%"}}/>
                                <div style={{ width: "100%" , paddingTop : "10px" }}>
                                    <button name="submitButton" type="submit" className= "btn-carregar">
                                        salvar dados
                                    </button>
                                </div>
                            </Form>
                        </div>
                        <div className="campo-edit-endereço">
                            <div className="Edit-label">endereço </div>
                            <div className="endereco-edit-info">
                                <ul>
                                    <div className="Endereço-edit">{perfilData?.endereco.replace(/.{2}(?=\s.*?)/g, "••")}</div>
                                    <div className="cidade/estado-edit">{perfilData?.cidade.replace(/.{2,3}(?= .)*/, "••") + ", " + perfilData?.estado.replace(/.{2,5}(?= .)*/, "••")}</div>
                                </ul>
                                <button className="btn-edit-dados"><FaPencilAlt /></button>
                            </div>
                            <div className="campo-edit-conta">
                                <div className="Edit-label">conta</div>
                                <div className="texto-conta">
                                    <div className="aviso-delete-conta"><h1> <FaExclamationTriangle style={{ color: "rgb(252, 76, 105)" }} /> quero exluir minha conta</h1>
                                        <b>sempre lembrando</b>:
                                    ao excluir sua conta, torna-se impossível reativá-la depois. É, portanto, decisão definitiva.
                                    </div>
                                    <button className="btn-excluir-conta">excluir conta</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditarPerfil;