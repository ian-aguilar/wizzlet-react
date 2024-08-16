// ** Packages **
import * as Yup from "yup";

// Common validation rules
export const titleValidation = Yup.string()
    .trim()
    .required("Title is required");

export const descriptionValidation = Yup.string()
    .trim()
    .required("descritption is required");

export const buttonValidation = Yup.string().trim().required("Text required")

export const createimageValidation = () => {
    return Yup
        .mixed<FileList | string>()
        .required("image is required").test("required", "you nedd  to provide file ", (value) => {
            console.log(value);

            if (value.length > 0) {
                return true
            }
            return false

        })
        .test("fileFormat", "Only image/png, image/jpeg formats are allowed", (value) => {
            if (typeof value == "string") {
                return true
            }
            const file = value as FileList
            return (
                file as FileList && file[0] as FileList[0] && ["image/png", "image/jpeg"].includes(file[0].type)
            );
        })
        .test("fileSize", "File size is too large, it must be less than 8 MB.", (value) => {
            if (typeof value == "string") {
                return true
            }
            const file = value as FileList
            return file && file[0] && file[0].size <= 1024 * 1024 * 8;
        })


}