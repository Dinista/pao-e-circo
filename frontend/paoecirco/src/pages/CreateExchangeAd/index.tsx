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

const CreateExchangeAd: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  //funções
  const handleSubmit = useCallback(
    async (data: CreateExchangeAdFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          titulo: yup.string().required("Título do anúncio origatório"),
          objeto: yup.string().required("Nome do objeto obrigatório").email(),
          
          
          password: yup.string().min(6, "No mínimo 6 dígitos"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        //await api.post("/users", data);

        console.log(data);

        history.push("/signin");
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

          <Link to="/">
            Já tem uma conta?
            <FiArrowLeft />
          </Link>

        </AnimationContainer>
      </Content>
    </Container>
  );
};

//styles

export default CreateExchangeAd;
