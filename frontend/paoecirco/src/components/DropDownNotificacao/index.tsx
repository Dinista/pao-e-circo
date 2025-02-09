import * as React from "react";
import { useCallback } from "react";
import api from "../../services/api";
import Button from "../Button";
import { Wrapper, ActivatorButton, DropdownList } from "./styles";

interface IDropdownItem {
  id: number;
  url: string;
  text: string;
}

interface IProps {
  activatorText?: string;
  items?: IDropdownItem[];
}

const dropdownItems = [
  {
    id: 1,
    url: "myLink",
    text: "option",
  },
];

const Dropdown = ({
  activatorText = "Notificações",
  items = dropdownItems,
}: IProps) => {
  const activatorRef = React.useRef<HTMLButtonElement | null>(null);
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  let id: any = localStorage.getItem("loginid" || "");
  let notificacoes;

  if (localStorage.hasOwnProperty(id)) {
    notificacoes = JSON.parse(localStorage.getItem(id) || "{}");
  }

  const propsValid = (notificacoes: any) => {
    if (notificacoes === "" || notificacoes === undefined) return false;
    else return true;
  };

  const ehounao = propsValid(notificacoes);

  const handleAceitar = async (idOfertante: string, idNotificacao: string, idAnuncioCliente1: string, idAnuncioCliente2: string) => {
    // @ts-ignore: Unreachable code error
    const email = await api.get(`/perfil/${idOfertante}`);

    alert(
      "Parabens! Você aceitou a troca! Entre em contato com o usuário através do email " +
      email.data[0].email
    );

    const dataTroca = {
      idCliente1: localStorage.getItem("loginid"),
      idAnuncioCliente1 :idAnuncioCliente1,
      idCliente2: idOfertante, 
      idAnuncioCliente2: idAnuncioCliente2,
    }

    api.post("/troca", dataTroca);

    await api.delete(`/notificacoes/${idNotificacao}`);

    localStorage.removeItem(id);
  };

  const handleRecusar = async (idNotificacao: string) => {
    alert("Droga! Você recusou a troca!");

    await api.delete(`/notificacoes/${idNotificacao}`);

    localStorage.removeItem(id);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const keyHandler = (event: React.KeyboardEvent) => {
    if (isOpen) {
      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowDown":
          const nodeList = listRef.current!.querySelectorAll("a");
          if (activeIndex === items.length - 1) return;
          nodeList[activeIndex + 1].focus();
          break;
        case "ArrowUp":
          const nodeList2 = listRef.current!.querySelectorAll("a");
          if (activeIndex === 0) return;
          nodeList2[activeIndex - 1].focus();
          break;
      }
    }
  };

  const handleClickOutside = (event: any) => {
    if (
      listRef.current!.contains(event.target) ||
      activatorRef.current!.contains(event.target)
    ) {
      return;
    }
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (isOpen) {
      listRef.current!.querySelector("a")!.focus();
      document.addEventListener("mouseup", handleClickOutside);
    } else {
      document.removeEventListener("mouseup", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      setActiveIndex(-1);
    }
  }, [isOpen]);

  const focusHandler = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      {ehounao ? (
        <Wrapper onKeyUp={keyHandler}>
          <ActivatorButton
            aria-haspopup="true"
            aria-controls="dropdown1"
            onClick={handleClick}
            ref={activatorRef}
            onFocus={() => setActiveIndex(-1)}
          >
            {activatorText}
          </ActivatorButton>
          <DropdownList
            id="dropdown1"
            ref={listRef}
            active={isOpen}
            role="list"
          >
            {notificacoes.map((item: any, index: any) => (
              <li key={index}>
                <a href={item.url} onFocus={() => focusHandler(index)}>
                  {"O usuario " +
                    item.nomeOfertante +
                    " deseja trocar " +
                    item.nomeAnuncioOfertado +
                    " por " +
                    item.nomeAnuncio +
                    ". Deseja aceitar?"}
                  <Button
                    onClick={() =>
                      handleAceitar(item.ofertante, item.idNotificacao, item.anuncio, item.ofertaTroca.objeto)
                    }
                  >
                    Aceitar
                  </Button>
                  <Button onClick={() => handleRecusar(item.idNotificacao)}>
                    Recusar
                  </Button>
                </a>
              </li>
            ))}
          </DropdownList>
        </Wrapper>
      ) : (
        <Wrapper onKeyUp={keyHandler}>
          <ActivatorButton
            aria-haspopup="true"
            aria-controls="dropdown1"
            onClick={handleClick}
            ref={activatorRef}
            onFocus={() => setActiveIndex(-1)}
          >
            {activatorText}
          </ActivatorButton>
          <DropdownList
            id="dropdown1"
            ref={listRef}
            active={isOpen}
            role="list"
          >
            {items.map((item, index) => (
              <li key={item.id}>
                <a href={item.url} onFocus={() => focusHandler(index)}>
                  {item.text}
                </a>
              </li>
            ))}
          </DropdownList>
        </Wrapper>
      )}
    </>
  );
};

export default Dropdown;
