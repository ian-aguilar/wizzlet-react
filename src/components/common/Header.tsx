// ** packages **
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// ** icons/svg **
import { HamburgerIcon, NotificationIcon, RightArrowWhite } from "@/assets/Svg";
import MainLogo from "/images/logo.svg";
import ProfilePlaceholder from "/images/profile-placeholder.png";
import Logo from "/images/logo.svg";

// ** redux **
import { setRemoveUser, userSelector } from "@/redux/slices/userSlice";
import { setLogoutData } from "@/redux/slices/authSlice";
import { PrivateRoutesPath, RoutesPath } from "@/modules/Auth/types";
import Button from "../form-fields/components/Button";
import { btnShowType } from "../form-fields/types";
import { useEffect, useRef, useState } from "react";
import ModalNav from "@/modules/cms/common/ModalNav";
import Notifications from "../notification";
import io from "socket.io-client";

const Header = ({ type }: { type: string }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);

  const socket = io("http://192.168.18.46:8001");

  //-----------------States--------------------------
  const [isSidebar, setIsSidebar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [hasNotification, setHasNotification] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle function to show/hide the notifications
  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };

  // Optionally, you can close the dropdown if the user clicks outside of it
  const closeNotification = () => {
    setIsOpen(false);
  };

  const handleWindowSizeChange = () => {
    if (window.innerWidth > 768) {
      setIsSidebar(false);
    }
  };

  useEffect(() => {
    // Emit an event when the user logs in to identify the user on the backend
    socket.emit("user_connected", user?.id);

    // Listen for notifications from the backend
    socket.on("notification_dot", (showDot: boolean) => {
      console.log("🚀 ~ socket.on ~ showDot:", showDot);
      // setHasNotification(showDot);
    });

    return () => {
      // Clean up the socket connection when the component is unmounted
      socket.off("notification_dot");
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeNotification();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <>
      {type === "App" ? (
        <header className="py-3 px-8 lg:px-14 flex items-center justify-between gap-8 border-b border-greyBorder">
          <div className="flex gap-4 items-center">
            {/* <Link to="" className="lg:hidden block">
              <HamburgerIcon />{" "}
            </Link> */}

            <Link to="">
              <img
                src={MainLogo}
                alt="Logo"
                className="py-1 sm:min-w-[170px] sm:w-[170px] min-w-[120px] w-[120px]"
              />
            </Link>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-4 items-center">
              <div className="relative z-20" ref={dropdownRef}>
                <div
                  className="w-14 h-14 min-w-14 rounded-full border border-greyBorder hover:bg-greenPrimary/5 flex justify-center items-center transition-all duration-300 relative cursor-pointer"
                  onClick={toggleNotification}>
                  <div className="NotificationAlertDot absolute top-0 -right-0.5 w-3 h-3 min-w-3 rounded-full bg-greenPrimary border border-greyBorder/50">
                    &nbsp;
                  </div>
                  <NotificationIcon />
                </div>

                {isOpen && (
                  <div className="absolute z-20 top-full -right-6 pt-4">
                    {/* Arrow */}
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-transparent border-b-[8pxpx] border-b-transparent border-r-[8px] border-r-white rotate-90 absolute top-0 right-10"></div>
                    {/* Notification box */}
                    <div className="bg-white sm:min-w-[365px] max-w-[90%] w-full shadow-[0px_5px_29px_0px_#00000036] rounded-md">
                      <Notifications />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className=" testtttt rounded-full border border-greyBorder cursor-pointer relative group transition-all duration-300">
              <div className="absolute z-10 opacity-0 invisible group-hover:visible group-hover:opacity-100 top-14 right-0 bg-white rounded-lg p-1  text-center min-w-[150px] w-[150px]  text-base font-semibold shadow-md ">
                <span
                  className="block bg-grayLightBody/10 p-2 mb-1 hover:bg-greenPrimary/10 hover:text-greenPrimary hover:brightness-110 rounded-t-lg"
                  onClick={() =>
                    navigate(PrivateRoutesPath.setting.profile.view)
                  }>
                  Account
                </span>
                <span
                  className="block bg-grayLightBody/10 p-2  hover:bg-greenPrimary/10  hover:text-greenPrimary hover:brightness-110  rounded-b-lg"
                  onClick={() => {
                    dispatch(setLogoutData());
                    dispatch(setRemoveUser());
                  }}>
                  Logout
                </span>
              </div>
              {user?.url ? (
                <img src={user?.url} className="w-14 h-14 min-w-14" alt="" />
              ) : (
                <img
                  src={ProfilePlaceholder}
                  className="w-14 h-14 min-w-14"
                  alt=""
                />
              )}
            </div>
          </div>
        </header>
      ) : (
        <>
          {isSidebar && <ModalNav closeSidebar={() => setIsSidebar(false)} />}
          <header className="border-b shadow-headerWeb">
            <div className="max-w-[1640px] w-full px-4  mx-auto flex justify-between items-center py-6 ">
              <Link
                to={RoutesPath.CMSHome}
                className="max-w-[177px] min-w-[177px] w-[177px]">
                <img src={Logo} alt="" className="w-full h-auto" />
              </Link>
              <nav className=" hidden lg:flex gap-11 items-center">
                <Link
                  to={RoutesPath.CMSHome}
                  className="text-blackPrimary text-2xl  font-medium  hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300  ">
                  Home
                </Link>
                <Link
                  className="text-blackPrimary  text-2xl  font-medium  hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300  "
                  to={RoutesPath.CMSAboutUs}>
                  About
                </Link>
                <Link
                  className="text-blackPrimary  text-2xl  font-medium  hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300  "
                  to={RoutesPath.CMSFaqs}>
                  FAQ
                </Link>
                <Link
                  className="text-blackPrimary  text-2xl  font-medium  hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300  "
                  to={RoutesPath.CMSContact}>
                  Contact Us
                </Link>
              </nav>
              <div className=" hidden lg:flex ">
                <Link
                  to={RoutesPath.Login}
                  className="px-5 py-3 hover:text-greenPrimary transition-all duration-300 hover:transition-all hover:duration-300 text-xl ">
                  Log In
                </Link>
                <Button
                  showType={btnShowType.primary}
                  btnClass="!border-greenPrimary !bg-greenPrimary !text-white  "
                  btnName="Get Started"
                  btnEndIcon={<RightArrowWhite />}
                  onClickHandler={() => {
                    navigate(RoutesPath.SignUp);
                  }}
                />
              </div>
              <div
                className="HamburgerIcon  lg:hidden block"
                onClick={() => setIsSidebar(true)}>
                <Link to="" className="inline-block ">
                  {" "}
                  <HamburgerIcon />{" "}
                </Link>
              </div>
            </div>
          </header>
        </>
      )}
    </>
  );
};

export default Header;
