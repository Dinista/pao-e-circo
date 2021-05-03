
import styled from "styled-components";
import Select from "../Select";

export const Container = styled.div`
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
    margin: 1rem;

    & input {
      margin-top: 10rem;
      padding-right: -2rem;
    }
  }
`;

export const ImagemContainer = styled.div`
  display: flex;
  width: 32vw;
  align-items: center;
`;

export const ButtonPropaganda = styled.button`
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

export const StyledSelect = styled(Select)`
  width: auto;
`