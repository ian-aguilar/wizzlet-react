import * as yup from "yup";

export const shopifyAuthFormSchema = yup.object().shape({
  shop: yup.string().trim().required("Shop / Store is required"),
});
