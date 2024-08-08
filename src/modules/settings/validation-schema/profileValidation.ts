import { emailValidation } from "@/modules/Auth/validation-schema";
import * as Yup from "yup";

export const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters"),
  organizationName: Yup.string()
    .required("Organization Name is required")
    .min(2, "Organization Name must be at least 2 characters"),
  contactNumber: Yup.number()
    .typeError("Contact Number must be a number")
    .required("Contact Number is required")
    .min(1000000000, "Contact Number must be at least 10 digits")
    .max(9999999999, "Contact Number cannot be more than 10 digits"),
});
