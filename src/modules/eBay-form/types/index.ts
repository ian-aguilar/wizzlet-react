import { FieldsTypeEnum } from "@/components/form-builder/types";
import { Option } from "@/components/form-fields/types";
import { IUserModel } from "@/modules/user-management/types";

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
