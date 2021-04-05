import React, { ChangeEvent, useRef, useEffect, useCallback } from "react";
import { useField } from "@unform/core";
import "./styles.css";
interface Props {
  name: string;
}

type InputProps = JSX.IntrinsicElements["input"] & Props;
export default function ImageInput({ name, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField } = useField(name);
  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
    }
  }, []);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "files[0]",
      clearValue(ref: HTMLInputElement) {
        ref.value = "";
      },
      setValue(_: HTMLInputElement, value: string) {},
    });
  }, [fieldName, registerField]);
  return (
    <>
      <input
        className="inputImage"
        type="file"
        ref={inputRef}
        onChange={handlePreview}
        accept=".jpg,.png,.jpeg"
        {...rest}
      />
    </>
  );
}
