import { FormHandles } from "@unform/core";
import React, { useCallback, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { MdSubtitles } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

import Header from "../../components/Header";

const Busca: React.FC = (props: any) => {
  const formRef = useRef<FormHandles>(null);

  const { image, titulo, valor, avaliacao, anunciante, descricao } =
    (props.location && props.location.state) || {};

  //funções
  /* const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          name: yup.string().required("Nome origatório"),
          cpf: yup
            .string()
            .required("CPF obrigatório")
            .min(11, "No mínimo 11 dígitos"),

          email: yup.string().required("E-mail obrigatório").email(),
          dataNasc: yup.string().required("Data de nascimento necessária"),
          senha: yup.string().min(6, "No mínimo 6 dígitos"),
          endereco: yup.string().required("Endereço obrigatório"),
          estado: yup.string().required("Estado obrigatório"),
          cidade: yup.string().required("Cidade obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/clientes", data);

        history.push("/signin");
      } catch (err) {
        //se for um erro do yup, tipo não digitou senha, email inválido, etc
        if (err instanceof yup.ValidationError) {
          return;
        }
      }
    },
    [history]
  );*/

  return (
    <>
      <Header />

      <div className="containerDestaque">
        <h1 className="tituloDestaque">DESTAQUES</h1>
        {
          <div>
            <div className="containerItemDestaque">
              <img src={image} alt="dataimg" className="cardAvatar" />
              <div className="container2">
                <div className="tituloCard">
                  <MdSubtitles className="iconCardContainer" />
                  {titulo}
                </div>
                <p className="descricaoCardContainer">{descricao}</p>
                <div className="valorContainer">
                  <RiMoneyDollarCircleLine className="iconeDolar" />
                  Valor: {valor}
                  R$
                </div>
                <div className="vendedorContainer">
                  <BsPersonFill className="iconePessoa" /> Vendedor:{" "}
                  {anunciante}
                </div>
                <div className="avaliacaoContainer">
                  <AiFillStar className="iconeEstrela" /> Avaliação: {avaliacao}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
};

//styles

export default Busca;
