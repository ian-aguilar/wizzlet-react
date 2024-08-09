// ** Packages **
import * as Yup from "yup"

// ** validations **
import { buttonValidation, descriptionValidation, titleValidation } from ".";

export const BottomSectionValidationSchema = Yup.object().shape({
    titleBottom: titleValidation,
    descriptionBottom: descriptionValidation,
    greenButton: buttonValidation,
    whiteButton: buttonValidation,

});
