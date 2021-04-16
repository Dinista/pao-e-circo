import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";
import Header from "../../components/Header";
import Cabecalho from "../../components/HeaderProfile";
import Tabs from "../../components/Tabs";
import AnuncioCard from "../../components/AnuncioCard";
import { string } from "yup/lib/locale";

import api from "../../services/api";

import { useParams } from "react-router";
import { render } from "@testing-library/react";

import{FaSadTear} from "react-icons/fa"

//import BG from "../../assets/bg-perfil.jpg";


declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    label?: string;
  }
}

interface cliente {
  id: string,
  name: string,
  dataNasc: string,
  estado: string,
  cidade: string,
}


const Perfil: React.FC = () => {
  // Perfil handle
  const loginId = localStorage.getItem("loginid");
  const [perfilData, setperfilData] = useState<cliente>()
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const urlParams = useParams() as object;
  const dataUser = perfilData?.dataNasc?.split("-") as any || 0
  const [perfilExist,setPerfilExist] = useState(true)

  function idade(anoAniversario: number, mesAniversario: number, diaAniversario: number) {
    var d = new Date,
      ano_atual = d.getFullYear(),
      mes_atual = d.getMonth() + 1,
      dia_atual = d.getDate(),

      anoAniversario = +anoAniversario,
      mesAniversario = +mesAniversario,
      diaAniversario = +diaAniversario,

      quantos_anos = ano_atual - anoAniversario;

    if (mes_atual < mesAniversario || mes_atual == mesAniversario && dia_atual < diaAniversario) {
      quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
  }

  function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevURL = usePrevious((urlParams as any).id)

  useEffect(() => {
    if ((urlParams as any).id != prevURL && prevURL != undefined) {
      window.location.reload()
    }
  }, [urlParams])

  // perfil tratamento

  useEffect(() => {
      api.get(`/perfil/${(urlParams as any).id}`).then((response) => {
        if(response.data.error != undefined){
          setPerfilExist(false)
        }else{
        const picked = (({ id, name, dataNasc, estado, cidade }) => ({ id, name, dataNasc, estado, cidade }))(response.data[0]);
        setperfilData(picked);
        setIsOwner(loginId == picked.id);
      }})
  }, []);


  //const [anuncio, setAnuncios] = useState<anuncio>();
  var json = require('./data.json');
  const [anuncio, setAnuncios] = useState(json);


  useEffect(() => {
    api.post(`/anunciosall/${(urlParams as any).id}`).then((response) => {
      setAnuncios(response.data)
    })
  }, []);


  const [pageNumber, setPageNumber] = useState(0);
  const numberPerPage = 12;
  const visitedPages = pageNumber * numberPerPage;
  const totalPages = Math.ceil(anuncio.length / numberPerPage);
  const a = "";
  const [display, setDis] = useState(a as any)
  const [isclicked, setclicked] = useState(false);
  const setnext = () => {

    if ((pageNumber + 1) < totalPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  const clickAtivos = () => {
    setclicked(!isclicked)
  }
  
  const setprev = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1)
    }
  }
  //const [length , setLength] = useState(0)
  useEffect(() => {
    // Pagination render
    const HTMLAtivo = document.getElementsByClassName("Conteiner-Anuncios-Ativos").length
    const HTMLprev = document.getElementsByClassName("prev")[0] as HTMLElement
    const HTMLnext = document.getElementsByClassName("next")[0] as HTMLElement

    if (anuncio.length <= 0) {
      if (HTMLAtivo > 0) {
        HTMLnext.style.display = "none"
      }
      setDis(() => { return (<div className='semAnuncio'>Ainda não tem anúncios &#128546;</div>) })
    } else if (HTMLAtivo > 0) {
      if (totalPages == 1) {
        HTMLnext.style.display = "none"
        HTMLprev.style.display = "none"
      }
      if (pageNumber + 1 == totalPages) {
        HTMLnext.style.display = "none"
      } else {
        HTMLnext.style.display = "block"
      }
      if (pageNumber == 0) {
        HTMLprev.style.display = "none"
      } else {
        HTMLprev.style.display = "block"
      }
      setDis(anuncio.slice(visitedPages, visitedPages + numberPerPage)
        .map((anuncio: any, i: any) => {
          return (
            <AnuncioCard
              key={"Anuncio-Ativo" + i}
              Img={anuncio.foto1}
              Titulo={anuncio.titulo}
              Valor={anuncio.valorEstimado}
            />
          )
        }))
    }
  }, [pageNumber, isclicked, anuncio]);
  console.log(isOwner)

  if(perfilExist == false){
    return(
      <>
      <Header/>
      <div className = "User-Not-Found">
        <h1>Erro (404) - Page Not Found</h1>
        <h3>Usuário não encontrado!</h3>
        O usuário que você porcura não existe.
        <div className = "icon"><FaSadTear/></div>
      </div>
      </>
    );
  }

  return (
    <>
      <div className="PerfilContainer">
        <Header />
        <div className="bg"><img src="" alt="" /></div>
        <div onClick={clickAtivos}>
          <Cabecalho
            nome={perfilData?.name?.split(" ")[0]}
            idade={idade(parseInt(dataUser[0], 10), parseInt(dataUser[1], 10), parseInt(dataUser[2], 10))}
            cidade={perfilData?.cidade}
            estado={perfilData?.estado}
          />
          <Tabs>
            <div label="Anúncios Ativos">
              <div className="Conteiner-Anuncios-Ativos">
                <div className="Paginate">
                  {display}
                </div>
                <div className="controls">
                  <button onClick={() => setprev()} className="prev">Anterior</button>
                  <button onClick={() => setnext()} className="next">Próxima</button>
                </div>
              </div>
            </div>
            <div label="Trocas">
              After 'while, <em>Crocodile</em>!
        </div>
            <div label="Seguindo">
              Nothing to see here, this tab is <em>extinct</em>!
        </div>
          </Tabs>
        </div>
        <div>{ }</div>
      </div>
    </>
  );
};

//styles

export default Perfil;
