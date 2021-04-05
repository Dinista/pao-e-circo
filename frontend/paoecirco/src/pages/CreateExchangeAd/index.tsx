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
  TituloPagina,
} from "./styles";
import ImageInput from "../../components/ImageInput";
import Select from "../../components/Select";
import SubText from "../../components/Subtext";
import { CustomDiv, BoxTitle, ButtonStyled } from "./styles";
import Header from "../../components/Header";
import ExibirPropaganda from "../../components/ExibirPropaganda";
import { inputCSS } from "react-select/src/components/Input";

interface CreateExchangeAdFormData {
  titulo: string;
  objeto: string;
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

  //funções
  const handleSubmit = useCallback(
    async (data: CreateExchangeAdFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          /*
          titulo: yup.string().min(10).required("Título do anúncio obrigatório"),
          
          objeto: yup.string().min(2).required("Nome do objeto obrigatório"),
          
          categoria: yup.string().required("Categoria do objeto obrigatória"),
          
          estadoConservacao: yup.string().required("Estado de conservação do objeto obrigatória"),
          /*
          imageInput1: yup.mixed().test('fileSize', "File Size is too large", value => value.size <= fileSize)
            .test('fileType', "Unsupported File Format", value => fileType.includes(value.type) ),
          imageInput2: yup.mixed().test('fileSize', "File Size is too large", value => value.size <= fileSize)
            .test('fileType', "Unsupported File Format", value => fileType.includes(value.type) ),
          imageInput3: yup.mixed().test('fileSize', "File Size is too large", value => value.size <= fileSize)
            .test('fileType', "Unsupported File Format", value => fileType.includes(value.type) ),
          
          descricaoObjeto: yup.string().min(6).required("Descrição obrigatória"),
          
          itensDesejados: yup.string().min(6).required("Itens desejados em troca obrigatório"),

          valorEstimado: yup.number().min(0).max(10000).required("Valor estimado obrigatório"),
          */
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        
        data.destaque = false;
        data.destaqueExpira = new Date("01/01/2099");

        await api.post("/anuncios", data);
        alert("anuncio criado com sucesso");
        history.push("/");
        console.log(data);
      } catch (err) {
        console.log("errozao!");

        //se for um erro do yup, tipo não digitou senha, email inválido, etc

        if (err instanceof yup.ValidationError) {
          return;
        }
      }
    },
    [history]
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

              <Input
                name="titulo"
                icon={FiType}
                placeholder="Titulo do anúncio *"
              />
              <SubText text="Título que será exibido no site. Ex: 'Bumerangue dourado novo'." />

              <Input
                name="nomeObjeto"
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
                name="descricao"
                icon={FiAlignJustify}
                placeholder="Descrição do objeto *"
              ></Input>
              <SubText text="Informações sobre o objeto. Ex: 'Altura: 30cm, Largura: ...'." />

              <Input
                name="itemDesejado"
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
