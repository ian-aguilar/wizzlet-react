import { ComponentType, ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  GroupBase,
  MenuPosition,
  MultiValue,
  MultiValueGenericProps,
  OptionProps,
  SingleValue,
  SingleValueProps,
  StylesConfig,
} from "react-select";

export interface IPaginationProps {
  pageLimit: number;
  pageNeighbors: number;
  currentPage: number | string;
  totalRecords: number;
  onPageChanged: (event: React.MouseEvent<HTMLElement, MouseEvent>, page: number | string) => void;
}

export interface IDropDown {
  isSearchable?: boolean;
  value?: Option;
  placeholder?: string;
  dropdownName?: string;
  dropdownClass?: string;
  options: categoriesType[];
  onChange?: (newValue: SingleValue<Option>) => void;
}

export type Option = {
  label: string;
  value: string | number;
  role?: string | number;
  isDisabled?: boolean | undefined;
};

export type IOption = {
  label: string;
  value: string | number;
};

export type INameOption = {
  name: string;
  value: string | number;
};

export enum E_PRODUCT_STATUS {
  active = "active",
  draft = "draft",
}

export interface IItemFilter {
  productStatus: string;
  selectedMarketplace: number[];
  category: string;
  searchValue: string;
  currentPage: number;
  itemPerPage: number;
}

export type productProps = {
  id: number;
  title: string;
  images?: {
    PictureURL?: string;
    url: string;
  };
  categories: {
    id: number;
    name: string;
  }[];
  status: string;
  price: string;
  date: string;
  quantity: number;
  sku: string;
  variantId?: number;
  marketplaces?: {
    id: number;
    name: string;
    logo: string;
  }[];
};

export type categoriesType = {
  id: number;
  name: string;
};

export interface ISelectPaginate {
  isSearchable?: boolean;
  value?: Option;
  placeholder?: string;
  name?: string;
  className?: string;
  options: any;
  onChange?: (newValue: SingleValue<Option>) => void;
}

export type SelectOption = {
  __isNew__?: boolean;
  label: string;
  value: string | number;
  selected?: boolean;
  checked?: boolean;
  onChange?: () => void;
  color?: string;
  extraLabel?: string;
  [key: string]: any;
};

export interface ReactSelectPropsTypes<TFormValues extends FieldValues>
  extends CommonInputProps {
  // ** Basic Input Properties
  key?: string;
  name?: Path<TFormValues>;
  control?: Control<TFormValues>;
  value?: MultiValue<SelectOption> | SingleValue<SelectOption>;
  onChange?: (...event: any[]) => void;

  // ** Select Options
  options?: SelectOption[];
  notClearable?: boolean;
  isMulti?: boolean;
  placeholder?: string;
  isSearchable?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  menuPosition?: MenuPosition;
  isInputValuePrevent?: boolean;
  menuPlacement?: "auto" | "top" | "bottom";
  setInputValue?: React.Dispatch<React.SetStateAction<boolean>>;
  customStyles?: StylesConfig<SelectOption, boolean, GroupBase<SelectOption>>;

  // ** Customization and Accessibility
  formatOptionLabel?: (
    SelectOption: SelectOption,
    context: any
  ) => React.ReactNode;
  components?: any;
  ["aria-label"]?: string;
  ["aria-labelledby"]?: string;
  isOptionDisabled?: (option: SelectOption) => boolean;
  loadingMessage?: () => string | null;
  isCreatable?: boolean;
  isValidNewOption?: (
    inputValue?: string,
    selectValue?: any,
    selectOptions?: any
  ) => boolean;
  virtualized?: boolean;
  getOptionLabel?: (option: SelectOption) => string;
  getOptionValue?: (option: SelectOption) => string;

  // ** Event Handlers
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  onInputChange?: (inputValue: string, actionMeta: any) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;

  // ** Accessibility and Styling
  tabIndex?: number;
  menuIsOpen?: boolean;
  inputMaxLength?: number;
  isMultiColor?: boolean;

  // ** Async Select (if applicable)
  getOptions?: (search: string, page: number) => Promise<any>;
  onFocusApiCall?: boolean;
  defaultSelectValue?: SelectOption;
  defaultOptions?: SelectOption[];
  serveSideSearch?: boolean;
  getOnChange?: (...event: any[]) => void;

  // ** Custom No Options Message and Components
  noOptionsMessage?: () => React.ReactNode;
  OptionComponent?: ComponentType<
    OptionProps<SelectOption, boolean, GroupBase<SelectOption>>
  >;
  singleValueComponent?: React.ComponentType<
    SingleValueProps<SelectOption, boolean, GroupBase<SelectOption>>
  >;
  MultiValueComponent?: (props: MultiValueGenericProps) => JSX.Element;
}

//  COMMON PROPS TYPE
export type CommonInputProps = {
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  wrapperClass?: string;
  required?: boolean;
  maskInputType?: string;
  fromGroupClass?: string;
  labelClass?: string;
  errorClass?: string;
  icon?: ReactNode;
  iconClass?: string;
  isIconRight?: boolean;
  onIconClick?: () => void;
  errors?: { message?: string; [key: string]: any };
};

export type AsyncSelectGetOptionsType = {
  marketplace?: number[];
  search?: string;
  page?: number;
};
