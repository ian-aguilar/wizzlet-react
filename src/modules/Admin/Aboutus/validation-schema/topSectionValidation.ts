import * as Yup from "yup";

import { buttonValidation, descriptionValidation, iconValidation, titleValidation } from ".";

export const TopSectionValidationSchema = Yup.object().shape({
  heading: Yup.string().trim().required("Top Section Heading is required"),
  description: descriptionValidation,
  greenButton: buttonValidation,
  whiteButton: buttonValidation,
  cards: Yup.array().of(
    Yup.object().shape({
      icon: iconValidation,
      title: titleValidation,
      description: descriptionValidation,
    })
  ),
});
