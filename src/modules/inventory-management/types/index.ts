import { SingleValue } from "react-select";

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
  options:{ id: number; name: string }[];
  onChange?: (newValue: SingleValue<Option>) => void;
}

export type Option = {
  label: string;
  value: string | number;
  role?: string | number;
  isDisabled?: boolean | undefined;
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
  currentData: {
    id: number;
    title: string;
    img: string;
    categories: {
      id: number;
      name: string;
    }[];
    status: string;
    price: string;
    date: string;
    qty: number;
    SKU: string;
    marketPlaces: {
      id: number;
      name: string;
      logo: string;
    }[];
  }[];
}