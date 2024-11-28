import { emailValidation } from "@/modules/Auth/validation-schema";
import * as Yup from "yup";

export const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters"),
  lastName: Yup.string()
    .trim()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters"),
  organizationName: Yup.string()
    .nullable()
    .notRequired()
    .min(2, "Organization Name must be at least 2 characters"),
  email: emailValidation,
  contactNumber: Yup.number()
    .nullable()
    .notRequired()
    .typeError("Contact Number must be a number")
    .min(1000000000, "Contact Number must be at least 10 digits")
    .max(9999999999, "Contact Number cannot be more than 10 digits"),
});
