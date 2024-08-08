import * as Yup from "yup";

export const titleValidation = Yup.string().required("Title is required");
export const descriptionValidation = Yup.string().required("Description is required");
export const imageValidation = Yup.string().required("Image is required");
export const iconValidation = Yup.string().required("Icon is required");
export const buttonValidation = Yup.string().required("Button name is required");
