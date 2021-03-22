import React, { useCallback, useRef } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi";
import { FaBirthdayCake, FaCity } from "react-icons/fa";
import { GiMailbox } from "react-icons/gi";
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
  estado: string;
  cidade: string;
  senha: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  //funções
  const handleSubmit = useCallback(
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
              <Input name="name" icon={FiUser} placeholder="Nome"></Input>
              <Input name="email" icon={FiMail} placeholder="E-mail"></Input>
              <Input
                name="cpf"
                icon={HiOutlineIdentification}
                placeholder="CPF"
              ></Input>
              <Input
                name="dataNasc"
                icon={FaBirthdayCake}
                placeholder="Data de nascimento"
                type="date"
              ></Input>
              <Input
                name="endereco"
                icon={GiMailbox}
                placeholder="Endereço"
              ></Input>
              <Input name="cidade" icon={FaCity} placeholder="Cidade"></Input>
              <Input name="estado" icon={FaCity} placeholder="Estado"></Input>
              <Input
                name="senha"
                icon={FiLock}
                placeholder="Senha"
                type="password"
              ></Input>

              <Button name="submitButton" type="submit">
                Cadastrar
              </Button>
            </Form>

            <Link to="/signin">
              Já tem uma conta?
              <FiArrowLeft />
            </Link>
          </AnimationContainer>
        </Content>
        <ExibirPropaganda />
      </Container>
    </>
  );
};

//styles

export default SignUp;
