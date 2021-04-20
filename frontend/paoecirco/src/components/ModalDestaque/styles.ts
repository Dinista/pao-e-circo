import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  flex-direction: column;
  h2 {
    color: black;
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  form {
    & + form {
      margin-top: 1rem;
    }
  }

  button {
    width: 25rem;
    justify-self: center;

    & input {
      margin-top: 10rem;
    }
  }
`;

export const ImagemContainer = styled.div`
  position: relative;
  display: flex;
  width: 32vw;
  align-items: center;
  z-index: 5;
`;

export const ButtonPropaganda = styled.button`
  position: relative;   
  z-index: 5;
  height: 50px;
  display: flex;
  width: 34px;
  justify-content: center;
  align-items: center;
  color: white;
  margin-left: 5px;
  background-color: #fd5c7f;
  font-size: 15px;
  border-radius: 5px;
`;
