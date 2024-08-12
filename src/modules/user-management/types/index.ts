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
  onStatusChange: (id: number) => void;
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
