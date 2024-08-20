// ** Packages **
import * as Yup from "yup"

// ** validations **
import { buttonValidation, createimageValidation, descriptionValidation, titleValidation } from ".";
import { BottomSectionValidationSchema } from "./bottomSectionValidation";
import { MiddleSectionValidationSchema } from "./middleSectionValidation";
const featureValidation = Yup.object().shape({
    title: Yup.string().trim().required("title is required"),
    description: Yup.string().trim().required("description is required"),
    image: createimageValidation()
});
export const TopSectionValidationSchema = Yup.object().shape({
    feature: Yup.array()
        .of(featureValidation).required("one is required")
    ,
    title: titleValidation,
    greenButton: buttonValidation,
    description: descriptionValidation,
    subtitle: titleValidation
});


export const validationSchema = Yup.object().shape({
    topSection: TopSectionValidationSchema,
    middleSection: MiddleSectionValidationSchema,
    bottomSection: BottomSectionValidationSchema,
})