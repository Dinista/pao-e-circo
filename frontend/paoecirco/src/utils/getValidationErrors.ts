import { ValidationError } from "yup";

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    if(error != undefined) {
      validationErrors[error.value] = error.message;
    }
   
  });

  return validationErrors;
}
