import React, { useState } from "react";

import "./styles.css";
import {
  AiOutlineMail,
  AiFillLock,
  AiOutlineSound,
  AiOutlineDropbox,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import * as yup from "yup";

const CreateExchangeAd: React.FC = () => {
  return <div className="teste"></div>;
  /*function handleExchangeAdCreation() {}

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const onSubmit = (
    values: any,
    { setSubmitting, resetForm, setStatus }: any
  ) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="CreateExchangeAd">
      <Form
        enableReinitialize
        initialValues={formData}
        onSubmit={onSubmit}
        placeholder="ae"
        label="ea"
        name="es"
      >
        <div>
          <TextField
            name="name"
            label="Name"
            placeholder="aeae"
            onchange=""
            value=""
          />
        </div>

        <div>
          <TextField
            name="email"
            label="Email"
            placeholder=""
            onchange=""
            value=""
          />
        </div>

        <div>
          <SelectField
            name="role"
            label="Role"
            options={[
              {
                label: "Admin",
                value: "admin",
              },
              {
                label: "User",
                value: "user",
              },
            ]}
          />
        </div>

        <SubmitButton title="Submit" />
      </Form>
    </div>
*/
  /*
    <div className="createExchangeAdContainer">
      <div className="createExchangeAdLogoContainer">
        <img src={logo} alt="logo" />
      </div>

      <h1>Criar Anúncio</h1>
        
      <div className="formsContainer">

        <div className="tituloAnuncioContainer">
          <div className="tituloAnuncioTextoIconeContainer">
            <AiOutlineSound className="tituloIcon" />
            Título do Anúncio
          </div>
          <input
            type="text"
            name="tituloAnuncioInput"
            id="TituloAnuncioInput"
            placeholder="ex: Sapato social em bom estado, Luva azul semi-nova" 
          />        
        </div>

        <div className="objetoContainer">
          <div className="objetoTextoIconeContainer">
            <AiOutlineDropbox className="objetoIcon" />
            Objeto
          </div>
          <input
            type="text"
            name="objetoInput"
            id="objetoInput"
            placeholder="ex: Sapato, Luva" 
          />        
        </div>

        <div className="categoriaContainer">
          <div className="categoriaTextoIconeContainer">
            <AiOutlineDropbox className="categoriaIcon" />
            Categoria
          </div>
          <select id="categoria">
            <option value="val0"> Selecione</option>
            <option value="val1"> Brinquedo</option>
            <option value="val2"> Decorações</option>
            <option value="val3"> Eletrônico</option>
            <option value="val4"> Ferramenta</option>
            <option value="val5"> Instrumento Musical</option>
            <option value="val6"> Material Escolar</option>
            <option value="val7"> Móvel</option>
            <option value="val8"> Vestuário</option>
            <option value="val9"> Outros</option>
          </select>
        </div>

        <div className="estadoConservacaoContainer">
          <div className="estadoConservacaoTextoIconeContainer">
            <AiOutlineDropbox className="estadoConservacaoIcon" />
            Estado de Conservacao
          </div>
          <select id="estadoConservacao">
            <option value="val0"> Selecione</option>
            <option value="val1"> Novo</option>
            <option value="val2"> Semi-novo</option>
            <option value="val3"> Usado</option>
          </select> 
        </div>

        <div className="fotosContainer">
          <div className="fotosTextoIconeContainer">
            <AiOutlineDropbox className="fotosIcon" />
            Fotos
          </div>
          <div className="file1">
            <input
              type="file"
              name="fotoInput1"
              id="fotoInput1"
            />    
          </div>
          <div className="file2">
            <input
              type="file"
              name="fotoInput2"
              id="fotoInput2"
            />        
          </div>
          <div className="file3">
            <input
              type="file"
              name="fotoInput3"
              id="fotoInput3"
            />    
          </div>
        </div>
        
        <div className="_Container">
          <div className="_TextoIconeContainer">
            <AiOutlineDropbox className="_Icon" />
            _
          </div>
          <input
            type="text"
            name="_Input"
            id="_Input"
            placeholder="ex: Sapato, Luva" 
          />        
        </div>

      

      </div>

      <div className="inputLoginContainer">
        <div className="emailLoginInputContainer">
          <div className="somaisumcontainerlogin">
            <AiOutlineMail className="emailLoginIcon" />
            E-mail
          </div>

          <input
            type="text"
            name="inputLogin"
            id="inputLogin"
            placeholder="exemplo@email.com"
            className="inputLogin"
          />
        </div>
      </div>

      <div className="inputLoginContainer">
        <div className="emailLoginInputContainer">
          <div className="somaisumcontainerlogin2">
            <AiFillLock className="senhaLoginIcon" />
            Senha
          </div>

          <input
            type="password"
            name="inputLogin"
            id="inputLogin"
            placeholder="•••••••••••"
            className="inputLogin"
          />
        </div>
      </div>
      <Link to="/forgot" className="linkEsqueciASenha">
        Não consegue entrar?
      </Link>

      <button className="buttonLogin" onClick={handleExchangeAdCreation}>
        Criar
      </button>

      <Link to="/signup" className="linkSignupSignin">
        Não tem conta?
      </Link>
    </div>
    */
};

export default CreateExchangeAd;
