import { FieldsType, IValidationItem } from "@/components/form-builder/types";
import { Option } from "@/modules/inventory-management/types";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormWatch,
} from "react-hook-form";

export enum validationEnum {
  Required = "required",
  Not = "not",
  Properties = "properties",
  AllOf = "allOf",
  Anyof = "anyOf",
  If = "if",
  Then = "then",
  Else = "else",
  Items = "items",
}

export interface ResType {
  success: boolean;
  path: string[];
  message?: string;
  isVariation?: boolean;
}
export interface ReferenceItem {
  type: string;
  name: string;
  title: string;
  required: boolean;
  option: Array<{ label: string; value: string }> | null;
  addMore: boolean;
  isMulti: boolean;
  items: ReferenceItem[];
}

export interface InputData {
  [key: string]: Array<{ [key: string]: any }>;
}

export interface OutputData {
  [key: string]: Array<{ [key: string]: any }>;
}

export interface AnyObject {
  [key: string]: any;
}

export enum AmazonSaveType {
  Save = "Save",
  SaveInAmazon = "SaveInAmazon",
}

export enum ProductType {
  Normal = "NORMAL",
  Variant = "VARIANT",
}

export interface IAmazonForm {
  onComplete: (data: any) => void;
  productId: string;
}

export const AmazonVariationCombinationValues = {
  "SIZE/COLOR": ["shirt_size", "color"],
  "SIZE/COLOR/NUMBER_OF_ITEMS": ["shirt_size", "color", "number_of_items"],
  "SIZE/COLOR/TEAM_NAME/ATHLETE": [
    "shirt_size",
    "color",
    "team_name",
    "athlete",
  ],
  "SPECIAL_SIZE_TYPE/SIZE/COLOR": ["special_size_type", "shirt_size", "color"],
  "TEAM_NAME/SIZE/COLOR": ["team_name", "shirt_size", "color"],
};

export const AmazonVariationCombinationLabels = {
  "SIZE/COLOR": ["Size", "Color"],
  "SIZE/COLOR/NUMBER_OF_ITEMS": ["Size", "Color", "Number of Items"],
  "SIZE/COLOR/TEAM_NAME/ATHLETE": ["Size", "Color", "Team Name", "Athlete"],
  "SPECIAL_SIZE_TYPE/SIZE/COLOR": ["Special Size", "Size", "Color"],
  "TEAM_NAME/SIZE/COLOR": ["Team Name", "Size", "Color"],
};

export enum ITab {
  Parent = "Parent",
  Variation = "Variation",
}

export const DefaultChildProperties = [
  ["externally_assigned_product_identifier"],
  ["condition_type"],
  ["fulfillment_availability", "quantity"],
  ["purchasable_offer", "our_price", "schedule", "value_with_tax"],
];

export const DefaultProperties = [
  ["parentage_level"],
  ["child_parent_sku_relationship"],
];

export const ManualProperties = [
  "parentage_level",
  "child_parent_sku_relationship",
  "variation_theme",
];

export interface IAmazonVariantChildProps {
  variationProperties: FieldsType<any>[] | undefined | ReferenceItem[];
  validationItems: IValidationItem | undefined;
  fieldDefaultValues: any;
  variationThemeField: any;
  productId: number | string;
  category: Option | null;
  childProduct: any;
  onComplete: (data: any) => void;
  parent_sku: string;
  variations: any;
}

export interface ICategoryData {
  value: number;
  label: string;
}
