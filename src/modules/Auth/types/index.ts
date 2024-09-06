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
  CMSTerms = "/terms",
  CMSPrivacy = "/privacy-and-policy",
}

export const PrivateRoutesPath = {
  dashboard: { view: "/dashboard" },
  setting: {
    view: "/setting",
    profile: { view: "/setting/profile" },
    labelManager: { view: "/setting/label-manager" },
    changePassword: { view: "/setting/change-password" },
    attribute:{view:"/setting/attribute"}
  },
  inventoryManagement: { view: "/inventory-management" },
  import: { view: "/import" },
  userManagement: { view: "/user-management" },
  marketplace: { view: "/marketplace" },
  cmsManagement: {
    aboutus: "/cms-management/about-us",
    contactus: "/cms-management/contact-us",
    faq: "/cms-management/faq",
    home: "/cms-management/home",
    terms:"/cms-management/terms",
    privacy:"/cms-management/privacy-and-policy"
  },
  contactusManagement: { view: "/contactus-management" },
};
