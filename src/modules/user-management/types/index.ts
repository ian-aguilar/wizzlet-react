export interface IUserListing {
  full_name: string;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  verified: boolean;
  added_by_admin: boolean;
  status: "ACTIVE" | "INACTIVE";
  last_active_date: Date;
  created_at: Date;
}

export interface IUseUserHeadersProps {
  onDelete: (id: number) => void;
  onInactive: (id: number, status: string) => void;
}

export interface IUserModel {
  email: string;
  firstName: string;
  lastName: string;
}

export interface User {
  id: number;
  // name: string;
  // firstName: string;
  // lastName: string;
}

export type AddUserFormProps = {
  onClose: (reload?: boolean, link?: string) => void;
};

export type UserType = {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  status: string;
  url: string;
  role: string;
};
