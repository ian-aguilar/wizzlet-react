import * as Yup from "yup";
import { emailValidation, passwordValidation } from ".";

export const LoginValidationSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export const signUpValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Firstname  is required")
    .matches(/^[a-zA-Z0-9]+$/, "Must be alphanumeric"),
  lastName: Yup.string()
    .required("Lastname  is required")
    .matches(/^[a-zA-Z0-9]+$/, "Must be alphanumeric"),
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required!"),
});
