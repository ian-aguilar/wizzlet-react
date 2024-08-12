// ** packages **
import { Link } from "react-router-dom";

// ** icons **
import {
  LabelSettingIcon,
  SettingsProfileIcon,
  SettingsPWDIcon,
} from "@/assets/Svg";
import { PrivateRoutesPath } from "@/modules/Auth/types";

const SettingSidebar = () => {
  const settingsNav = [
    {
      navIcon: <SettingsProfileIcon />,
      navText: "Profile",
      navClass:
        "text-blackPrimary font-medium relative before:absolute before:top-0  before:bottom-0  before:right-[-2px]  before:w-[3px]  before:h-full  before:bg-greenPrimary  ",
      path: PrivateRoutesPath.setting.profile.view,
    },
    {
      navIcon: <LabelSettingIcon />,
      navText: "Label Manager",
      navClass: "text-grayText font-medium ",
      path: PrivateRoutesPath.setting.labelManager.view,
    },
    {
      navIcon: <SettingsPWDIcon />,
      navText: "Change Password",
      navClass: "  text-grayText font-medium ",
      path: PrivateRoutesPath.setting.changePassword.view,
    },
  ];

  return (
    <div className="w-[200px] min-w-[200px] border-r border-greyBorder h-full py-2">
      {settingsNav.map((data, i) => (
        <Link
          to={data.path}
          key={i}
          className={` flex gap-2 items-center w-full   mb-8 hover:brightness-125 transition-all duration-300  ${data.navClass} `}
        >
          <span className="text-grayText">{data.navIcon}</span>
          {data.navText}
        </Link>
      ))}
    </div>
  );
};

export default SettingSidebar;
