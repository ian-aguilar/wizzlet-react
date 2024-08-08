export enum RoutesPath {
  SignUp = "/signup",
  Login = "/login",
  ForgotPassword = "/forgot-password",
  Otp = "/otp",
  ResetPassword = "/reset-password",
  CMSHome = "/",
  CMSAboutUs = "/aboutus",
  CMSContact = "/contact",
  CMSFaqs = "/faqs",
}

export const PrivateRoutesPath = {
  dashboard: { view: "/dashboard" },
  setting: {
    view: "/setting",
    profile: { view: "/setting/profile" },
    labelManager: { view: "/setting/label-manager" },
    changePassword: { view: "/setting/change-password" },
  },
  inventoryManagement: { view: "/inventory-management" },
  userManagement: { view: "/user-management" },
  marketplace: { view: "/marketplace" },
  cmsManagement: {
    faq: "/cms-management/faq"
  }
};
