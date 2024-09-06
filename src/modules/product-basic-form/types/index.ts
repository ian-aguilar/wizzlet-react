import { FieldArrayWithId, FieldErrors } from "react-hook-form";

export interface IProductBasicForm {
  title: string;
  description: string;
  productType: { label: string; value: string } | any;
  image: any;
  sku?: string;
  quantity?: number;
  price?: number;
  variantProperties?: IVariantProperty[];
  combinations?: ICombination[];
  tagOptions: { label: string; value: string }[];
}

export interface IVariantProperty {
  singleSelect: { value: string; label: string } | any;
  multiSelect: { value: string; label: string }[];
}

export interface ICombination {
  combination: { name: string; value: string }[];
  price: number;
  sku: string;
  quantity: number;
}

export interface IFormError {
  image?: FieldErrors;
  productType?: FieldErrors;
  title?: FieldErrors;
  description?: FieldErrors;
  sku?: FieldErrors;
  quantity?: FieldErrors;
  price?: FieldErrors;
  variantProperties?: FieldArrayWithId<
    IProductBasicForm,
    "variantProperties",
    "id"
  >[];
}

export type variantOptionType = { name: string; value: string }[][];
