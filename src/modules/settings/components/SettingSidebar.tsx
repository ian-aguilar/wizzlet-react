// ** packages **
import { Link, useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

// ** Constants **
import { settingsNav } from "../constants/sidebar";
import { SettingSidebarEnum } from "../pages/sidebar";
import { useSelector } from "react-redux";
import { userSelector } from "@/redux/slices/userSlice";

const SettingSidebar = () => {
  const [active, setActive] = useState(SettingSidebarEnum.ChangePassword);

  const user = useSelector(userSelector);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      const activeKey = settingsNav.find((el) =>
        location.pathname.includes(el.path)
      );
      if (activeKey) setActive(activeKey.name);
    }
  }, [location.pathname]);

  return (
    <div className="w-[200px] min-w-[200px] border-r border-greyBorder h-full py-2">
      {settingsNav.map((data, i) => {
        if (Boolean(data?.role) && data?.role !== user?.role)
          return <Fragment key={i}></Fragment>;
        return (
          <Link
            to={data.path}
            key={i}
            className={` flex gap-2 items-center w-full   mb-8 hover:brightness-125 transition-all duration-300  ${
              active === data.name
                ? "text-blackPrimary font-medium relative before:absolute before:top-0  before:bottom-0  before:right-[-2px]  before:w-[3px]  before:h-full  before:bg-greenPrimary"
                : "text-grayText font-medium"
            } `}
          >
            <span
              className={
                active === data.name ? "text-greenPrimary" : "text-grayText"
              }
            >
              <data.navIcon />
            </span>
            {data.navText}
          </Link>
        );
      })}
    </div>
  );
};

export default SettingSidebar;
