import React, { useCallback, useRef, useState } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import {
  FiType,
  FiAlignJustify,
  FiBox,
  FiDollarSign,
  FiSquare,
} from "react-icons/fi";
import Input from "../../components/Input/index";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import {
  AnimationContainer,
  Background,
  Container,
  Content,
  InputCriarAnuncio,
  SubTituloPagina,
  TituloPagina,
  ButtonStyled,
} from "./styles";
import Select from "../../components/Select";
import SubText from "../../components/Subtext";
import Header from "../../components/Header";
import ExibirPropaganda from "../../components/ExibirPropaganda";
import getValidationErrors from "../../utils/getValidationErrors";
import axios from "axios";
import InvisibleInput from "../../components/InvisibleInput";

interface CreateExchangeAdFormData {
  titulo: string;
  nomeObjeto: string;
  cliente: string;
  categoria: string;
  estadoConservacao: string;
  foto1: string;
  foto2: string;
  foto3: string;
  descricao: string;
  itemDesejado: string;
  valorEstimado: number;
  destaque: boolean;
  destaqueExpira: Date;
}

const categorias = [
  { value: "brinquedo", label: "Brinquedo" },
  { value: "ferramenta", label: "Ferramenta" },
  { value: "instrumentoMusical", label: "Instrumento Musical" },
  { value: "materialEscolar", label: "Material Escolar" },
  { value: "eletronico", label: "Eletrônico" },
  { value: "movel", label: "Móvel" },
  { value: "vestuario", label: "Vestuário" },
  { value: "decoracao", label: "Decoração" },
  { value: "outros", label: "Outros" },
];

const estadosConservacao = [
  { value: "novo", label: "Novo" },
  { value: "semiNovo", label: "Semi-novo" },
  { value: "usado", label: "Usado" },
];

let foto1var, foto2var, foto3var;

