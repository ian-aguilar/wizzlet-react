import * as Yup from "yup";

// Common validation rules
export const emailValidation = Yup.string()
  .email("Email is invalid")
  .trim()
  .max(255, "Maximum 255 characters allowed")
  .required("Email is required");

export const passwordValidation = Yup.string()
  .required("Password is required")
  .min(6, "Minimum 6-digit password needed")
  .matches(
    /(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
    "Include at least one uppercase letter, special character, and digit in your password"
  );
