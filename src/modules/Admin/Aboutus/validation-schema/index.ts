import * as Yup from "yup";

export const titleValidation = Yup.string().trim().required("Title is required");
export const descriptionValidation = Yup.string().trim().required("Description is required");
export const imageValidation = Yup.mixed<FileList | "">()
  .required("Image is required")
  .test("required", "You need to provide a file", (file) => {
    if ((file as FileList).length > 0) return true;
    return false;
  });
export const iconValidation = Yup.mixed<FileList | "">()
  .required("Icon is required")
  .test("required", "You need to provide a file", (file) => {
    if ((file as FileList).length > 0) return true;
    return false;
  });
export const buttonValidation = Yup.string().trim().required("Button name is required");
