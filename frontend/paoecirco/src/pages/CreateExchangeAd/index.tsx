import React, { useCallback, useRef } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiArrowLeft, FiType, FiAlignJustify, FiBox, FiDollarSign, FiSquare} from "react-icons/fi";
import Input from "../../components/Input/index";
import Button from "../../components/Button/index";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { AnimationContainer, Background, Container, Content } from "./styles";
import ImageInput from "../../components/ImageInput";
import Select from "../../components/Select";

interface CreateExchangeAdFormData {
  titulo: string;
  objeto: string;
  categoria: string;
  estadoConservacao: string;
  foto1: File;
  foto2: File;
  foto3: File;
  descricao: string;
  itensDesejados: string;
  valorEstimado: number;
}

const categorias = [
  { value: 'brinquedo', label: 'Brinquedo' },
  { value: 'ferramenta', label: 'Ferramenta' },
  { value: 'instrumentoMusical', label: 'Instrumento Musical' },
  { value: 'materialEscolar', label: 'Material Escolar' },
  { value: 'eletronico', label: 'Eletrônico' },
  { value: 'movel', label: 'Móvel' },
  { value: 'vestuario', label: 'Vestuário' },
  { value: 'decoracao', label: 'Decoração' },
  { value: 'outros', label: 'Outros' },
];

const fileSize = 10
const fileType = [
  { value: 'image/jpg', label: 'jpg'},
  { value: 'img/jpeg', label: 'jpeg'},
  { value: 'image,png', label: 'png'}
];

const estadosConservacao = [
  { value: 'novo', label: 'Novo' },
  { value: 'semiNovo', label: 'Semi-novo' },
  { value: 'usado', label: 'Usado' },
];

const CreateExchangeAd: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  
  //funções
  const handleSubmit = useCallback(
    async (data: CreateExchangeAdFormData) => {
      try {
        formRef.current?.setErrors({});
        /*
        const schema = yup.object().shape({
          titulo: yup.string().min(10).required("Título do anúncio obrigatório"),
          
          objeto: yup.string().min(2).required("Nome do objeto obrigatório"),
          
          categoria: yup.string().required("Categoria do objeto obrigatória"),
          
          estadoConservacao: yup.string().required("Estado de conservação do objeto obrigatória"),
          
          imageInput1: yup.mixed().test('fileSize', "File Size is too large", value => value.size <= fileSize)
            .test('fileType', "Unsupported File Format", value => fileType.includes(value.type) ),
          imageInput2: yup.mixed().test('fileSize', "File Size is too large", value => value.size <= fileSize)
            .test('fileType', "Unsupported File Format", value => fileType.includes(value.type) ),
          imageInput3: yup.mixed().test('fileSize', "File Size is too large", value => value.size <= fileSize)
            .test('fileType', "Unsupported File Format", value => fileType.includes(value.type) ),
          
          descricaoObjeto: yup.string().min(6).required("Descrição obrigatória"),
          
          itensDesejados: yup.string().min(6).required("Itens desejados em troca obrigatório"),

          valorEstimado: yup.number().min(0).max(10000).required("Valor estimado obrigatório"),
        });
        

        await schema.validate(data, {
          abortEarly: false,
        });
        */

        await api.post("/anuncios", data);

        // history.push('/signin');
        console.log(data);
      } catch (err) {
        //se for um erro do yup, tipo não digitou senha, email inválido, etc
        if (err instanceof yup.ValidationError) {
          return;
        }
      }
    },
    [history]
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            
            <h1>Cadastre seu item </h1>
            
            <Input name="titulo" icon={FiType} placeholder="Titulo do anúncio"></Input>
            
            <Input name="objeto" icon={FiSquare} placeholder="Nome do objeto"></Input>
      
            <Select name="categoria" icon={FiSquare} placeholder="Selecione a categoria" options={categorias}></Select>

            <Select name="estadoConservacao" icon={FiSquare} placeholder="Selecione o estado de conservação" options={estadosConservacao}></Select>

            <ImageInput name="imageInput1"></ImageInput>
            <ImageInput name="imageInput2"></ImageInput>
            <ImageInput name="imageInput3"></ImageInput>

            <Input name="descricao" icon={FiAlignJustify} placeholder="Descrição do objeto"></Input>

            <Input name="itensDesejados" icon={FiBox} placeholder="Itens desejados em troca"></Input>

            <Input name="valorEstimado" icon={FiDollarSign} placeholder="Valor estimado do produto oferecido"></Input>

            <Button name="submitButton" type="submit">
              Criar anúncio
            </Button>
          
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

//styles

export default CreateExchangeAd;
