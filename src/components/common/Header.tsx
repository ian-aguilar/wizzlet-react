// ** packages **
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// ** icons/svg **
import {
  HamburgerIcon,
  NotificationIcon,
  RightArrowWhite,
} from "@/assets/Svg";
import MainLogo from "/images/logo.svg";
import ProfilePlaceholder from "/images/profile-placeholder.png";
import Logo from "/images/logo.svg";

// ** redux **
import { setRemoveUser } from "@/redux/slices/userSlice";
import { setLogoutData } from "@/redux/slices/authSlice";
import { PrivateRoutesPath, RoutesPath } from "@/modules/Auth/types";
import Button from "../form-fields/components/Button";
import { btnShowType } from "../form-fields/types";
import { useEffect, useState } from "react";
import ModalNav from "@/modules/cms/common/ModalNav";
import Notifications from "../notification";

const Header = ({ type }: { type: string }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSidebar, setIsSidebar] = useState(false);

  const handleWindowSizeChange = () => {
    if (window.innerWidth > 768) {
      setIsSidebar(false);
    }
  };

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

          <div className=" flex gap-4 items-center">
            <div className="group relative z-20">
              <div className=" group w-14 h-14 min-w-14 rounded-full border border-greyBorder hover:bg-greenPrimary/5 flex justify-center items-center   transition-all duration-300   relative">
                <div className="NotificationAlertDot absolute top-0 -right-0.5 w-3 h-3 min-w-3 rounded-full bg-greenPrimary group-hover:brightness-110 group-hover:transition-all group-hover:duration-300 border border-greyBorder/50 ">
                  {" "}
                  &nbsp;{" "}
                </div>
                <NotificationIcon />
                <div className=" opacity-0 invisible group-hover:visible group-hover:opacity-100  absolute z-20 top-full -right-6 pt-4  ">
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-white rotate-90 absolute top-0 right-10"></div>
                  <div className="bg-white sm:min-w-[365px] max-w-[90%] w-full shadow-[0px_5px_29px_0px_#00000036] rounded-md">
                    <Notifications />
                    {/* <div className="notificationHead flex justify-between gap-4 flex-wrap  py-5 px-4 ">
                      <h2 className="font-semibold text-base text-blackPrimary">
                        {" "}
                        Notifications{" "}
                      </h2>
                      <Link
                        to=""
                        className="inline-flex text-greenPrimary gap-1 items-center"
                      >
                        {" "}
                        <DoubleTickSVG className="text-greenPrimary" /> Mark as
                        read
                      </Link>
                    </div>
                    <div className="TabLinksContainer border-b border-black/20 flex  font-medium gap-[2px] ">
                      <Link
                        to=""
                        className="px-7 pb-3 inline-block text-blackPrimary border-b-[2px] border-b-greenPrimary mb-[-2px] hover:text-blackPrimary hover:border-b-[2px] hover:border-b-greenPrimary hover:mb-[-2px] "
                      >
                        View All
                      </Link>
                      <Link
                        to=""
                        className="px-7 pb-3  inline-block hover:border-b-[2px] hover:border-b-greenPrimary hover:mb-[-2px] "
                      >
                        Alerts
                      </Link>
                    </div>
                    <div className="TabContent py-5 px-4 max-h-[50vh] overflow-y-auto scroll-design ">
                      {notifications.length > 0 ? (
                        <div>
                          {notifications &&
                            notifications.map((item, index) => {
                              return (
                                <div key={index}>
                                  <h3 className="text-sm font-medium text-grayText">
                                    {item.date}
                                  </h3>
                                  {item.items.length > 0 &&
                                    item.items.map((notification) => {
                                      return (
                                        <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                                          <div className="flex w-2 h-2 min-w-2 rounded-full bg-grayLightBody/50 ">
                                            &nbsp;
                                          </div>
                                          <div className="w-full">
                                            <div>
                                              <Link
                                                to=""
                                                className="underline text-blackPrimary font-medium"
                                              >
                                                {notification.id}
                                              </Link>{" "}
                                              {notification.smallMsg}
                                            </div>
                                            <div className="flex gap-2 justify-between items-center">
                                              <p className="line-clamp-1">
                                                {notification.longMsg}
                                              </p>
                                              <p className="text-xs">
                                                {" "}
                                                {notification.time}{" "}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                              );
                            })}
                        </div>
                      ) : null} */}

                    {/* <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-greenPrimary ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium "
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-sm font-medium text-grayText">
                        Yesterday
                      </h3>

                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-redAlert ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium"
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>

                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-greenPrimary ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium "
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>
                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-redAlert ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium"
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>

                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-greenPrimary ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium "
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>
                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-redAlert ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium"
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>

                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-greenPrimary ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium "
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>
                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-redAlert ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium"
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>

                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-greenPrimary ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium "
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" testtttt rounded-full border border-greyBorder cursor-pointer relative group transition-all duration-300">
            <div className="absolute z-10 opacity-0 invisible group-hover:visible group-hover:opacity-100 top-14 right-0 bg-white rounded-lg p-1  text-center min-w-[150px] w-[150px]  text-base font-semibold shadow-md ">
              <span
                className="block bg-grayLightBody/10 p-2 mb-1 hover:bg-greenPrimary/10 hover:text-greenPrimary hover:brightness-110 rounded-t-lg"
                onClick={() => navigate(PrivateRoutesPath.setting.profile.view)}
              >
                Account
              </span>
              <span
                className="block bg-grayLightBody/10 p-2  hover:bg-greenPrimary/10  hover:text-greenPrimary hover:brightness-110  rounded-b-lg"
                onClick={() => {
                  dispatch(setLogoutData());
                  dispatch(setRemoveUser());
                }}
              >
                Logout
              </span>
            </div>
            <img
              src={ProfilePlaceholder}
              className="w-14 h-14 min-w-14"
              alt=""
            />
          </div>
        </header>
      ) : (
        <>
          {isSidebar && <ModalNav closeSidebar={() => setIsSidebar(false)} />}
          <header className="border-b shadow-headerWeb">
            <div className="max-w-[1640px] w-full px-4  mx-auto flex justify-between items-center py-6 ">
              <Link
                to={RoutesPath.CMSHome}
                className="max-w-[177px] min-w-[177px] w-[177px]"
              >
                <img src={Logo} alt="" className="w-full h-auto" />
              </Link>
              <nav className=" hidden lg:flex gap-11 items-center">
                <Link
                  to={RoutesPath.CMSHome}
                  className="text-blackPrimary text-2xl  font-medium  hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300  "
                >
                  Home
                </Link>
                <Link
                  className="text-blackPrimary  text-2xl  font-medium  hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300  "
                  to={RoutesPath.CMSAboutUs}
                >
                  About
                </Link>
                <Link
                  className="text-blackPrimary  text-2xl  font-medium  hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300  "
                  to={RoutesPath.CMSFaqs}
                >
                  FAQ
                </Link>
                <Link
                  className="text-blackPrimary  text-2xl  font-medium  hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300  "
                  to={RoutesPath.CMSContact}
                >
                  Contact Us
                </Link>
              </nav>
              <div className=" hidden lg:flex ">
                <Link
                  to={RoutesPath.Login}
                  className="px-5 py-3 hover:text-greenPrimary transition-all duration-300 hover:transition-all hover:duration-300 text-xl "
                >
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
                onClick={() => setIsSidebar(true)}
              >
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
