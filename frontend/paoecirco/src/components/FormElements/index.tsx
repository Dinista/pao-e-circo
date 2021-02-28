import React from "react";
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  useFormikContext,
} from "formik";
import "./styles.css";

interface TextFieldProps {
  name: string;
  label: string;
  placeholder: string;
  onchange: any;
  value: any;
}

export function TextField(props: TextFieldProps) {
  const { name, label, placeholder, onchange, value, ...rest } = props;
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        className="form-control"
        type="text"
        name={name}
        onChange={onchange}
        value={value}
        id={name}
        placeholder={placeholder || ""}
        {...rest}
      />
      <ErrorMessage
        name={name}
        render={(msg: React.ReactNode) => (
          <div style={{ color: "red" }}>{msg}</div>
        )}
      />
      
    </>
  );
}

export function Form(props: any) {
  return (
    <Formik {...props}>
      <FormikForm className="needs-validation">
        {props.children}
      </FormikForm>
    </Formik>
  );
}

export function SelectField(props: any) {
  const { name, label, options } = props;
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <Field as="select" id={name} name={name} className="fieldFormContainer">
        <option value="">Escolha...</option>
        {options.map(
          (
            optn: {
              value: string | number | readonly string[] | undefined;
              label: any;
            },
            index: any
          ) => (
            <option value={optn.value} label={optn.label || optn.value} />
          )
        )}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg: React.ReactNode) => (
          <div style={{ color: "red" }}>{msg}</div>
        )}
      />
    </>
  );
}

export function SubmitButton(props: any) {
  const { title, ...rest } = props;
  const { isSubmitting } = useFormikContext();

  return (
    <button type="submit" {...rest} disabled={isSubmitting}>
      {title}
    </button>
  );
}


export {}