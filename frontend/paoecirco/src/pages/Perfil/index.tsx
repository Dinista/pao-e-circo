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

import { FaSadTear } from "react-icons/fa"

import TrocasCard from "../../components/TrocasCard";

import bg_default from "../../assets/bg-default.jpg";

import avatar_default from "../../assets/avatar-default.jpg";
import { GiConsoleController } from "react-icons/gi";

//import BG from "../../assets/bg-perfil.jpg";

declare module "react" {
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
  nota: any,
  avatar: string,
  capa: string,
  data: string,
}

const Perfil: React.FC = () => {

  // Perfil data handle

  const loginId = localStorage.getItem("loginid");
  const [perfilData, setperfilData] = useState<cliente>();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const urlParams = useParams() as object;
  const dataUser = perfilData?.dataNasc?.split("-") as any || 0
  const [perfilExist, setPerfilExist] = useState(true)
  const [Cardimgcapa, setCardCapa] = useState(bg_default);
  const [Cardimgavatar, setCardAvatar] = useState(avatar_default);

  // Calcula idade

  function idade(anoAniversario: number, mesAniversario: number, diaAniversario: number) {
    var d = new Date,
      ano_atual = d.getFullYear(),
      mes_atual = d.getMonth() + 1,
      dia_atual = d.getDate(),
      anoAniversario = +anoAniversario,
      mesAniversario = +mesAniversario,
      diaAniversario = +diaAniversario,
      quantos_anos = ano_atual - anoAniversario;

    if (
      mes_atual < mesAniversario ||
      (mes_atual == mesAniversario && dia_atual < diaAniversario)
    ) {
      quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
  }

  // Confere URL

  function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevURL = usePrevious((urlParams as any).id);

  useEffect(() => {
    if ((urlParams as any).id != prevURL && prevURL != undefined) {
      window.location.reload();
    }
  }, [urlParams]);

  // perfil tratamento

  useEffect(() => {
    api.get(`/perfil/${(urlParams as any).id}`).then((response) => {
      if (response.data.error != undefined) {
        setPerfilExist(false)
      } else {
        const picked = (({ id, name, dataNasc, estado, cidade, nota, avatar, capa, data }) => ({ id, name, dataNasc, estado, cidade, nota, avatar, capa, data }))(response.data[0]);
        setperfilData(picked);
        setIsOwner(loginId == picked.id);
      }
    })
  }, []);

  useEffect(() => {
    if (perfilData?.avatar) {
      setCardAvatar(perfilData.avatar);
    }
    if (perfilData?.capa) {
      setCardCapa(perfilData.capa);
    }
  });

  // Tramento nota
  const [notaFeed, setNota] = useState(0);
  const [NotasLength, setNotaslength] = useState(0);
  const Notas: number[] = [];

  function somar(total, number) {
    return total + number
  }

  useEffect(() => {
    api.get(`/findAllNotas/${(urlParams as any).id}`).then((response) => {
      if (response.data.error != undefined) {
        setNota(0)
      } else {
        response.data.map((dado: any, i: number) => {
          Notas.push(dado.nota);
        })
      }
      setNota(Notas.reduce(somar, 0) / Notas.length);
      setNotaslength(Notas.length);
    })
  }, [notaFeed]);
  // --------------------------- Anuncios Ativos-----------------------


  var json = require('./data.json');
  const [anuncio, setAnuncios] = useState(json);
  useEffect(() => {
    api.post(`/anunciosall/${(urlParams as any).id}`).then((response) => {
      setAnuncios(response.data);
    });
  }, []);

  // Paginação estados

  const [pageNumber, setPageNumber] = useState(0);
  const numberPerPage = 12;
  const visitedPages = pageNumber * numberPerPage;
  const totalPages = Math.ceil(anuncio.length / numberPerPage);
  const a = "";
  const [display, setDis] = useState(a as any);
  const [isclicked, setclicked] = useState(false);

  // Paginação
  const setnext = () => {
    if ((pageNumber + 1) < totalPages) {
      setPageNumber(pageNumber + 1)
    }
  };

  // Carrega conteúdo entre as tabs
  const clickAtivos = () => {
    setclicked(!isclicked)
  }

  // Paginação
  const setprev = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  }

  // Pagination render Anuncio Ativos
  useEffect(() => {
    const HTMLAtivo = document.getElementsByClassName("Conteiner-Anuncios-Ativos").length
    const HTMLprev = document.getElementsByClassName("prev")[0] as HTMLElement
    const HTMLnext = document.getElementsByClassName("next")[0] as HTMLElement

    if (anuncio.length <= 0) {
      if (HTMLAtivo > 0) {
        HTMLnext.style.display = "none";
      }
      setDis(() => {
        return (
          <div className="semAnuncio">Ainda não tem anúncios &#128546;</div>
        );
      });
    } else if (HTMLAtivo > 0) {
      if (totalPages == 1) {
        HTMLnext.style.display = "none";
        HTMLprev.style.display = "none";
      }
      if (pageNumber + 1 == totalPages) {
        HTMLnext.style.display = "none";
      } else {
        HTMLnext.style.display = "block";
      }
      if (pageNumber == 0) {
        HTMLprev.style.display = "none";
      } else {
        HTMLprev.style.display = "block";
      }
      setDis(anuncio.slice(visitedPages, visitedPages + numberPerPage)
        .map((anuncio: any, i: any) => {
          return (
            <AnuncioCard
              key={"Anuncio-Ativo" + i}
              id={anuncio.id}
              Img={anuncio.foto1}
              Titulo={anuncio.titulo}
              Valor={anuncio.valorEstimado}
              isOwner={isOwner}
            />
          )
        }))
    }

  }, [pageNumber, isclicked, anuncio, isOwner]);

  //------------------------ Trocas --------------------------

  var json_trocas = require('./data-trocas.json');
  const [trocas, setTrocas] = useState(json_trocas);

  useEffect(() => {
    api.get(`/findAllTrocas/${(urlParams as any).id}`).then((response) => {
      setTrocas(response.data);
    });
  }, []);

  const [pageNumber_Trocas, setPageNumber_Trocas] = useState(0);
  const numberPerPage_Trocas = 12;
  const visitedPages_Trocas = pageNumber_Trocas * numberPerPage_Trocas;
  const totalPages_Trocas = Math.ceil(trocas.length / numberPerPage_Trocas);
  const b = "";
  const [display_Trocas, setDis_Trocas] = useState(b as any)

  const setnext_Trocas = () => {
    if ((pageNumber_Trocas + 1) < totalPages_Trocas) {
      setPageNumber_Trocas(pageNumber_Trocas + 1)
    }
  }

  const setprev_Trocas = () => {
    if (pageNumber_Trocas > 0) {
      setPageNumber_Trocas(pageNumber_Trocas - 1)
    }
  }

  const [IdDono, setIdDono] = useState("");
  const [IdNaoDono, setIdNaoDono] = useState("");
  const [Nome, setNome] = useState("");
  const [nomeObjeto1, setnomeObjeto1] = useState("");
  const [foto1, setfoto1] = useState("");
  const [SeuObj, setSeuObj] = useState("");
  const [fotoDoSeuObj, setfotoDoSeuObj] = useState("");


  useEffect(() => {
    const HTMLAtivo_troca = document.getElementsByClassName("Conteiner-Trocas").length
    const HTMLprev_troca = document.getElementsByClassName("prev-troca")[0] as HTMLElement
    const HTMLnext_troca = document.getElementsByClassName("next-troca")[0] as HTMLElement

    if (trocas.length <= 0) {
      if (HTMLAtivo_troca > 0) {
        HTMLnext_troca.style.display = "none"
      }
      setDis_Trocas(() => { return (<div className='semAnuncio'>Ainda não realizou nenhuma troca &#128546;</div>) })
    } else if (HTMLAtivo_troca > 0) {
      if (totalPages_Trocas == 1) {
        HTMLnext_troca.style.display = "none"
        HTMLprev_troca.style.display = "none"
      }
      if (pageNumber_Trocas + 1 == totalPages_Trocas) {
        HTMLnext_troca.style.display = "none"
      } else {
        HTMLnext_troca.style.display = "block"
      }
      if (pageNumber_Trocas == 0) {
        HTMLprev_troca.style.display = "none"
      } else {
        HTMLprev_troca.style.display = "block"
      }
      setDis_Trocas(trocas.slice(visitedPages_Trocas, visitedPages_Trocas + numberPerPage_Trocas)
        .map((trocas: any, i: any) => {
          const data = trocas.data;
          const idAnuncioCliente1 = trocas.idAnuncioCliente1;
          const idAnuncioCliente2 = trocas.idAnuncioCliente2;
          const idCliente1 = trocas.idCliente1;
          const idCliente2 = trocas.idCliente2;

          if ((urlParams as any).id == idCliente1) {
            setIdDono(idCliente1);
            setIdNaoDono(idCliente2);
          } else if ((urlParams as any).id == idCliente2) {
            setIdDono(idCliente2);
            setIdNaoDono(idCliente1);
          }

          if (IdNaoDono) {
            api.get(`/perfil/${IdNaoDono}`).then((response) => {
              setNome(response.data[0].name)
              
            })
          }

          if (idAnuncioCliente2 && idAnuncioCliente1){
            api.post(`/anuncioss/${idAnuncioCliente2}`).then((response) => {
              setnomeObjeto1(response.data.titulo);
              setfoto1(response.data.foto1);
            });

            api.post(`/anuncioss/${idAnuncioCliente1}`).then((response) => {
              setSeuObj(response.data.titulo);
              setfotoDoSeuObj(response.data.foto1);
            });
          }
          return (
            <TrocasCard
              id_1={IdNaoDono}
              nome1={Nome}
              nomeObjeto1={nomeObjeto1}
              foto1={foto1}
              Avaliação_Cliente1={0}
              SeuObj={SeuObj}
              fotoDoSeuObj={fotoDoSeuObj}
              dataTroca={data.split("T")[0].replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}

            />
          )
        }))
    }
  }, [pageNumber_Trocas, isclicked, trocas, IdDono, Nome]);


  //------------------------ Seguindo --------------------------

  const [seguindo, setseguindo] = useState(json);

  useEffect(() => {
    api.get(`/findAllSeguindo/${(urlParams as any).id}`).then((response) => {
      //console.log(response.data)
      setseguindo(response.data);
    });
  }, []);

  // Paginação estados

  const [pageNumber_seguindo, setPageNumber_seguindo] = useState(0);
  const numberPerPage_seguindo = 12;
  const visitedPages_seguindo = pageNumber_seguindo * numberPerPage_seguindo;
  const totalPages_seguindo = Math.ceil(seguindo.length / numberPerPage_seguindo);
  const a_seguindo = "";
  const [display_seguindo, setDis_seguindo] = useState(a_seguindo as any);

  // Paginação
  const setnext_seguindo = () => {
    if ((pageNumber_seguindo + 1) < totalPages_seguindo) {
      setPageNumber_seguindo(pageNumber_seguindo + 1)
    }
  };

  // Paginação
  const setprev_seguindo = () => {
    if (pageNumber_seguindo > 0) {
      setPageNumber_seguindo(pageNumber_seguindo - 1);
    }
  }

  // Pagination render Anuncio Ativos
  useEffect(() => {
    const HTMLAtivo = document.getElementsByClassName("Conteiner-Seguindo").length
    const HTMLprev = document.getElementsByClassName("prev_seguindo")[0] as HTMLElement
    const HTMLnext = document.getElementsByClassName("next_seguindo")[0] as HTMLElement

    if (seguindo.length <= 0) {
      if (HTMLAtivo > 0) {
        HTMLnext.style.display = "none";
      }
      setDis_seguindo(() => {
        return (
          <div className="semAnuncio">Ainda não segue ninguém &#128546;</div>
        );
      });
    } else if (HTMLAtivo > 0) {
      if (totalPages_seguindo == 1) {
        HTMLnext.style.display = "none";
        HTMLprev.style.display = "none";
      }
      if (pageNumber_seguindo + 1 == totalPages_seguindo) {
        HTMLnext.style.display = "none";
      } else {
        HTMLnext.style.display = "block";
      }
      if (pageNumber_seguindo == 0) {
        HTMLprev.style.display = "none";
      } else {
        HTMLprev.style.display = "block";
      }
      setDis_seguindo(seguindo.slice(visitedPages_seguindo, visitedPages_seguindo + numberPerPage_seguindo)
        .map((anuncio: any, i: any) => {
          return (
            <AnuncioCard
              key={"Anuncio-Ativo" + i}
              id={anuncio.id}
              Img={anuncio.foto1}
              Titulo={anuncio.titulo}
              Valor={anuncio.valorEstimado}
              isOwner={false}
            />
          )
        }))
    }
  }, [pageNumber_seguindo, isclicked, seguindo]);

  // Display Perfil não existe
  if (perfilExist === false) {
    return (
      <>
        <Header />
        <div className="User-Not-Found">
          <h1>Erro (404) - Page Not Found</h1>
          <h3>Usuário não encontrado!</h3>
      O usuário que você porcura não existe.
      <div className="icon"><FaSadTear /></div>
        </div>
      </>
    );
  }


  return (
    <>
      <div className="PerfilContainer">
        <Header />
        <div className="bg img-resize" style={{ backgroundImage: `url(${Cardimgcapa})` }}>
        </div>
        <div onClick={clickAtivos}>
          <Cabecalho
            nome={perfilData?.name?.split(" ")[0]}
            idade={idade(
              parseInt(dataUser[0], 10),
              parseInt(dataUser[1], 10),
              parseInt(dataUser[2], 10)
            )}
            cidade={perfilData?.cidade}
            estado={perfilData?.estado}
            nota={notaFeed}
            numAv={NotasLength}
            avatar={Cardimgavatar}
            data={perfilData?.data}
            isOwner={isOwner}
          />
          <Tabs>
            <div label="Anúncios Ativos">
              <div className="Conteiner-Anuncios-Ativos">
                <div className="Paginate">{display}</div>
                <div className="controls">
                  <button onClick={() => setprev()} className="prev">
                    Anterior
                  </button>
                  <button onClick={() => setnext()} className="next">
                    Próxima
                  </button>
                </div>
              </div>
            </div>
            <div label="Trocas">
              <div className="Conteiner-Trocas">
                <div className="Paginate">
                  {display_Trocas}
                </div>
                <div className="controls">
                  <button onClick={() => setprev_Trocas()} className="prev-troca">Anterior</button>
                  <button onClick={() => setnext_Trocas()} className="next-troca">Próxima</button>
                </div>
              </div>
            </div>
            <div label="Seguindo">
              <div className="Conteiner-Seguindo">
                <div className="Paginate">
                  {display_seguindo}
                </div>
                <div className="controls">
                  <button onClick={() => setprev_seguindo()} className="prev_seguindo">Anterior</button>
                  <button onClick={() => setnext_seguindo()} className="next_seguindo">Próxima</button>
                </div>
              </div>
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
