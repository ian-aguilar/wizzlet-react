export interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  organizationName: string;
  contactNumber: number;
}

export interface IChangePasswordInputs {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
