import * as Yup from "yup";

export const ContactusValidation = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
  description: Yup.string().trim().required("Description is required"),
  greenButton: Yup.string().trim().required("Button name is required"),
});
