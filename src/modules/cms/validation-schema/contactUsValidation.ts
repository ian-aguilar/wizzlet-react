import * as Yup from "yup";

export const ContactusValidation = Yup.object().shape({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string().trim().required("Email is required").email("Enter valid email"),
  phoneNo: Yup.string()
    .trim()
    .optional()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, {
      message: "Enter valid phone number",
      excludeEmptyString: true,
    }),
  companyName: Yup.string().trim(),
  message: Yup.string().trim(),
});
