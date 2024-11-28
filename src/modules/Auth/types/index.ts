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
    labelManager: {
      view: "/setting/label-manager",
      viewLabel: { view: "/setting/label-manager/view-label/:labelId" },
    },
    changePassword: { view: "/setting/change-password" },
  },
  inventoryManagement: { view: "/inventory-management" },
  productForm: { view: "/inventory-management/product-form/:step/:productId" },
  import: { view: "/import" },
  userManagement: {
    view: "/user-management",
    viewUser: { view: "/user-management/view/:userId" },
  },
  marketplace: { view: "/marketplace" },
  cmsManagement: {
    aboutus: "/cms-management/about-us",
    contactus: "/cms-management/contact-us",
    faq: "/cms-management/faq",
    home: "/cms-management/home",
    terms: "/cms-management/terms",
    privacy: "/cms-management/privacy-and-policy",
  },
  contactusManagement: { view: "/contactus-management" },
};
