import React, { useCallback, useRef } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiArrowLeft } from "react-icons/fi";
import { MdWork } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { AiFillFileImage } from "react-icons/ai";
import Input from "../../components/Input/index";
import Button from "../../components/Button/index";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { AnimationContainer, Container, Content } from "./styles";
import Header from "../../components/Header";
import ExibirPropaganda from "../../components/ExibirPropaganda";

interface SignUpFormData {
  name: string;
  email: string;
  cpf: number;
  endereco: string;
}

const CriaPropaganda: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  //funções
  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          imageName: yup.string().required("Nome origatório"),
          empresaContratante: yup.string().required("Empresa obrigatória"),
          dataExpiracao: yup.string().required("Data de expiracao necessária"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/propaganda", data);
        alert("Propaganda registrada com sucesso");

        history.push("/gerenciarpropaganda");
      } catch (err) {
        //se for um erro do yup, tipo não digitou titulo, escolheu categoria, etc
        if (err instanceof yup.ValidationError) {
          return;
        }
      }
    },
    [history]
  );

  return (
    <>
      <Header />
      <Container>
        <Content>
          <AnimationContainer>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu cadastro </h1>
              <Input
                name="imageName"
                icon={AiFillFileImage}
                placeholder="Nome"
              ></Input>
              <Input
                name="empresaContratante"
                icon={MdWork}
                placeholder="Empresa contratante"
              ></Input>
              <Input
                name="dataExpiracao"
                icon={FaBirthdayCake}
                placeholder="Data de expiração"
                type="date"
              ></Input>

              <Button name="submitButton" type="submit">
                Cadastrar
              </Button>
            </Form>

            <Link to="/gerenciarpropagandas">
              Gerenciar propagandas
              <FiArrowLeft />
            </Link>
          </AnimationContainer>
        </Content>
      </Container>
      <ExibirPropaganda />
    </>
  );
};

//styles

export default CriaPropaganda;
