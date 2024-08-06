export enum RoutesPath {
  SignUp = "/signup",
  Login = "/login",

  ForgotPassword = "/forgot-password",
  Otp = "/otp",
  ResetPassword = "/reset-password",
  CMSHome = "/home",
  CMSAboutUs = "/aboutus",
  CMSContact = "/contact",
  CMSFaqs = "/faqs",
}

export const PrivateRoutesPath = {
  dashboard: { view: "/" },
  setting: {
    view: "/setting",
    profile: { view: "/setting/profile" },
    labelManager: { view: "/setting/label-manager" },
    changePassword: { view: "/setting/change-password" },
    // userManagement: { view: "/setting/user-management" },
  },
};
