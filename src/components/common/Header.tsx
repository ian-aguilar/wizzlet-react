// ** packages **
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// ** icons/svg **
import { HamburgerIcon, NotificationIcon, RightArrowWhite } from "@/assets/Svg";
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
            <div className=" group w-14 h-14 min-w-14 rounded-full border border-greyBorder hover:bg-greenPrimary/5 flex justify-center items-center hover:brightness-110 transition-all duration-300 cursor-pointer relative">
              <div className="NotificationAlert absolute top-0 -right-0.5 w-3 h-3 min-w-3 rounded-full bg-greenPrimary group-hover:brightness-110 group-hover:transition-all group-hover:duration-300 border border-greyBorder/50 ">
                {" "}
                &nbsp;{" "}
              </div>
              <NotificationIcon />
            </div>
            <div className=" testtttt rounded-full border border-greyBorder cursor-pointer relative group transition-all duration-300">
              <div className="absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 top-14 right-0 bg-white rounded-lg p-1  text-center min-w-[150px] w-[150px]  text-base font-semibold shadow-md ">
                <span
                  className="block bg-grayLightBody/10 p-2 mb-1 hover:bg-greenPrimary/10 hover:text-greenPrimary hover:brightness-110 rounded-t-lg"
                  onClick={() =>
                    navigate(PrivateRoutesPath.setting.profile.view)
                  }
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
