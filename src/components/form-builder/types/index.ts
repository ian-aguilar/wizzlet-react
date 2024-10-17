import * as yup from "yup";
import { FieldErrors, FieldValues, Path, UseFormWatch } from "react-hook-form";

import { FormControlProp, Option } from "@/components/form-fields/types";

export type FromBuilderPropsType<T extends FieldValues> = {
  fields: FieldsType<T>[];
  errors?: FieldErrors;
  control?: FormControlProp<T>;
  fieldArrayName?: any;
  watch?: UseFormWatch<FieldValues>;
};

export type FieldsType<T extends FieldValues> = {
  type: FieldsTypeEnum;
  name: Path<T>;
  title?: string;
  required: boolean;
  isMulti?: boolean;
  option?: Option[];
  description?: string;
  items?: FieldsType<T>[];
  marketplace?: string;
  minLength?: number;
  maxLength?: number;
};

export enum FieldsTypeEnum {
  STRING = "STRING",
  DATE = "DATE",
  OPTIONS = "OPTIONS",
  NUMBER = "NUMBER",
  DOUBLE = "DOUBLE",
  ARRAY = "ARRAY",
  OBJECT = "OBJECT",
  BOOLEAN = "BOOLEAN",
  INTEGER = "INTEGER",
  MULTI_SELECT = "MULTI_SELECT",
}

export type ValidationType = {
  [key: string]:
    | yup.AnySchema<any, yup.AnyObject, undefined, "">
    | yup.ObjectSchema<any, yup.AnyObject, any, "">;
};

export type FieldArrayComponentType<T extends FieldValues> = {
  fields: FieldsType<T>[];
  errors?: FieldErrors;
  control?: FormControlProp<T>;
  fieldArrayName?: any;
  watch: UseFormWatch<FieldValues>;
  data: any;
};

export type IConditions = {
  required: string[];
  allOf: any[];
};

export type IValidationItem = {
  properties: any;
  conditions: IConditions;
};
