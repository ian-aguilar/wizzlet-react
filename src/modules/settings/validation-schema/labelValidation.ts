import * as yup from "yup";

export const addLabelValidationSchema = yup.object().shape({
  label: yup
    .string()
    .required("Label is required")
    .min(3, "Label must be at least 3 characters long")
    .max(50, "Label cannot be longer than 50 characters"),
});
