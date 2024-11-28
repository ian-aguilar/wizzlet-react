export interface ProductBasicFormProps {
  onComplete: (data?: any) => void;
  getMarketplace: (data?: any) => void;
  setCompletedStep: React.Dispatch<React.SetStateAction<number[]>>
}

export interface ProductBasicFormSingleProps {
  onComplete: (data?: any) => void;
  setCompletedStep: React.Dispatch<React.SetStateAction<number[]>>
}

export interface FormData {
  id: number;
  label: string;
  description: string;
}
