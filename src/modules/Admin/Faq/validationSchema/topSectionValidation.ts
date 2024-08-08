import * as Yup from "yup"
import { descriptionValidation, titleValidation } from ".";
import { BottomSectionValidationSchema } from "./bottonSectionValidation";
const rowValidation = Yup.object().shape({
    question: Yup.string().required("question is required"),
    answer: Yup.string().required("answer is required"),
});
export const TopSectionValidationSchema = Yup.object().shape({
    row: Yup.array()
        .of(rowValidation).required("one is required")
    ,
    title: titleValidation,
    description: descriptionValidation,
});
export const validationSchema = TopSectionValidationSchema.concat(BottomSectionValidationSchema)


// Yup.object().shape({
//     // topSection: TopSectionValidationSchema,
//     // bottomSection: BottomSectionValidationSchema
//     title: titleValidation,

// })