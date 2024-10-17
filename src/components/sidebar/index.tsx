// ** packages **
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ** Icons **
import { sidebarList } from "./types";
import { LeftArrowIcon } from "@/assets/Svg";

// ** Hooks **
import useSideBarColumn from "./hooks/useSideBarColumn";

const Sidebar = ({ handleIsOpen }: { handleIsOpen: (a: boolean) => void }) => {
  const [active, setActive] = useState(sidebarList.dashboard);
  const [isOpen, setIsOpen] = useState(false);
  const [isToggle, setIsToggle] = useState(false);

  const sidebarColumn = useSideBarColumn();
  const navigate = useNavigate();

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
            onClick={() => {
              if (isOpen) {
                setIsToggle(false);
              }
              setIsOpen(!isOpen);
              handleIsOpen(!isOpen);
            }}
          >
            <LeftArrowIcon
              className={`text-grayText transform transition-transform duration-200 ease-in-out ${
                isOpen ? "" : "rotate-180"
              }`}
            />
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

        <nav className="max-h-[calc(100vh_-_155px)] overflow-y-auto scroll-design  overflow-x-hidden">
          {sidebarColumn.map((data, i) => (
            <Fragment key={data.navName}>
              {data.components ? (
                <>
                  <div
                    className={` group font-medium w-full flex gap-2 rounded-md p-4 mb-1 hover:brightness-110   duration-300 transition-all  hover:duration-300 hover:transition-all cursor-pointer  ${
                      active === data.key
                        ? "bg-greenPrimary text-white"
                        : "bg-white text-grayText"
                    } `}
                    key={i}
                    onClick={() => {
                      if (active !== data.key) {
                        navigate(data.components?.[0].path as string);
                        setIsOpen(true);
                        setIsToggle(true);
                      } else {
                        if (!isToggle) {
                          setIsOpen(true);
                        }
                        setIsToggle(!isToggle);
                      }
                    }}
                  >
                    <span className="  group-hover:fill-blackPrimary">
                      {data.navIcon && <data.navIcon />}
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
                  </div>
                  {isToggle &&
                    data.components?.map((item) => (
                      <div
                        className={` ${
                          isToggle
                            ? "relative ml-10 mt-1 pl-4 before:border-l  before:border-grayLightBody/40 before:absolute before:w-[1px] before:h-full before:-top-[24px] before:-left-1 delay-300"
                            : " h-0 invisible "
                        } `}
                      >
                        <Link
                          className={` group font-medium w-full flex gap-2 rounded-md p-4 mb-1 hover:brightness-110  delay-300  duration-300 transition-all  hover:duration-300 hover:transition-all ${
                            location.pathname.includes(item.key)
                              ? "relative mb-1 text-black border border-transparent bg-grayLightBody/20 rounded-md  block px-2 py-2 before:absolute before:-left-5 before:w-3 before:h-[1px] before:border-b before:top-4 before:border-grayLightBody/40"
                              : "relative mb-1 text-grayText  border before:border-grayLightBody/40 rounded-md  block px-2 py-2 before:absolute before:-left-5 before:w-3 before:h-[1px] before:border-b before:top-4 "
                          } `}
                          to={item.path}
                          key={i}
                        >
                          <span
                            className={`  -translate-x-0  whitespace-nowrap   ${
                              isOpen == true
                                ? "active opacity-100  scale-100  transition-all duration-300  "
                                : " opacity-0   scale-0  transition-all duration-300 "
                            }`}
                          >
                            {item.navName}
                          </span>
                        </Link>
                      </div>
                    ))}
                </>
              ) : (
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
                    {data.navIcon && <data.navIcon />}
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
              )}
            </Fragment>
          ))}
        </nav>
      </article>
    </>
  );
};

export default Sidebar;
