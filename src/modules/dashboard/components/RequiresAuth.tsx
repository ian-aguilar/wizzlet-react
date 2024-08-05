// ** packages **
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";

// ** redux **
import { getAuth, setLogoutData } from "../../../redux/slices/authSlice";

// ** types **
import { RoutesPath } from "@/modules/Auth/types";

// ** Icons **
import {
  CMSMGTIcon,
  DashboardIcon,
  HamburgerIcon,
  MarketPlaceIcon,
  NotificationIcon,
  SettingsIcon,
  UserMgtIcon,
} from "@/assets/Svg";
import MainLogo from "/images/logo.svg";
import ProfilePlaceholder from "/images/profile-placeholder.png";
import { SearchHeader } from "@/components/common/SearchHeader";

const RequiresAuth = () => {
  const { isAuthenticated } = useSelector(getAuth);
  const dispatch = useDispatch();

  const navData = [
    {
      navIcon: <DashboardIcon />,
      navName: "Dashboard",
      navClass: "bg-greenPrimary text-white",
    },
    {
      navIcon: <UserMgtIcon />,
      navName: "User Management",
      navClass: "bg-white text-grayText",
    },
    {
      navIcon: <MarketPlaceIcon />,
      navName: "Marketplace",
      navClass: "bg-white text-grayText",
    },
    {
      navIcon: <CMSMGTIcon />,
      navName: "CMS Management",
      navClass: "bg-white text-grayText",
    },
    {
      navIcon: <SettingsIcon />,
      navName: "Settings",
      navClass: "bg-white text-grayText",
    },
  ];

  // /* Not Logged In */
  if (!isAuthenticated) {
    return <Navigate to={RoutesPath.Login} />;
  } else {
    // ** Hooks **
    return (
      <>
        <header className="py-3 px-8 lg:px-14 flex items-center justify-between gap-8 border-b border-greyBorder">
          <div className="flex gap-4 items-center">
            <Link to="" className="lg:hidden block">
              <HamburgerIcon />{" "}
            </Link>

            <Link to="">
              <img
                src={MainLogo}
                alt="Logo"
                className="py-1 sm:min-w-[209px] sm:w-[209px] min-w-[100px] w-[100px]"
              />
            </Link>
          </div>

          <div className=" flex gap-4 items-center">
            <SearchHeader />

            <div className=" group w-14 h-14 min-w-14 rounded-full border border-greyBorder hover:bg-greenPrimary/5 flex justify-center items-center hover:brightness-110 transition-all duration-300 cursor-pointer relative">
              <div className="NotificationAlert absolute top-0 -right-0.5 w-3 h-3 min-w-3 rounded-full bg-greenPrimary group-hover:brightness-110 group-hover:transition-all group-hover:duration-300 border border-greyBorder/50 ">
                {" "}
                &nbsp;{" "}
              </div>
              <NotificationIcon />
            </div>
            <div className="rounded-full border border-greyBorder cursor-pointer">
              <img
                src={ProfilePlaceholder}
                className="w-14 h-14 min-w-14"
                alt=""
                onClick={() => dispatch(setLogoutData())}
              />
            </div>
          </div>
        </header>
        <div className="w-full flex h-[calc(100vh_-_83px)]">
          <article className="LeftBar min-w-[291px] w-[291px] h-full lg:block hidden p-5">
            <div className="bg-[#F7F8FA] py-2 px-4 uppercase w-full text-grayText font-semibold mb-2">
              MENU
            </div>

            <nav className="">
              {navData.map((data, i) => (
                <Link
                  className={` group font-medium w-full flex gap-2 rounded-md p-4 mb-1 hover:brightness-110 duration-300 transition-all  hover:duration-300 hover:transition-all  ${data.navClass} `}
                  to=""
                  key={i}
                >
                  <span className="  group-hover:fill-blackPrimary">
                    {data.navIcon}
                  </span>{" "}
                  {data.navName}
                </Link>
              ))}
            </nav>
          </article>

          <Suspense fallback={<></>}>
            <Outlet />
          </Suspense>
        </div>
      </>
    );
  }
};

export default RequiresAuth;
