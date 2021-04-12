import styled, { keyframes } from "styled-components";
import { shade } from "polished";
import Button from "../../components/Button";

export const TituloPagina = styled.h1`
  color: #93130d;
  margin-top: 70px;
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 30px;
  text-shadow: 3px 3px 3px pink;
`;

export const Container = styled.div`
  margin: 0 auto;
  overflow: hidden;
  max-width: 500px;
  margin-top: -100px;
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

export const BoxTitle = styled.p`
  text-justify: center;

  margin-top: 0.7rem;
  margin-bottom: -0.3rem;
  margin-left: 0.5rem;
  text-align: left;
  font-weight: 600;
`;

export const SubTituloPagina = styled.p`
  color: #000000;
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 10px;
  margin-bottom: -5px;
  text-shadow: 0px 0.5px gray;
`;
