import styled, { keyframes } from "styled-components";
import { shade } from "polished";
import Button from "../../components/Button";
import Input from "../../components/Input";

export const TituloPagina = styled.h1`
  color: #1e1e1e;
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 30px;
  text-shadow: 3px 3px 3px whitesmoke;
  margin-bottom: 24px;
  text-align: center;
  position: relative;
  right: 31px;
  
`;

export const Container = styled.div`
  margin: 0 auto;
  overflow: hidden;
  max-width: 450px;
  border-radius: 1rem;
  background-color: #e4e4e4;
  position: relative;
  top: 20px;
  margin-bottom: 10px;
`;

export const ButtonStyled = styled(Button)`
  width: 90%;
`;

export const Content = styled.div`
  position: relative;
  top: -70px;
  left: 12px;
  flex-direction: column;

  justify-content: center;
  
  width: 100%;
  max-width: 700px;
  max-height: 1350px;
  .AWcrW { // Select
    width: 90%;
  }

  .efEsQO { // Input area
    background: white;
    margin-bottom: -5px;
  }
`;

export const AppearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px)
  }
  to{
    opacity: 1;
    transform: translateX(0)
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${AppearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
  }


  a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: 02s;

    &:hover {
      color: ${shade(0.2, "#f4ede8")};
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: 02s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, "#ff9000")};
    }
  }
`;

export const InputCriarAnuncio = styled(Input)`
  size: 1000px;

`

export const Background = styled.div`
  flex: 1;
  background-size: cover;
`;

export const SubTituloPagina = styled.p`
  color: #000000;
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 10px;
  margin-bottom: -5px;
  text-shadow: 0px 0.5px gray;
`;
