import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.button`
  background: #fd5c7f;
  height: 56px;
  border: 0;
  color: #312e38;
  font-weight: bold;
  font-size: 18px;
  margin-top: 16px;
  border-radius: 10px;
  padding: 0 16px;
  width: 80%; 
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, "#ff9000")};
  }
`;
