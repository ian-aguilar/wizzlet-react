import * as yup from "yup";

export const productBasisFormValidationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  // productType: yup
  //   .object()
  //   .shape({
  //     value: yup.string().required(),
  //     label: yup.string().required(),
  //   })
  // .required("Product Type is required"),
  image: yup.mixed().required("Image is required"),
  tagOptions: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          value: yup.string().required(),
          label: yup.string().required(),
        })
        .required("required")
    )
    .required("Choose at least one"),
  sku: yup.string().when("productType", {
    is: (productType: { label: string; value: string }) =>
      productType?.value === "NORMAL",
    then: (schema) => schema.required("SKU is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  quantity: yup.number().when("productType", {
    is: (productType: { label: string; value: string }) =>
      productType?.value === "NORMAL",
    then: (schema) => schema.required("Quantity is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  price: yup.number().when("productType", {
    is: (productType: { label: string; value: string }) =>
      productType?.value === "NORMAL",
    then: (schema) => schema.required("Price is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
