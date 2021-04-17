import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { IconBaseProps } from "react-icons";
import { useField } from "@unform/core";
import { Container } from "./styles";
import "./styles.css";
import { BsExclamationCircle } from "react-icons/bs";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);

  //use states
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  //functions
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    //se o inputref tiver valor, seta true, senão, seta false
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // useeffects
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div className="issoai">
      <Container isFilled={isFilled} isFocused={isFocused} isErrored={!!error}>
        {Icon && <Icon size={20} />}
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
        {error && (
          <BsExclamationCircle className="iconeErro"></BsExclamationCircle>
        )}
      </Container>
      {error && <div className="erro">{error}</div>}
    </div>
  );
};

export default Input;
