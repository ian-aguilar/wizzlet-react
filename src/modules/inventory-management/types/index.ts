import { SingleValue } from "react-select";

export interface IPaginationProps {
  pageLimit: number;
  pageNeighbors: number;
  currentPage: number | string;
  totalRecords: number;
  onPageChanged: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    page: number | string
  ) => void;
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
  images: {
    PictureURL: string;
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
  marketplaces: {
    id: number;
    name: string;
    logo: string;
  }[];
};

export type categoriesType = {
  id: number;
  name: string;
};
