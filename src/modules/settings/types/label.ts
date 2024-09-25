export interface IAddLabelInputs {
  label: string;
}

export interface Label {
  id: number;
  name: string;
  productTagCount:number
}

export interface IUseLabelHeadersProps {
  onDelete: (row: Label) => void;
}

export interface IAddLabelProps {
  onClose: () => void;
  reload: () => void;
}

export interface ILabelViewProps {
    id: number;
    title: string;
    images?: {
      PictureURL?: string;
      url?: string;
    };
    price?: string;
    date: string;
    quantity?: number;
    type?:string;
    sku?: string;
    variantId?: number;
    marketplaces?: {
      id: number;
      name: string;
      logo: string;
    }[];
}

export type Option = {
  label: string;
  value: string | number;
  role?: string | number;
  isDisabled?: boolean | undefined;
};
