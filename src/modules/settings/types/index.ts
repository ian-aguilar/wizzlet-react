export interface IFormInputs {
  firstName: string;
  lastName: string;
  organizationName: string;
  contactNumber: number;
  email?: string;
}

export interface IChangePasswordInputs {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IModelTest {
  label: string;
}

export interface IAddLabelInputs {
  label: string;
}
