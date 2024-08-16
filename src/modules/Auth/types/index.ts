export enum RoutesPath {
  SignUp = "/signup",
  Login = "/login",
  ForgotPassword = "/forgot-password",
  Otp = "/otp",
  ResetPassword = "/reset-password",
  SetPassword = "/set-password",
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
    upload: { view: "/setting/upload" },
  },
  inventoryManagement: { view: "/inventory-management" },
  import: { view: "/import" },
  userManagement: { view: "/user-management" },
  marketplace: { view: "/marketplace" },
  cmsManagement: {
    aboutus: "/cms-management/aboutus",
    contactus: "/cms-management/contactus",
    faq: "/cms-management/faq",
    home: "/cms-management/home",
  },
  contactusManagement: { view: "/contactus-management" },
};
  