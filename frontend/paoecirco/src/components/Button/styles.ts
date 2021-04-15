import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.button`
  margin-top: 2vh;
  box-shadow: 0 5px 0 #c72060;
  background-color: #ff587c;
  border-color: rgb(255, 50, 94);
  width: 100%;
  height: 45px;
  border-radius: 4px;
  color: white;
  border: 0px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
  box-shadow: 0 5px 0 #0e0e0e;
  background-color: rgb(53, 53, 53);
  border-color: rgb(0, 0, 0);
  border-width: 1px;
  color: white;
  }
`;
