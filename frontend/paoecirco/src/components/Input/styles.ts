import styled, { css } from "styled-components";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 5px;
  border: 1px solid lightgrey;
  padding: 16px;
  margin-top: 10px;
  margin-bottom: 7px;
  height: 10px;
  color: #666360;
  transition: all 1s;
  display: flex;
  align-items: center;
  color: grey;
  & + div {
    margin-top: 8px;
  }
  ${(props) =>
    props.isErrored &&
    css`
      border-color: red;
      color: #c53030;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}
  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
      .dataNasc {
        color: black;
      }
    `}
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: black;
    &::placeholder {
      color: black;
    }
    & + input {
      margin-top: 8px;
    }
  }
  svg {
    margin-right: 1px;
  }
`;
