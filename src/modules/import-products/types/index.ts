import { SingleValue } from "react-select";

export type ISelectCategoryProps = {
  isSearchable?: boolean;
  value?: IOption;
  placeholder?: string;
  dropdownName?: string;
  dropdownClass?: string;
  options: IOption[];
  customStyles: any;
  onChange?: (newValue: SingleValue<IOption>) => void;
};

export type IOption = {
  label: string;
  value: string;
};

export type IItems = {
  id: number;
  marketplace_id: number;
  title: string;
  picture_url?: {
    PictureURL: string;
    GalleryType: string;
  };
  listed_at: Date;
  price?: number;
  product_portal_id: string;
  is_imported: boolean;
};

export type IItemsProps = {
  item: IItems;
  isCheck: number[];
  setIsCheck: React.Dispatch<React.SetStateAction<number[]>>;
};
