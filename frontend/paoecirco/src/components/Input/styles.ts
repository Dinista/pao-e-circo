import styled, { css } from "styled-components";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: black;
  border-radius: 10px;
  border: 2px solid black;
  padding: 16px;
  width: 100%;
  color: #666360;
  transition: all 1s;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
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
    margin-right: 16px;
  }
`;