const CreateExchangeAd: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  var update = 0;
  //funções

  const foto1Update = (event) => {
    foto1var = event.target.files[0];
  };
  const foto2Update = (event) => {
    foto2var = event.target.files[0];
  };
  const foto3Update = (event) => {
    foto3var = event.target.files[0];
  };

  const handleSubmit = useCallback(
    async (data: CreateExchangeAdFormData) => {
      try {
        data.cliente = localStorage.getItem("loginid") || "";
        if (data.cliente == "") {
          alert("Para criar um anuncio é necessário logar");
          history.push("/signin");
        }

        if (foto1var !== undefined) {
          if (foto1var.size > 5097152) {
            return alert("Imagem 1 maior que 5mb!");
          }
          const formdata_foto1 = new FormData();
          formdata_foto1.append("file", foto1var);
          formdata_foto1.append("upload_preset", "nh3ml3mu");
          data.foto1 = (
            await axios.post(
              "https://api.cloudinary.com/v1_1/dxklaxr7g/image/upload",
              formdata_foto1
            )
          ).data.url;
        } else {
          data.foto1 = "";
        }

        if (foto2var !== undefined) {
          if (foto2var.size > 5097152) {
            return alert("Imagem 2 maior que 5mb!");
          }
          const formdata_foto2 = new FormData();
          formdata_foto2.append("file", foto2var);
          formdata_foto2.append("upload_preset", "nh3ml3mu");
          data.foto2 = (
            await axios.post(
              "https://api.cloudinary.com/v1_1/dxklaxr7g/image/upload",
              formdata_foto2
            )
          ).data.url;
        } else {
          data.foto2 = "";
        }

        if (foto3var !== undefined) {
          if (foto3var.size > 5097152) {
            return alert("Imagem 3 maior que 5mb!");
          }
          const formdata_foto3 = new FormData();
          formdata_foto3.append("file", foto3var);
          formdata_foto3.append("upload_preset", "nh3ml3mu");
          data.foto3 = (
            await axios.post(
              "https://api.cloudinary.com/v1_1/dxklaxr7g/image/upload",
              formdata_foto3
            )
          ).data.url;
        } else {
          data.foto3 = "";
        }

        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          titulo: yup
            .string()
            .min(7, "Deve ter pelo menos 7 caracteres.")
            .max(40, "Deve ter no máximo 40 caracteres.")
            .required("Campo obrigatório."),
          nomeObjeto: yup
            .string()
            .ensure()
            .min(2, "Deve ter pelo menos 2 caracteres.")
            .max(40, "Deve ter no máximo 40 caracteres.")
            .required("Campo obrigatório."),
          categoria: yup.string().ensure(),
          estadoConservacao: yup.string().ensure(),
          foto1: yup.string().required("Campo obrigatório."),
          foto2: yup.string().required("Campo obrigatório."),
          foto3: yup.string().required("Campo obrigatório."),
          descricao: yup
            .string()
            .min(10, "Deve ter pelo menos 10 caracteres.")
            .max(200, "Deve possuir no máximo 200 caracteres.")
            .required("Campo obrigatório."),
          itemDesejado: yup
            .string()
            .min(6, "Deve ter pelo menos 6 caracteres. ")
            .max(80, "Deve possuir no máximo 80 caracteres.")
            .required("Campo obrigatório."),
          valorEstimado: yup
            .number()
            .integer("Apenas valores inteiros.")
            .min(0, "Deve ter valor maior que 0")
            .max(10000, "Deve ter valor menor que 10000")
            .required("Campo obrigatório.")
            .typeError("O valor informado deve ser um número. Sem vírgula."),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        data.destaque = false;
        data.destaqueExpira = new Date("01/01/2099");

        await api.post("/anuncios", data);
        alert("Anuncio criado com successo!");

        foto1var = undefined;
        foto2var = undefined;
        foto3var = undefined;

        history.push("/");
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          console.log("error " + err.inner);

          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          update = update + 1;
          return;
        }
      }
    },
    [history, update]
  );

  return (
    <div>
      <Header />

      <Container>
        <Background />
        <Content>
          <AnimationContainer>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <TituloPagina>Cadastre seu item </TituloPagina>
              <SubTituloPagina> Titulo do anúncio * </SubTituloPagina>
              <InputCriarAnuncio
                name="titulo"
                icon={FiType}
                placeholder=" Ex: Bumerangue dourado novo, Bolsa em bom estado, ... "
              />
              <SubText text="Título que será exibido no site. Pelo menos 7 caracteres." />

              <SubTituloPagina> Nome do objeto * </SubTituloPagina>
              <Input
                name="nomeObjeto"
                icon={FiSquare}
                placeholder=" Ex: Bumerangue, Bolsa, ..."
              />
              <SubText text="Nome do objeto ofertado. Pelo menos 2 caracteres." />

              <SubTituloPagina> Categoria * </SubTituloPagina>
              <Select
                name="categoria"
                icon={FiSquare}
                placeholder=""
                options={categorias}
                defaultValue={categorias[0]}
              ></Select>
              <SubText text="Categoria a qual pertence seu objeto." />

              <SubTituloPagina> Estado de conservação * </SubTituloPagina>
              <Select
                name="estadoConservacao"
                icon={FiSquare}
                options={estadosConservacao}
                defaultValue={estadosConservacao[0]}
              ></Select>
              <SubText text="Estado de conservação em qual se encontra seu objeto." />

              <SubTituloPagina> Fotos * </SubTituloPagina>

              <Input
                type="file"
                name="foto1"
                accept="image/*"
                onChange={foto1Update}
              />

              <Input
                type="file"
                name="foto2"
                accept="image/*"
                onChange={foto2Update}
              />

              <Input
                type="file"
                name="foto3"
                accept="image/*"
                onChange={foto3Update}
              />

              <SubText text="Fotos do objeto. Mínimo três. Tamanho máximo por foto: 5mb." />

              <SubTituloPagina> Descrição * </SubTituloPagina>
              <Input
                name="descricao"
                icon={FiAlignJustify}
                placeholder=" Ex: 'Altura: 30cm, Largura: ...'"
              ></Input>
              <SubText text="Informações sobre o objeto. Pelo menos 10 caracteres." />

              <SubTituloPagina> Itens desejados em troca * </SubTituloPagina>
              <Input
                name="itemDesejado"
                icon={FiBox}
                placeholder="Ex: Tênis, Estilingue, ..."
              ></Input>
              <SubText text="Itens que gostaria de receber em troca. Mínimo 6 caracteres." />

              <SubTituloPagina> Valor estimado * </SubTituloPagina>

              <Input
                name="valorEstimado"
                icon={FiDollarSign}
                placeholder="Ex: 30"
              ></Input>
              <SubText text="Valor estimado do seu objeto em reais. Entre 0 e 10000 reais. Apenas valores inteiros." />
              <br />

              <b>
                <SubText text="Campos com um * no nome são obrigatórios." />
              </b>

              <ButtonStyled name="submitButton" type="submit">
                Criar anúncio
              </ButtonStyled>
            </Form>
          </AnimationContainer>
        </Content>
      </Container>

      <ExibirPropaganda />
    </div>
  );
};

export default CreateExchangeAd;
