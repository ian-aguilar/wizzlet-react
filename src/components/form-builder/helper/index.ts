import { FieldValues } from "react-hook-form";
import { FieldsType, FieldsTypeEnum, ValidationType } from "../types";
import * as yup from "yup";

export const getValidation = <T extends FieldValues>(data: FieldsType<T>[]) => {
  const validationSchema: ValidationType = {};

  data.forEach((e) => {
    if (typeof e.name === "string") {
      switch (e.type) {
        case FieldsTypeEnum.DATE:
          validationSchema[e.name] = yup.date();
          break;
        case FieldsTypeEnum.NUMBER:
        case FieldsTypeEnum.DOUBLE:
          validationSchema[e.name] = yup.number();
          break;
        case FieldsTypeEnum.OPTIONS:
          validationSchema[e.name] = yup.object();
          break;

        default:
          validationSchema[e.name] = yup.string();
          break;
      }
      if (e.required)
        validationSchema[e.name] = validationSchema[e.name].required(
          `${e.name} is required`
        );
    }
  });

  return yup.object().shape(validationSchema);
};
