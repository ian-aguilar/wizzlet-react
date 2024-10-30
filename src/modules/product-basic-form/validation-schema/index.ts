import * as yup from "yup";

export const productBasisFormValidationSchema = yup.object().shape({
  title: yup.string().trim().required("Title is required"),
  description: yup.string().trim().required("Description is required"),
  productType: yup
    .object()
    .shape({
      value: yup.string().trim().required(),
      label: yup.string().trim().required(),
    })
    .typeError("Product Type is required")
    .required("Product Type is required"),
  image: yup.mixed().required("Image is required"),
  tagOptions: yup.array().of(
    yup.object().shape({
      value: yup.string().trim().required(),
      label: yup.string().trim().required(),
    })
  ),
  sku: yup
    .string()
    .trim()
    .when("productType", {
      is: (productType: { label: string; value: string }) =>
        productType?.value === "NORMAL",
      then: (schema) => schema.required("SKU is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  quantity: yup
    .number()

    .when("productType", {
      is: (productType: { label: string; value: string }) =>
        productType?.value === "NORMAL",
      then: (schema) => schema.required("Quantity is required").min(0),
      otherwise: (schema) => schema.notRequired(),
    }),
  price: yup.number().when("productType", {
    is: (productType: { label: string; value: string }) =>
      productType?.value === "NORMAL",
    then: (schema) => schema.required("Price is required").min(1),
    otherwise: (schema) => schema.notRequired(),
  }),
});
