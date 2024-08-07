// ** packages **
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Icons **
import { sidebarList } from "../types";
import { navData } from "@/constants";

const Sidebar = () => {
  const [active, setActive] = useState(sidebarList.dashboard);

  useEffect(() => {
    if (location.pathname) {
      const activeKey = navData.find((el) =>
        location.pathname.includes(el.key)
      );

      if (activeKey?.key) setActive(activeKey?.key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <article className="LeftBar min-w-[291px] w-[291px] h-full lg:block hidden p-5">
      <div className="bg-[#F7F8FA] py-2 px-4 uppercase w-full text-grayText font-semibold mb-2">
        MENU
      </div>

      <nav className="">
        {navData.map((data, i) => (
          <Link
            className={`group font-medium w-full flex gap-2 rounded-md p-4 mb-1 hover:brightness-110 duration-300 transition-all  hover:duration-300 hover:transition-all  ${
              active === data.key
                ? "bg-greenPrimary text-white"
                : "bg-white text-grayText"
            } `}
            to={data.path}
            key={i}
          >
            <span className="  group-hover:fill-blackPrimary">
              <data.navIcon />
            </span>
            {data.navName}
          </Link>
        ))}
      </nav>
    </article>
  );
};

export default Sidebar;
