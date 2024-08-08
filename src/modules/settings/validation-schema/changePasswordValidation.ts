import { passwordValidation } from "@/modules/Auth/validation-schema";
import * as Yup from "yup";

export const changePasswordValidationSchema = Yup.object().shape({
  oldPassword: passwordValidation,
  newPassword: passwordValidation,
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),
});
