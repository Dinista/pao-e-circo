/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Form,
  TextField,
  SelectField,
  SubmitButton,
} from "../../components/FormElements/index";
import "./styles.css";

import { Link } from "react-router-dom";
import * as Yup from "yup";
import Header from "../../components/Header";
import { Field, Formik, useFormik } from "formik";
import api from "../../services/api";
import { date } from "yup/lib/locale";

const SignUp: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      cpf: "",
      dataNasc: "",
      endereco: Date.UTC,
      cidade: "",
      estado: "",
      email: "",
      senha: "",
    },
    onSubmit(values) {
      console.log(values);
    },
  });

  const Schema = Yup.object().shape({
    name: Yup.string().required("Este campo é obrigatório"),
    cpf: Yup.number().required("Este campo é obrigatório"),
    endereco: Yup.string().required("Este campo é obrigatório"),
    password: Yup.string().required("Este campo é obrigatório"),
    email: Yup.string().required("Este campo é obrigatório"),
    changepassword: Yup.string().when("password", {
      is: (val: string | any[]) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "As senhas precisam ser iguais"
      ),
    }),
  });

  return (
    <>
      <Header />
      <div className="signupGrid">
        <Form
          enableReinitialize
          initialValues={formik}
          placeholder="ae"
          label="signup"
          name="signup"
          validationSchema={Schema}
        >
          <div className="nomeSignupContainer">
            <TextField
              name="name"
              onchange={formik.handleChange}
              value={formik.values.name}
              label="Nome"
              placeholder="Ex: Benjamin Arrola"
            />
          </div>

          <div className="cpfdatanascContainer">
            <TextField
              name="cpf"
              label="Cpf"
              placeholder="Ex: 09433365412"
              onchange={formik.handleChange}
              value={formik.values.cpf}
            />
            <div className="tituloDataNascSignup">Data de nascimento</div>
            <Field
              name="staticDate"
              inputVariant="outlined"
              label="Static Date"
              type="date"
              onchange={formik.handleChange}
              value={formik.values.dataNasc}
              format="MM/dd/yyyy"
              helperText="No timezone specified"
              className="datePickerSignup"
              returnDateOnly
              clearable
            />
            <TextField
              name="endereco"
              placeholder="Ex: Rua Jatobá, 6969"
              label="Endereço"
              onchange={formik.handleChange}
              value={formik.values.endereco}
            />

            <SelectField
              name="estado"
              label="Estado"
              onchange={formik.handleChange}
              value={formik.values.estado}
              options={[
                {
                  label: "Acre",
                  value: "AC",
                },
                {
                  label: "Alagoas",
                  value: "AL",
                },
                {
                  label: "Amapá",
                  value: "AP",
                },
                {
                  label: "Amazonas",
                  value: "AM",
                },
                {
                  label: "Bahia",
                  value: "BA",
                },
                {
                  label: "Ceará",
                  value: "CE",
                },
                {
                  label: "Distrito Federal",
                  value: "DF",
                },
                {
                  label: "Espírito Santo",
                  value: "ES",
                },
                {
                  label: "Goiás",
                  value: "GO",
                },
                {
                  label: "Maranhão",
                  value: "MA",
                },
                {
                  label: "Mato Grosso",
                  value: "MT",
                },
                {
                  label: "Mato Grosso do Sul",
                  value: "MS",
                },
                {
                  label: "Minas Gerais",
                  value: "MG",
                },
                {
                  label: "Pará",
                  value: "PA",
                },
                {
                  label: "Paraíba",
                  value: "PB",
                },
                {
                  label: "Paraná",
                  value: "PR",
                },
                {
                  label: "Pernambuco",
                  value: "PE",
                },
                {
                  label: "Piauí",
                  value: "PI",
                },
                {
                  label: "Rio de Janeiro",
                  value: "RJ",
                },
                {
                  label: "Rio Grande do Norte",
                  value: "RN",
                },
                {
                  label: "Rio Grande do Sul",
                  value: "RS",
                },
                {
                  label: "Rondônia",
                  value: "RO",
                },
                {
                  label: "Roraima",
                  value: "RR",
                },
                {
                  label: "Santa Catarina",
                  value: "SC",
                },
                {
                  label: "São Paulo",
                  value: "SP",
                },
                {
                  label: "Sergipe",
                  value: "SE",
                },
                {
                  label: "Tocantins",
                  value: "TO",
                },
              ]}
            />
            <TextField
              name="email"
              placeholder="Ex: JorginReiDelas69@hotmail.com"
              label="Email"
              onchange={formik.handleChange}
              value={formik.values.email}
            />
            <TextField
              name="senha"
              placeholder="••••••••"
              label="Senha"
              onchange={formik.handleChange}
              value={formik.values.senha}
            />
            <TextField
              name="confirmasenha"
              placeholder="••••••••"
              label="Confirme sua senha"
              onchange={formik.handleChange}
              value={formik.values.senha}
            />
          </div>

          <SubmitButton
            title="Enviar"
            className="submitButtonSignup"
            onClick={console.log(formik.values)}
          />
        </Form>
      </div>
    </>
  );
};

export default SignUp;
