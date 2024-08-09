// ** Packages **
import * as Yup from "yup"

// ** validations **
import { buttonValidation, descriptionValidation, titleValidation } from ".";

export const BottomSectionValidationSchema = Yup.object().shape({
    title: titleValidation,
    description: descriptionValidation,
    greenButton: buttonValidation,
    whiteButton: buttonValidation,

});
