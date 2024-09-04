import { ReactNode } from "react";

export interface IPaginationProps {
  pageLimit: number;
  pageNeighbors: number;
  currentPage: number | string;
  totalRecords: number;
  onPageChanged: (event: React.MouseEvent<HTMLElement, MouseEvent>, page: number | string) => void;
}

export interface IDropDown {
  value: string | number;
  btnEndIcon?: any;
  BtnIconLeft?: any;
  dropdownName?: string;
  dropdownClass?: string;
  options: any;
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
}

export interface ISearchBox {
  value?: string | number;
  name: string;
  placeholder: string;
  className: string;
  InputLeftIcon: ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

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

 // const [itemFilter, setItemFilter] = useState<IItemFilter>({
  //   productStatus: E_PRODUCT_STATUS.active,
  //   selectedMarketplace: [],
  //   category: "",
  //   searchValue: "",
  //   currentPage: 1,
  //   itemPerPage: 10,
  // });