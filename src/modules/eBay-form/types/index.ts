import { FieldsTypeEnum } from "@/components/form-builder/types";
import { IUserModel } from "@/modules/user-management/types";
import { FieldValues } from "react-hook-form";
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormSetError,
  UseFormClearErrors,
} from "react-hook-form";

export type Property = {
  type: FieldsTypeEnum;
  name: string;
  title?: string;
  required: boolean;
  option: Option[];
};

export type PropertiesState = {
  categorized: Property[];
  nullCategory: Property[];
};

export type IPropertiesState = {
  categorized: Property[];
};

// Define your form field type, if not already defined
type DynamicField = {
  key: string;
  value: string;
};

// Define the form data type
export type FormData = IUserModel & {
  nullCategoryFields: DynamicField[];
  categorizedFields: DynamicField[];
};

type Option = { label: string; value: string };
export type InputData = {
  type: string;
  name: string;
  required: boolean;
  option: Option[];
}[];

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectData = {
  singleSelect?: SelectOption;
  multiSelect?: SelectOption[];
};

export type SelectDataArray = SelectData[];

// Type for the props of the ImageUpload component
export interface IUploadProps<T extends FieldValues = FieldValues> {
  name: keyof T;
  watch: any;
  control: Control<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  errors: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
}

export interface Combination {
  quantity: number;
  sku: string;
  price: number;
  combination: Array<{
    name: string;
    value: string;
  }>;
  images: Array<File>; // Assuming images are File objects
}

export interface IImageUpload {
  images?: File[];
}

export interface Image {
  // Define the properties for image objects if you have specific fields
  // For example:
  url?: string;
  altText?: string;
}

// Define the type for a single combination
export interface ICombination {
  image: Image[];
}

// Define the type for the overall structure
export interface ImageCombinations {
  combinations: Combination[];
}

interface VariantProperty {
  singleSelect: {
    label: string;
    value: string;
  };
  multiSelect: Array<{
    label: string;
    value: string;
  }>;
}

export interface Payload {
  combinations: Combination[];
  variantProperties: VariantProperty[];
  [key: string]: any; // Allows dynamic fields
}
