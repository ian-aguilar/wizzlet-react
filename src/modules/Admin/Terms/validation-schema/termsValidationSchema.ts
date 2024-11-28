// ** Package **
import * as Yup from "yup";

export const termsValidation = Yup.object().shape({
  terms: Yup.string().trim().required("Terms is required"),
});
