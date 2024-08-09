// ** packages **
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

// ** redux **
import { getAuth } from "../../../redux/slices/authSlice";

// ** types **
import { RoutesPath } from "@/modules/Auth/types";

// ** Icons **
import {
  CMSMGTIcon,
  DashboardIcon,
  HamburgerIcon,
  LeftArrowIcon,
  MarketPlaceIcon,
  NotificationIcon,
  SettingsIcon,
  UserMgtIcon,
} from "@/assets/Svg";
import MainLogo from "/images/logo.svg";
import ProfilePlaceholder from "/images/profile-placeholder.png";
import { setRemoveUser } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";

const RequiresAuth = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useSelector(getAuth);
  const dispatch = useDispatch();
  const location = useLocation();

  const navData = [
    {
      navIcon: <DashboardIcon className=" " />,
      navName: "Dashboard",
      navClass: "bg-greenPrimary text-white",
      path: PrivateRoutesPath.dashboard.view,
    },
    {
      navIcon: <UserMgtIcon />,
      navName: "User Management",
      navClass: "bg-white text-grayText",
      path: "",
    },
    {
      navIcon: <MarketPlaceIcon />,
      navName: "Marketplace",
      navClass: "bg-white text-grayText",
      path: "",
    },
    {
      navIcon: <CMSMGTIcon />,
      navName: "CMS Management",
      navClass: "bg-white text-grayText",
      path: "",
    },
    {
      navIcon: <SettingsIcon className=" " />,
      navName: "Settings",
      navClass: "bg-white text-grayText",
      path: PrivateRoutesPath.setting.profile.view,
    },
  ];
  const [isOpen, setIsOpen] = useState(true);

  const ToggleSidebar = () => {
    setIsOpen(!isOpen);
  };
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

  // /* Not Logged In */
  if (!isAuthenticated) {
    return <Navigate to={RoutesPath.Login} />;
  } else {
    return (
      <>
        <header className="py-3 px-8 lg:px-14 flex items-center justify-between gap-8 border-b border-greyBorder">
          <div className="flex gap-4 items-center">
            <Link to="">
              <img
                src={MainLogo}
                alt="Logo"
                className="py-1 sm:min-w-[209px] sm:w-[209px] min-w-[100px] w-[100px]"
              />
            </Link>
          </div>

          <div className=" flex gap-4 items-center">
            <div className=" group w-14 h-14 min-w-14 rounded-full border border-greyBorder hover:bg-greenPrimary/5 flex justify-center items-center hover:brightness-110 transition-all duration-300 cursor-pointer relative">
              <div className="NotificationAlert absolute top-0 -right-0.5 w-3 h-3 min-w-3 rounded-full bg-greenPrimary group-hover:brightness-110 group-hover:transition-all group-hover:duration-300 border border-greyBorder/50 ">
                {" "}
                &nbsp;{" "}
              </div>
              <NotificationIcon />
            </div>
            <div className="rounded-full border border-greyBorder cursor-pointer relative group transition-all duration-300">
              <div className="absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 top-14 right-0 bg-white rounded-lg p-1  text-center min-w-[150px] w-[150px]  text-base font-semibold shadow-md ">
                <Link
                  to=""
                  className="block bg-grayLightBody/10 p-2 mb-1 hover:bg-greenPrimary/10 hover:text-greenPrimary hover:brightness-110 rounded-t-lg"
                >
                  Account
                </Link>
                <Link
                  to=""
                  className="block bg-grayLightBody/10 p-2  hover:bg-greenPrimary/10  hover:text-greenPrimary hover:brightness-110  rounded-b-lg"
                >
                  Logout
                </Link>
              </div>
              <img
                src={ProfilePlaceholder}
                className="w-14 h-14 min-w-14"
                alt=""
                onClick={() => {
                  dispatch(setLogoutData());
                  dispatch(setRemoveUser());
                }}
              />
            </div>
          </div>
        </header>
        <div className="w-full flex h-[calc(100vh_-_83px)]">
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
                onClick={ToggleSidebar}
              >
                <LeftArrowIcon className="text-grayText" />
              </div>
            </div>
            <div
              className=""
              className={`  bg-[#F7F8FA] uppercase w-full text-grayText font-semibold mb-2  transition-all duration-300 h-[40px]  ${
                isOpen == true
                  ? "active  py-2 px-4  text-base   "
                  : "   py-3 px-2  text-xs    "
              }`}
            >
              MENU
            </div>

            <nav className="">
              {navData.map((data, i) => (
                <Link
                  className={` group font-medium w-full flex gap-2 rounded-md p-4 mb-1 hover:brightness-110   duration-300 transition-all  hover:duration-300 hover:transition-all  ${data.navClass} `}
                  to={data.path}
                  key={i}
                >
                  <span className="  group-hover:fill-blackPrimary">
                    {data.navIcon}
                  </span>{" "}
                  <span
                    className={`  -translate-x-0  whitespace-nowrap   ${
                      isOpen == true
                        ? "active opacity-100  scale-100  transition-all duration-300  "
                        : " opacity-0   scale-0  transition-all duration-300 "
                    }`}
                  >
                    {" "}
                    {data.navName}{" "}
                  </span>
                </Link>
              ))}
            </nav>
          </article>

          <article className="dashboardRight w-full h-full bg-authPattern bg-[length:30px_30px] p-5">
            <h2 className="text-blackPrimary font-bold text-3xl pb-2">
              Dashboard
            </h2>
            {children}
          </article>
        </div>
      </>
    );
  }
};

export default RequiresAuth;
