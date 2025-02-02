import { FieldsTypeEnum } from "@/components/form-builder/types";
import { variantOptionType } from "@/modules/product-basic-form/types";
import { IUserModel } from "@/modules/user-management/types";
import { Dispatch, SetStateAction } from "react";
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
  meta?: {
    aspectEnabledForVariations?: boolean;
  };
  option: Option[];
}[];

export type SelectOption = {
  label: string;
  value: string;
  name?: string;
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

export type ProductData = {
  name: string;
  quantity: number;
  amazonVariantId: number;
};

export interface Combination {
  quantity: number;
  sku: string;
  price: number;
  combination: Array<{
    name: string;
    value: string;
  }>;
  amazonVariant: Array<{
    name: string;
    value: string;
  }>;
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
  id: number | string;
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

export interface FormValues {
  attributeOptions: {
    option: string;
    files: FileList | null;
  }[];
}

export interface VariantImageProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
  setValue: UseFormSetValue<any>;
  watch: any;
  amazonVariantData?: ProductData[];
  categoriesId: string | number;
  propertyOptions: SelectOption[] | any;
  allPropertyOptions: SelectOption[];
  allOptions: { [key: string]: string[] };
  setPropertiesState: Dispatch<
    SetStateAction<{ categorized: []; nullCategory: [] }> | any
  >;
  setGeneratedCombinations: Dispatch<SetStateAction<variantOptionType>>;
  generatedCombinations: variantOptionType;
}
