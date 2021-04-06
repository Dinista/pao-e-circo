import React, { useCallback, useRef } from "react";
import Header from "../../components/Header";

interface IState {
  logado?: boolean;
  id?: string;
}

const Perfil: React.FC = (props: any) => {
  const { id } = (props.location && props.location.state) || {};

  return (
    <>
      <Header state={props.location.state} />
      <p>{id}</p>
    </>
  );
};

//styles

export default Perfil;
