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
    navName: "Contactus Management",
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
    path: "",
    key: sidebarList.cms,
  },
  {
    navIcon: SettingsIcon,
    navName: "Settings",
    path: PrivateRoutesPath.setting.profile.view,
    key: sidebarList.setting,
  },
];
