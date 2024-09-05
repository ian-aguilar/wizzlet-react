import * as yup from "yup";
import { FieldErrors, FieldValues, Path } from "react-hook-form";

import { FormControlProp, Option } from "@/components/form-fields/types";

export type FromBuilderPropsType<T extends FieldValues> = {
  fields: FieldsType<T>[];
  errors?: FieldErrors;
  control?: FormControlProp<T>;
};

export type FieldsType<T extends FieldValues> = {
  type: FieldsTypeEnum;
  name: Path<T>;
  title: string;
  required: boolean;
  option?: Option[];
};

export enum FieldsTypeEnum {
  STRING = "STRING",
  DATE = "DATE",
  OPTIONS = "OPTIONS",
  NUMBER = "NUMBER",
}

export type ValidationType = {
  [key: string]:
    | yup.AnySchema<any, yup.AnyObject, undefined, "">
    | yup.ObjectSchema<any, yup.AnyObject, any, "">;
};
