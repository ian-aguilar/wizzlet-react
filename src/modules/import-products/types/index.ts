import { ReactNode } from "react";

export type ISelectCategoryProps = {
  isSearchable?: boolean;
  value?: IOption;
  placeholder?: string;
  dropdownName?: string;
  dropdownClass?: string;
  options?: IOption[];
  customStyles?: any;
  StylesConfig: any;
  onChange?: any;
  isDisabled?: boolean;
};

export type IOption = {
  label: string;
  value: string;
};

export type EbayImage = {
  PictureURL: string[];
};

export interface IItems  {
  id: number;
  marketplace_id: number;
  title: string;
  picture_url?: string | any;
  listed_at: Date;
  price?: number;
  product_portal_id: string;
  is_imported: boolean;
  type: string;
};

export type IItemsProps = {
  item: IItems;
  isCheck: number[];
  marketplace?: IOption;
  checkboxOnChange: (id: number) => void;
};

export enum SyncStatus {
  PENDING = "Pending",
  INPROGRESS = "Inprogress",
  COMPLETED = "Completed",
  FAILED = "Failed",
}

export type ISyncDetails = {
  id?: number;
  marketplace_id: number;
  start_time?: Date;
  end_time?: Date;
  status: SyncStatus;
  failure_reason?: JSON;
};

export enum ImportTab {
  IMPORTED = "Imported",
  NOT_IMPORTED = "Not Imported",
}

export type TotalImportDataType = {
  totalNotImported: number;
  totalImported: number;
};

export interface ISearchBox {
  value?: string;
  name: string;
  placeholder?: string;
  className: string;
  InputLeftIcon?: ReactNode;
  onChange: (value: string) => void;
}
