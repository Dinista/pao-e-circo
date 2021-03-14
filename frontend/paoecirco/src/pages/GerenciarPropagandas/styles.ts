import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  place-items: center;
`;

export const AnuncioCard = styled.div`
  box-shadow: 1px 1px 1px 1px purple;
  display: flex;
  flex-direction: column;
  width: 400px;
  font-weight: bold;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const DivComum = styled.div`
  font-weight: bold;
`;

export const ImgContainer = styled.img`
  height: 150px;
  width: 280px;
`;
