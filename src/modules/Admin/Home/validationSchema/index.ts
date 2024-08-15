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

// Yup
//     .mixed()
//     .required().
//     test("required", "image is required", (file) => {
//         if ((file as FileList).length > 0) {
//             return true;
//         }
//         return false
//     })
//     .test("fileFormat", "Unsupported Format", (value) => {
//         const file = value as FileList
//         return (
//             file as FileList && file[0] as FileList[0] && ["image/jpeg", "image/png"].includes(file[0].type)
//         );
//     })
//     .test("fileSize", "The file is too large", (value) => {
//         const file = value as FileList
//         return file && file[0] && file[0].size <= 1024 * 1024 * 1;
//     })


export const createimageValidation = (limit: number) => {
    return Yup
        .mixed()
        .required("image is required")
    // .
    // test("required", "image is required", (file) => {
    //     if ((file as FileList).length > 0) {
    //         return true;
    //     }
    //     return false
    // })
    // .test("fileFormat", "Unsupported Format", (value) => {
    //     // console.log(value, "valuyeeeeeeeeee");

    //     const file = value as FileList
    //     return (
    //         file as FileList && file[0] as FileList[0] && ["image/jpeg", "image/png", "image/jpg"].includes(file[0].type)
    //     );
    // })
    // .test("fileSize", "The file is too large", (value) => {
    //     const file = value as FileList
    //     return file && file[0] && file[0].size <= 1024 * 1024 * limit;
    // })
}
// export const imageValidation = createimageValidation(4)

// Yup.mixed()
// .required()
// .test("required", "You need to provide a file", (file) => {
//   if ((file as FileList).length > 0) return true;
//   return false;
// });
