export enum sidebarList {
  dashboard = "dashboard",
  marketplace = "marketplace",
  user = "user",
  contactus = "contactus-management",
  cms = "cms",
  setting = "setting",
  inventory = "inventory",
  import = "import",
  cmsHome = "/cms-management/home",
  cmsAboutus = "/cms-management/about-us",
  cmsFaq = "/cms-management/faq",
  cmsContactus = "/cms-management/contact-us",
  cmsTerms = "/cms-management/terms",
  cmsPrivacy = "/cms-management/privacy-and-policy",
}

export interface ISidebar {
  navIcon?: ({ className }: {className:string}) => JSX.Element;
  navName: string;
  path: string;
  key: sidebarList;
  components?: Array<ISidebar>;
}
