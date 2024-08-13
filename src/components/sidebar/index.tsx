// ** packages **
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Icons **
import { sidebarList } from "./types";
import { LeftArrowIcon } from "@/assets/Svg";

// ** Hooks **
import useSideBarColumn from "./hooks/useSideBarColumn";

const Sidebar = () => {
  const [active, setActive] = useState(sidebarList.dashboard);
  const [isOpen, setIsOpen] = useState(false);

  const sidebarColumn = useSideBarColumn();

  useEffect(() => {
    if (location.pathname) {
      const activeKey = sidebarColumn.find((el) =>
        location.pathname.includes(el.key)
      );

      if (activeKey?.key) setActive(activeKey?.key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, sidebarColumn]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 990) {
        setIsOpen(false);
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Check the screen width on initial render
    handleResize();

    // Cleanup the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <article
        className={`sidebar  LeftBar   h-full  block   p-5 relative transition-all duration-300    ${
          isOpen == true
            ? "active  min-w-[291px] w-[291px]   "
            : "  min-w-[91px] w-[91px] "
        }`}
      >
        <div className="absolute -right-3 top-7 ">
          <div
            className="border p-1 rounded-full bg-white cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <LeftArrowIcon className="text-grayText" />
          </div>
        </div>
        <div
          className={`  bg-[#F7F8FA] uppercase w-full text-grayText font-semibold mb-2  transition-all duration-300 h-[40px]  ${
            isOpen == true
              ? "active  py-2 px-4  text-base   "
              : "   py-3 px-2  text-xs    "
          }`}
        >
          MENU
        </div>

        <nav className="">
          {sidebarColumn.map((data, i) => (
            <Link
              className={` group font-medium w-full flex gap-2 rounded-md p-4 mb-1 hover:brightness-110   duration-300 transition-all  hover:duration-300 hover:transition-all ${
                active === data.key
                  ? "bg-greenPrimary text-white"
                  : "bg-white text-grayText"
              } `}
              to={data.path}
              key={i}
            >
              <span className="  group-hover:fill-blackPrimary">
                <data.navIcon />
              </span>{" "}
              <span
                className={`  -translate-x-0  whitespace-nowrap   ${
                  isOpen == true
                    ? "active opacity-100  scale-100  transition-all duration-300  "
                    : " opacity-0   scale-0  transition-all duration-300 "
                }`}
              >
                {data.navName}
              </span>
            </Link>
          ))}
        </nav>
      </article>
    </>
  );
};

export default Sidebar;
