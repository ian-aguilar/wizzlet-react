// ** Packages **
import * as Yup from "yup"

// ** validations **
import { createimageValidation, descriptionValidation, titleValidation } from ".";

export const MiddleSectionValidationSchema = Yup.object().shape({
    title: titleValidation,
    description: descriptionValidation,
    image: createimageValidation(3)
});
