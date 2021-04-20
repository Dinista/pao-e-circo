import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    align-self: center;
    color: black;
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.2rem;
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

export const Ptwo = styled.p` 
  font-size: 1rem;
  color: gray;
`;