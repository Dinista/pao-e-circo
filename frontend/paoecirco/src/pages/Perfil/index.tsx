import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";
import Header from "../../components/Header";
import Cabecalho from "../../components/HeaderProfile";
import Tabs from "../../components/Tabs";
import AnuncioCard from "../../components/AnuncioCard";
import { string } from "yup/lib/locale";

import api from "../../services/api";

import { useParams } from "react-router";

//import BG from "../../assets/bg-perfil.jpg";

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    label?: string;
  }
}

interface cliente{
  id: string,
  name: string,
  cpf: string,
  dataNasc: string,
  estado: string,
  endereco: string,
  cidade : string,
  email: string,
  senha : string,
}


const Perfil: React.FC = () => {
  // Perfil handle
  var json = require('./data.json');
  const loginId = localStorage.getItem("loginid");
  const [perfilData, setperfilData] = useState<cliente>()
  const [isOwner, setIsOwner] = useState <boolean>()
  const urlParams = useParams();
  // perfil tratamento
  
  try{
    api.get(`/perfil/${urlParams}`).then((response) => {
      setperfilData(response.data);
      setIsOwner("loginid" == perfilData?.id);
    });
  }catch(e){
    console.log("Perfil não encontrado")
  }

  const [anuncio, setAnuncios] = useState(json);
  const [pageNumber, setPageNumber] = useState(0);
  const numberPerPage = 12;
  const visitedPages = pageNumber * numberPerPage;
  const totalPages = Math.ceil(anuncio.length / numberPerPage);
  const a = "";
  const [display, setDis] = useState(a as any)
  const [isclicked, setclicked] = useState(false);
  const setnext = () =>{
  
    if ((pageNumber + 1) < totalPages){
      setPageNumber(pageNumber + 1)
    } 
  }

  const clickAtivos = () =>{
    setclicked(!isclicked)
  }

  const setprev = () =>{
    if (pageNumber > 0){
      setPageNumber(pageNumber - 1)
    } 
  }
  //const [length , setLength] = useState(0)
  useEffect(() => {
    // Pagination render
    const HTMLAtivo = document.getElementsByClassName("Conteiner-Anuncios-Ativos").length
    const HTMLprev = document.getElementsByClassName("prev")[0] as HTMLElement
    const HTMLnext = document.getElementsByClassName("next")[0] as HTMLElement
    
    if(anuncio.length <= 0){
      if( HTMLAtivo > 0){
        HTMLnext.style.display = "none"
      }
      setDis(() => {return (<div className = 'semAnuncio'>Você ainda não tem anúncios &#128546;</div>)})
    }else if( HTMLAtivo > 0){
      if (totalPages == 1 ){
        HTMLnext.style.display = "none"
        HTMLprev.style.display = "none"
      }
      if (pageNumber + 1 == totalPages){
        HTMLnext.style.display = "none"
      }else{
        HTMLnext.style.display = "block"
      }
      if(pageNumber == 0){
        HTMLprev.style.display = "none" 
      }else{
        HTMLprev.style.display = "block"
      }
      setDis(anuncio.slice(visitedPages, visitedPages + numberPerPage)
      .map((anuncio : any, i : any) => {
        return(
          <AnuncioCard
            key = {"Anuncio-Ativo" + i}
            Img = {anuncio.img}
            Titulo = {anuncio.Titulo}
            Valor = {anuncio.Valor}
          />
        )
      }))
  }
  },[pageNumber, isclicked]);



  return (
    <>
    <div className = "PerfilContainer">
      <Header />
      <div className = "bg"><img src ="" alt=""/></div>
      <Cabecalho/>
      <div onClick = {clickAtivos}>
      <Tabs>
        <div label = "Anúncios Ativos"> 
        <div className = "Conteiner-Anuncios-Ativos">
          <div className = "Paginate">
            {display}
          </div>
          <div className="controls">
            <button onClick = {() => setprev()} className="prev">Anterior</button>
            <button onClick = {() => setnext()} className="next">Próxima</button>
          </div>
        </div>
        </div> 
        <div label = "Trocas"> 
          After 'while, <em>Crocodile</em>! 
        </div> 
        <div label = "Seguindo"> 
          Nothing to see here, this tab is <em>extinct</em>! 
        </div> 
      </Tabs>
      </div>
      <div>{perfilData?.name}</div>
    </div>
    </>
  );
};

//styles

export default Perfil;
