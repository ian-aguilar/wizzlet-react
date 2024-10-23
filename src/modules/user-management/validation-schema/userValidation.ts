import { emailValidation } from "@/modules/Auth/validation-schema";
import * as yup from "yup";

export const addUserValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .trim()
    .min(3, "First Name must be at least 3 characters long")
    .max(50, "First Name cannot be longer than 50 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .trim()
    .min(3, "Last Name must be at least 3 characters long")
    .max(50, "Last Name cannot be longer than 50 characters"),
  email: emailValidation,
});
