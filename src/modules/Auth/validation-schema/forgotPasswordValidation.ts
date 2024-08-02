import * as Yup from "yup";
import { emailValidation } from ".";

export const ForgotPasswordValidationSchema = Yup.object().shape({
  email: emailValidation,
});
