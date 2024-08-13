import { emailValidation } from "@/modules/Auth/validation-schema";
import * as yup from "yup";

export const addUserValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Frist Name is required")
    .min(3, "Frist Name must be at least 3 characters long")
    .max(50, "Frist Name cannot be longer than 50 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(3, "Last Name must be at least 3 characters long")
    .max(50, "Last Name cannot be longer than 50 characters"),
  email: emailValidation,
});
