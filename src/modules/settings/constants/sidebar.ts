// ** Icons **
import { LabelSettingIcon, SettingsIcon, SettingsPWDIcon, SettingsProfileIcon } from "@/assets/Svg";

// ** Types **
import { PrivateRoutesPath } from "@/modules/Auth/types";
import { SettingSidebarEnum } from "../pages/sidebar";
import { UserRole } from "@/redux/slices/userSlice";

export const settingsNav = [
  {
    navIcon: SettingsProfileIcon,
    navText: "Profile",
    path: PrivateRoutesPath.setting.profile.view,
    name: SettingSidebarEnum.Profile,
  },
  {
    navIcon: LabelSettingIcon,
    navText: "Label Manager",
    path: PrivateRoutesPath.setting.labelManager.view,
    name: SettingSidebarEnum.LabelManager,
    role: UserRole.USER,
  },
  {
    navIcon: SettingsPWDIcon,
    navText: "Change Password",
    path: PrivateRoutesPath.setting.changePassword.view,
    name: SettingSidebarEnum.ChangePassword,
  },
  {
    navIcon: SettingsIcon,
    navText: "Attributes",
    path: PrivateRoutesPath.setting.attribute.view,
    name: SettingSidebarEnum.Attribute,
  },
];

export const ATTRIBUTE_VALUE = { value: "" };
