// ** packages **
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// ** icons/svg **
import { HamburgerIcon, NotificationIcon, RightArrowWhite } from "@/assets/Svg";
import MainLogo from "/images/logo.svg";
import ProfilePlaceholder from "/images/profile-placeholder.png";
import Logo from "/images/logo.svg";

// ** redux **
import { setRemoveUser } from "@/redux/slices/userSlice";
import { setLogoutData } from "@/redux/slices/authSlice";
import { RoutesPath } from "@/modules/Auth/types";
import Button from "../form-fields/components/Button";
import { btnShowType } from "../form-fields/types";

const Header = ({ type }: { type: string }) => {
  const dispatch = useDispatch();

  return (
    <>
      {type === "App" ? (
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
                onClick={() => {
                  dispatch(setLogoutData());
                  dispatch(setRemoveUser());
                }}
              />
            </div>
          </div>
        </header>
      ) : (
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
              />
            </div>
            <div className="HamburgerIcon  lg:hidden block ">
              <Link to="" className="inline-block ">
                {" "}
                <HamburgerIcon />{" "}
              </Link>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
