import * as yup from "yup";

export const productEbayFormValidationSchema = yup.object().shape({
  variantProperties: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          singleSelect: yup.object().required("Choose at least one"),
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
        productType?.value === "VARIANT",
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
        productType?.value == "VARIANT",
      then: (schema) =>
        schema
          .min(1, "Combinations are required")
          .required("Combinations are required"),
      otherwise: (schema) => schema.notRequired(),
    }),
});
