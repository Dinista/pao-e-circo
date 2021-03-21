import styled, { keyframes } from "styled-components";
import { shade } from "polished";
import Select from "../../components/Select";
import Button from "../../components/Button"

export const TituloPagina = styled.h1`
  color: #93130d; 
  margin-top: 70px; 
  font-family:Arial, Helvetica, sans-serif;
  margin-left: 30px; 
  text-shadow: 3px 3px 3px pink; 
`;

export const Container = styled.div`
  height: 90vh;
  display: flex;
  width: 70vw;
`;

export const ButtonStyled = styled(Button)`
  width: 110%;
  
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  
  justify-content: center;

  width: 100%;
  max-width: 700px;
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

  h1 {
    margin-bottom: 24px;
    text-align: center; 
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

export const Background = styled.div`
  flex: 1;
  background-size: cover;
`;

export const CustomDiv = styled.div`
  border-radius: 10px;
  border: 2px solid black;
  padding: 8px;
  width: 105%;
  margin-top: 6px;
  margin-bottom: -7px;
`; 

export const BoxTitle = styled.p`
  text-justify: center;
  margin-top: -0.24rem; 
  margin-bottom: 0.4rem;
  margin-left: 0.5rem; 
  text-align: left;
`;