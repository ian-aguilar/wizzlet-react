// ** Icons **
import {
  CMSMGTIcon,
  DashboardIcon,
  HamburgerIcon,
  MarketPlaceIcon,
  SettingsIcon,
  UserMgtIcon,
} from "@/assets/Svg";

// ** Types **
import { sidebarList } from "../types";
import { PrivateRoutesPath } from "@/modules/Auth/types";

export const cmsSidebarComponents = [
  {
    navName: "Home Page",
    path: PrivateRoutesPath.cmsManagement.home,
    key: sidebarList.cmsHome,
  },
  {
    navName: "About Us Page",
    path: PrivateRoutesPath.cmsManagement.aboutus,
    key: sidebarList.cmsAboutus,
  },
  {
    navName: "FAQ Page",
    path: PrivateRoutesPath.cmsManagement.faq,
    key: sidebarList.cmsFaq,
  },
  {
    navName: "Contact Us Page",
    path: PrivateRoutesPath.cmsManagement.contactus,
    key: sidebarList.cmsContactus,
  },
  {
    navName: "Terms of Service",
    path: PrivateRoutesPath.cmsManagement.terms,
    key: sidebarList.cmsTerms,
  },{
    navName: "Privacy And Policy",
    path: PrivateRoutesPath.cmsManagement.privacy,
    key:sidebarList.cmsPrivacy
  }
];

export const userSidebar = [
  {
    navIcon: DashboardIcon,
    navName: "Dashboard",
    path: PrivateRoutesPath.dashboard.view,
    key: sidebarList.dashboard,
  },
  {
    navIcon: UserMgtIcon,
    navName: "Inventory Management",
    path: PrivateRoutesPath.inventoryManagement.view,
    key: sidebarList.inventory,
  },
  {
    navIcon: MarketPlaceIcon,
    navName: "Marketplace",
    path: PrivateRoutesPath.marketplace.view,
    key: sidebarList.marketplace,
  },
  {
    navIcon: CMSMGTIcon,
    navName: "Import",
    path: PrivateRoutesPath.import.view,
    key: sidebarList.import,
  },
  {
    navIcon: SettingsIcon,
    navName: "Settings",
    path: PrivateRoutesPath.setting.profile.view,
    key: sidebarList.setting,
  },
];

export const adminSidebar = [
  {
    navIcon: DashboardIcon,
    navName: "Dashboard",
    path: PrivateRoutesPath.dashboard.view,
    key: sidebarList.dashboard,
  },
  {
    navIcon: UserMgtIcon,
    navName: "User Management",
    path: PrivateRoutesPath.userManagement.view,
    key: sidebarList.user,
  },
  {
    navIcon: HamburgerIcon,
    navName: "Inquiry Management",
    path: PrivateRoutesPath.contactusManagement.view,
    key: sidebarList.contactus,
  },
  {
    navIcon: MarketPlaceIcon,
    navName: "Marketplace",
    path: PrivateRoutesPath.marketplace.view,
    key: sidebarList.marketplace,
  },
  {
    navIcon: CMSMGTIcon,
    navName: "CMS Management",
    key: sidebarList.cms,
    path: "",
    components: cmsSidebarComponents,
  },
  {
    navIcon: SettingsIcon,
    navName: "Settings",
    path: PrivateRoutesPath.setting.profile.view,
    key: sidebarList.setting,
  },
];
