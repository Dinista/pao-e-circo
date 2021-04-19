import React, { useCallback, useRef } from "react";
import Header from "../../components/Header";
import AvaliarDenunciaCard from "../../components/AvaliarDenunciaCard"

const AvaliarDenuncia: React.FC = () => {

  return (
    <>
      <Header />
        <AvaliarDenunciaCard
      anunciante = ""
      categoria = ""
      denunciante = ""
      descricao = ""
      idAnuncio = ""
      imagem = "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      nomeAnuncio = ""
      numDenuncias = {1234}
        />
    </>
  );
};

//styles

export default AvaliarDenuncia;
