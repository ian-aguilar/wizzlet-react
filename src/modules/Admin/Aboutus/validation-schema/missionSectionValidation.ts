import * as Yup from "yup";
import { descriptionValidation, imageValidation, titleValidation } from ".";

export const MissionSectionValidationSchema = Yup.object().shape({
  title: titleValidation,
  description: descriptionValidation,
  image: imageValidation,
});
