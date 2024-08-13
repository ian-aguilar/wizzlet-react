// ** Packages **
import * as Yup from "yup";

// ** validations **
import { descriptionValidation, titleValidation } from ".";
import { BottomSectionValidationSchema } from "./bottonSectionValidation";

const rowValidation = Yup.object().shape({
    question: Yup.string().trim().required("question is required"),
    answer: Yup.string().trim().required("answer is required"),
});

export const TopSectionValidationSchema = Yup.object().shape({
    row: Yup.array().of(rowValidation).required("one is required"),
    title: titleValidation,
    description: descriptionValidation,
});

export const validationSchema = Yup.object().shape({
    topSection: TopSectionValidationSchema,
    bottomSection: BottomSectionValidationSchema

})