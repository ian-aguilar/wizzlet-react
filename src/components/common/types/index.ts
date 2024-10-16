import { FormControlProp } from "@/components/form-fields/types";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { FieldErrors, FieldValues, Path } from "react-hook-form";

export interface ITextLabelProps<T extends FieldValues> {
  TextClass?: string;
  TextPlaceHolder?: string;
  TextEndIcon?: ReactNode;
  TextLabelName?: string;
  control?: FormControlProp<T>;
  label?: string;
  name: Path<T>;
  errors?: FieldErrors;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}

export interface FileUploadProps {
  allowedImageTypes: string[];
  allowedVideoTypes: string[];
  maxImageSizeInMB: number;
  maxVideoSizeInMB: number;
  onFileSelect: (file: File | null) => void;
}

export interface InputSwitchProps {
  id: number;
  status: string;
  onToggle: (id: number, status: string) => void;
}

export interface ICategory extends CategoryOptions {
  id?: number | string;
  name?: string;
  children?: ICategory[];
}

export interface CategoryOptions {
  id?: number | string;
  label?: string;
  options?: CategoryOptions[];
  value?: string;
  slug?: string;
}

export interface SelectCategoryProps {
  options: ICategory[];
  defaultValue?: string | number;
  setValue?: Dispatch<
    SetStateAction<{ id: number | string; value: string } | undefined>
  >;
  onChange?: (selectedOption: CategoryOptions) => void;
}

export interface CategoryOptionProps {
  data: CategoryOptions[];
  setValue: Dispatch<SetStateAction<string | undefined>>;
  setIsSelectOpen: Dispatch<SetStateAction<boolean>>;
  setSlug: Dispatch<SetStateAction<string | undefined>>;
  setId: Dispatch<SetStateAction<number | string | undefined>>;
}

export interface CategoryOptGroupProps {
  option: CategoryOptions;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  setIsSelectOpen: Dispatch<SetStateAction<boolean>>;
  setSlug: Dispatch<SetStateAction<string | undefined>>;
  setId: Dispatch<SetStateAction<number | string | undefined>>;
}

export interface ISetSelectOptions {
  options: CategoryOptions[];
  defaultValue: {
    value?: string;
    slug?: string;
    id?: string | number;
  };
}

export interface ISearchBox {
  value?: string | number;
  name: string;
  placeholder?: string;
  className: string;
  InputLeftIcon?: ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export enum MARKETPLACE {
  EBAY = "ebay",
  AMAZON = "amazon",
}

export enum MARKETPLACEID {
  EBAY = 2,
  AMAZON = 1,
}


export type IDatePickerBoxProps<T extends FieldValues> = {
  name: Path<T>;
  className?: string;
  placeholder?: string;
  label?: string;
  isDisabled?: boolean;
  value?: Date;
  maxDate?: Date;
  icon?: ReactNode;
  InputRightIcon?: ReactNode;
  dateFormat?: string;
  onChange: (...event: any[]) => void;
};
