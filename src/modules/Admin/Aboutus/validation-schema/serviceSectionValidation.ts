import * as Yup from "yup";

import { descriptionValidation, iconValidation, titleValidation } from ".";

export const ServiceSectionValidationSchema = Yup.object().shape({
  title: titleValidation,
  description: descriptionValidation,
  cards: Yup.array()
    .required()
    .of(
      Yup.object().shape({
        icon: iconValidation,
        title: titleValidation,
        description: descriptionValidation,
      })
    ),
});
