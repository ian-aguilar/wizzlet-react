import * as Yup from "yup";

export const PrivacyPolicyValidation = Yup.object().shape({
  policy: Yup.string().trim().required("Privacy and policy is required"),
});
