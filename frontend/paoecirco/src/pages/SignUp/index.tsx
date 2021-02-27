import React, { useCallback, useRef } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import Input from "../../components/Input/index";
import Button from "../../components/Button/index";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { AnimationContainer, Background, Container, Content } from "./styles";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
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
          email: yup.string().required("E-mail obrigatório").email(),
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
            <h1>Faça seu cadastro </h1>
            <Input name="name" icon={FiUser} placeholder="Nome"></Input>
            <Input name="email" icon={FiMail} placeholder="E-mail"></Input>
            <Input
              name="password"
              icon={FiLock}
              placeholder="Senha"
              type="password"
            ></Input>
            <Button name="submitButton" type="submit">
              Cadastrar
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

export default SignUp;
