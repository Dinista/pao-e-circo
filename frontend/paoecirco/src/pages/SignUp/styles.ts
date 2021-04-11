import styled, { keyframes } from "styled-components";
import { shade } from "polished";
export const Container = styled.div`
  display: grid;
  place-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    margin: 30px 0;
    width: 340px;
    text-align: center;
  }

  h1 {
    margin-bottom: 24px;
  }
  .dataNasc{
    color: grey;
  }
  a {
    color: #f4ede8;
    display: block;
    margin-top: 0px;
    text-decoration: none;
    transition: 02s;

    &:hover {
      color: ${shade(0.2, "#f4ede8")};
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 0px;
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
