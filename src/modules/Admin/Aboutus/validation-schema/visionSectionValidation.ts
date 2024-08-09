import * as Yup from "yup";

import { buttonValidation, descriptionValidation, imageValidation, titleValidation } from ".";

export const VisionSectionValidationSchema = Yup.object().shape({
  title: titleValidation,
  description: descriptionValidation,
  greenButton: buttonValidation,
  image: imageValidation,
});
