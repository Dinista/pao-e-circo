import React, { useCallback, useRef } from "react";
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
  SubTituloPagina,
  TituloPagina,
} from "./styles";
import Select from "../../components/Select";
import SubText from "../../components/Subtext";
import { BoxTitle, ButtonStyled } from "./styles";
import Header from "../../components/Header";
import ExibirPropaganda from "../../components/ExibirPropaganda";
import getValidationErrors from "../../utils/getValidationErrors";

interface CreateExchangeAdFormData {
  titulo: string;
  objeto: string;
  cliente: string;
  categoria: string;
  estadoConservacao: string;
  foto1: string;
  foto2: string;
  foto3: string;
  descricao: string;
  itensDesejados: string;
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

const CreateExchangeAd: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  var update = 0; 
  //funções
  const handleSubmit = useCallback(
    async (data: CreateExchangeAdFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          titulo: yup.string().min(7, "Deve ter pelo menos 7 caracteres.").required("Campo obrigatório."),
          objeto: yup.string().min(2, "Deve ter pelo menos 2 caracteres.").required("Campo obrigatório."),
          categoria: yup.string().required("Campo obrigatório."),
          estadoConservacao: yup.string().required("Campo obrigatório."),  
          descricaoObjeto: yup.string().min(10, "Deve ter pelo menos 10 caracteres.").required("Campo obrigatório."),
          itensDesejados: yup.string().min(6, "Deve ter pelo menos 6 caracteres. ").required("Campo obrigatório."),
          valorEstimado: yup.number().min(0, "Deve ter valor maior que 0").max(10000, "Deve ter valor menor que 10000").required("Campo obrigatório.").typeError("O valor informado deve ser um número"),    
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        data.destaque = false;
        data.destaqueExpira = new Date("01/01/2099");
        data.cliente = localStorage.getItem("loginid") || "";

        await api.post("/anuncios", data);
        alert("Anuncio criado com successo!");

        history.push("/");
        console.log(data);
      } catch (err) {
        console.log("rapaz " + err);
        
        
        if(err instanceof yup.ValidationError) {
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
              <Input
                name="titulo"
                icon={FiType}
                placeholder=""
              />
              <SubText text="Título que será exibido no site. Ex: 'Bumerangue dourado novo'." />

              <Input
                name="objeto"
                icon={FiSquare}
                placeholder="Nome do objeto *"
              />
              <SubText text="Nome do objeto ofertado. Ex: 'Bumerangue Dourado'." />

              <Select
                name="categoria"
                icon={FiSquare}
                placeholder="Categoria *"
                options={categorias}
              ></Select>
              <SubText text="Categoria a qual pertence seu objeto." />

              <Select
                name="estadoConservacao"
                icon={FiSquare}
                placeholder="Estado de conservação *"
                options={estadosConservacao}
              ></Select>
              <SubText text="Estado de conservação em qual se encontra seu objeto." />

              <BoxTitle> Fotos </BoxTitle>

              <Input
                name="foto1"
                icon={FiAlignJustify}
                placeholder="URL da foto 1*"
              ></Input>

              <Input
                name="foto2"
                icon={FiAlignJustify}
                placeholder="URL da foto 2*"
              ></Input>

              <Input
                name="foto3"
                icon={FiAlignJustify}
                placeholder="URL da foto 3*"
              ></Input>

              <SubText text="Link para as fotos do objeto. Mínimo três." />

              <Input
                name="descricaoObjeto"
                icon={FiAlignJustify}
                placeholder="Descrição do objeto *"
              ></Input>
              <SubText text="Informações sobre o objeto. Ex: 'Altura: 30cm, Largura: ...'." />

              <Input
                name="itensDesejados"
                icon={FiBox}
                placeholder="Itens desejados em troca *"
              ></Input>
              <SubText text="Itens que gostaria de receber em troca. Ex: 'Tênis, Estilingue'." />

              <Input
                name="valorEstimado"
                icon={FiDollarSign}
                placeholder="Valor estimado*"
              ></Input>
              <SubText text="Valor estimado do seu objeto em reais. Ex: '30'." />
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
