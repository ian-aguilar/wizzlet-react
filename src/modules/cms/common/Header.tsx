import Logo from "/images/logo.svg";
import { Link } from "react-router-dom";
import { HamburgerIcon, RightArrowWhite } from "@/assets/Svg";
import { Button } from "./Button";
import { RoutesPath } from "@/modules/Auth/types";

export const Header = () => {
  return (
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
  );
};
