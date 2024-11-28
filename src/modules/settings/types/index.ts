export interface IFormInputs {
  firstName: string;
  lastName: string;
  organizationName?: string | null;
  contactNumber?: number | null;
  email: string;
  profileImage?: File[] | Blob[];
}

export interface IChangePasswordInputs {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
