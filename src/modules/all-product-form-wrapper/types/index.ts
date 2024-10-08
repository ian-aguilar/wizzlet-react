export interface ProductBasicFormProps {
  onComplete: (data?: any) => void;
  getMarketplace: (data?: any) => void;
}

export interface ProductBasicFormSingleProps {
  onComplete: (data?: any) => void;
}

export interface FormData {
  id: number;
  label: string;
  description: string;
}
