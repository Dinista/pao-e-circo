import React from "react";
import Header from "../../components/Header";

const Perfil: React.FC = () => {
  const loginId = localStorage.getItem("loginid");

  return (
    <>
      <Header />
      <p>{loginId}</p>
    </>
  );
};

//styles

export default Perfil;
