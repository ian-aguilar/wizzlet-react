import * as Yup from "yup";


// Common validation rules
export const titleValidation = Yup.string()
    .trim()
    .required("Title is required");

export const descriptionValidation = Yup.string()
    .trim()
    .required("descritption is required");

export const buttonValidation = Yup.string().trim().required("Text required")

