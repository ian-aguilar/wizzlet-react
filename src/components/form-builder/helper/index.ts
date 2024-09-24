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
      if (e.required) {
        validationSchema[e.name] = validationSchema[e.name].required(
          `${e.name} is required`
        );
      } else {
        validationSchema[e.name] = validationSchema[e.name].nullable();
      }
    }
  });

  return yup.object().shape(validationSchema);
};

export const getAppendField = <T extends FieldValues>(
  data: FieldsType<T>[] | FieldsType<T>,
  finalData = {}
): any => {
  if (Array.isArray(data)) {
    for (let element of data) {
      switch (element.type) {
        case FieldsTypeEnum.STRING:
        case FieldsTypeEnum.NUMBER:
        case FieldsTypeEnum.BOOLEAN:
        case FieldsTypeEnum.INTEGER: {
          finalData = {
            ...finalData,
            [element.name]: "",
          };
          break;
        }
        case FieldsTypeEnum.OBJECT: {
          element.items?.forEach((item) => {
            finalData = {
              ...finalData,
              [element.name]: {
                ...(finalData as any)[element.name],
                [item.name]: getAppendField(item),
              },
            };
          });
          break;
        }
        case FieldsTypeEnum.ARRAY: {
          const fields = element.items?.map((item) => {
            return { [item.name]: getAppendField(item) };
          });
          let tempObj = {};
          fields?.forEach((field) => {
            tempObj = {
              ...tempObj,
              [Object.keys(field)[0]]: field[Object.keys(field)[0]],
            };
          });
          finalData = {
            ...finalData,
            [element.name]: [tempObj],
          };
          break;
        }
      }
    }
    return finalData;
  } else {
    switch (data.type) {
      case FieldsTypeEnum.STRING:
      case FieldsTypeEnum.NUMBER:
      case FieldsTypeEnum.BOOLEAN:
      case FieldsTypeEnum.INTEGER: {
        return "";
      }
      case FieldsTypeEnum.OBJECT: {
        if (data.items) {
          for (let item of data.items) {
            return getAppendField(item);
          }
        }
        break;
      }
      case FieldsTypeEnum.ARRAY: {
        const fields: any = data.items?.map((item) => {
          return { [item.name]: getAppendField(item) };
        });
        let tempObj = {};
        fields?.forEach((field: any) => {
          tempObj = {
            ...tempObj,
            [Object.keys(field)[0]]: field[Object.keys(field)[0]],
          };
        });
        return [tempObj];
      }
    }
  }
};
