// ** Packages **
import * as Yup from "yup"

// ** validations **
import { descriptionValidation, imageValidation, titleValidation } from ".";

export const MiddleSectionValidationSchema = Yup.object().shape({
    title: titleValidation,
    description: descriptionValidation,
    image: imageValidation
});
