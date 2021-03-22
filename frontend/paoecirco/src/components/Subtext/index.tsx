import React, { TextareaHTMLAttributes } from "react";
import { SubtextStyled } from "./styles";

interface SubtextProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
   text: string;
}

const SubText: React.FC<SubtextProps> = ({text, ...rest}) => {
    return (
        <SubtextStyled> {text} </SubtextStyled>
    );
};

export default SubText;