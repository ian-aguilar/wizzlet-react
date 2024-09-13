import * as yup from "yup";

export const productBasisFormValidationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  productType: yup
    .object()
    .shape({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .required("Product Type is required"),
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
      productType?.value === "normal",
    then: (schema) => schema.required("SKU is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  quantity: yup.number().when("productType", {
    is: (productType: { label: string; value: string }) =>
      productType?.value === "normal",
    then: (schema) => schema.required("Quantity is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  price: yup.number().when("productType", {
    is: (productType: { label: string; value: string }) =>
      productType?.value === "normal",
    then: (schema) => schema.required("Price is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  variantProperties: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          singleSelect: yup
            .object()
            .shape({
              value: yup.string().required(),
              label: yup.string().required(),
            })
            .required("Choose at least one"),
          multiSelect: yup
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
            .min(1, "Choose at least one")
            .required("Choose at least one"),
        })
        .required("Choose at least one")
    )
    .when("productType", {
      is: (productType: { label: string; value: string }) =>
        productType?.value === "variant",
      then: (schema) => schema.required("Variant Properties are required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  combinations: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          combination: yup
            .array()
            .of(
              yup
                .object()
                .shape({
                  name: yup.string().required(),
                  value: yup.string().required(),
                })
                .required()
            )
            .required(),
          price: yup
            .number()
            .required("Price is required")
            .positive("Price must be positive and required"),
          sku: yup.string().required("SKU is required"),
          quantity: yup
            .number()
            .required("Quantity is required")
            .min(1, "Quantity must be at least 1"),
        })
        .required()
    )
    .when("productType", {
      is: (productType: { label: string; value: string }) =>
        productType?.value == "variant",
      then: (schema) =>
        schema
          .min(1, "Combinations are required")
          .required("Combinations are required"),
      otherwise: (schema) => schema.notRequired(),
    }),
});
