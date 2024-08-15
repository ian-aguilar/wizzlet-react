export interface IContactUsListing {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  company_name?: string;
  message?: string;
}

export interface IUseContactusHeadersProps {
  onDelete: (id: number) => void;
}
