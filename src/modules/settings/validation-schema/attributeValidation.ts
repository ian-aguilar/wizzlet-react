import * as yup from "yup";
import { IAddAttributeInputs } from "../types/attribute";

export const addAttributeValidationSchema : yup.ObjectSchema<IAddAttributeInputs> = yup.object().shape({
  name: yup
    .string()
    .required("Attribute name is required")
    .min(3, "Attribute name must be at least 3 characters long")
    .max(50, "Attribute name cannot be longer than 50 characters"),
  values: yup.array().of(
    yup.object().shape({
      value: yup
        .string()
        .trim()
        .min(1, "Value must be at least 1 character")
        .required("Value is required."),
    })
  ),
});
