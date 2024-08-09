import * as Yup from "yup";
import { emailValidation, passwordValidation } from ".";

export const ForgotPasswordValidationSchema = Yup.object().shape({
  email: emailValidation,
});

export const ResetPasswordValidationSchema = Yup.object().shape({
  password: passwordValidation,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required!"),
});
