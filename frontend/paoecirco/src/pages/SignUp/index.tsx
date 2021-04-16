import React, { useCallback, useRef } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi";
import { FaBirthdayCake, FaCity } from "react-icons/fa";
import { GiConsoleController, GiMailbox } from "react-icons/gi";
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
  cpf: string;
  endereco: string;
  estado: string;
  cidade: string;
  senha: string;
  dataNasc: string; 
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
          name: yup.string().required("Nome origatório."),
          cpf: yup.string().matches(/^\d+$/, 'Apenas digitos.').min(11, "No mínimo 11 dígitos."),
          email: yup.string().required("E-mail obrigatório.").email("E-mail inválido."),
          dataNasc: yup.string().required("Data de nascimento necessária."),
          senha: yup.string().min(6, "No mínimo 6 dígitos."),
          endereco: yup.string().required("Endereço obrigatório."),
          estado: yup.string().required("Estado obrigatório."),
          cidade: yup.string().required("Cidade obrigatória."),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        //console.log("bugou");
        try {
          await api.post("/clientes", data);
          history.push("/signin");
        } catch (e) {
          console.log(e.response.data.Erro)
          formRef.current?.setErrors({email: e.response.data.Erro});
        };
      } catch (err) {
        const listaError = {
          name: "",
          email: "",
          cpf: "",
          endereco: "",
          estado: "",
          cidade: "",
          senha: "",
          dataNasc: "" }
        //se for um erro do yup, tipo não digitou titulo, escolheu categoria, etc
        if (err instanceof yup.ValidationError) {
          err.inner.forEach(erro =>{
            if(erro.path === "name"){
              listaError["name"] = erro.message
            }
            if(erro.path === "email"){
              listaError["email"] = erro.message
            }
            if(erro.path === "cpf"){
              listaError["cpf"] = erro.message
            }
            if(erro.path === "endereco"){
              listaError["endereco"] = erro.message
            }
            if(erro.path === "estado"){
              listaError["estado"] = erro.message
            }
            if(erro.path === "cidade"){
              listaError["cidade"] = erro.message
            }
            if(erro.path === "senha"){
              listaError["senha"] = erro.message
            }
            if(erro.path === "dataNasc"){
              listaError["dataNasc"] = erro.message
            }
          });
          formRef.current?.setErrors(listaError);
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
                className = "dataNasc"
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
            <FiArrowLeft />
            Já tem uma conta?
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
