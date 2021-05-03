import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";

export const StyledButton = styled(Button)`
  width: 90%;
`

export const StyledButtonWider = styled(Button)`
  position: relative;
  margin: 3px;
  width: 30%;
  margin-bottom: 15px; 
`

export const ExternalContainer = styled.div`
  position: relative;
  margin:auto;
  left: 12.5%;
  display: flex;
  
`;

export const ContainerFlexVertical = styled.div`
  background-color: #e4e4e4;
  width: 21rem;
  margin-top: 1rem;
  margin-bottom: 0.7rem;
  border-radius: 1rem;
  padding-top: 0.5rem;
  text-align: left;
  padding-left: 1.6rem;

`;

export const ContainerFlexVerticalWider = styled.div`
  background-color: #e4e4e4;
  width: 40rem;
  margin: 1rem 1rem 1rem 1rem;
  border-radius: 1rem;
  padding-top: 0.5rem;
  text-align: center;
  padding-left: 0.7rem;

  .h1 {
    font-size: px;
  }
`;

export const ContainerComments = styled.div`
  background-color: #e4e4e4;
  position: relative;
  max-width: 32.5%;
  left: 32.7%;
  border-radius: 1rem;
  padding-left: 2.7rem;
  padding-top: 0.3rem;

  .p {
    align-self: left;
  }

  .h2 {
    align-self: center;
  }

  .efEsQO {
    background-color: white;
  }

  .XspiS {
    position: relative;
    top: -12px;
}
`;

export const ContainerComment = styled.div`
  position:relative;
  margin-bottom: 5px;
  padding-left: 2rem;
  padding-bottom: 0.5rem;
  border-radius: 1px;
  border-style: dotted;
  border-color: #d3d3d3; 
  line-height: 6px;
  font-size: 1.3rem;
  width: 33.5rem;
`

export const DataComentario = styled.p`
  font-size: 0.9rem;
  margin-top: -0.3rem;
  padding-left: 3rem;

`

export const TextoComentario = styled.p`
  font-size: 1.1rem;
  padding-left: 1rem;
  margin-top: 1.5rem;
`

export const SliderBox= styled.div`
  position: relative;
  
  
`;

export const ComentarioHeader = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;

  .p {
    display: flex;
    padding-left: 10rem;
  }

`;


export const ImageContainer = styled.img`
  width: inherit;
  height: inherit;
  margin-left: -14px;
`;

export const ImageContainerComment = styled.img`
  width: 50px;
  height: 50px;
  margin: 5px;
`;

export const InputComment = styled(Input) `     
        position: relative;
        width: 100.5rem;

` 