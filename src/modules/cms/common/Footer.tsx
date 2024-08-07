import { Link } from "react-router-dom";
import Logo from "/images/logo.svg";

export const Footer = () => {
  return (
    <footer className="border-t border-greyBorder">
      <div className="container flex gap-4 flex-wrap  justify-center lg:justify-between ">
        <div className="py-4">
          <Link to="" className="max-w-[173px] min-w-[173px] w-[173px] mb-2">
            <img src={Logo} alt="" className="w-full h-auto" />
          </Link>
          <span className="text-base font-normal text-blackPrimary/60">
            © 2024 Importme Labs, Inc.
          </span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-7 text-blackPrimary/80 py-4">
          <Link to="" className="hover:text-greenPrimary">
            Home
          </Link>
          <Link
            to=""
            className="hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300 "
          >
            About Us
          </Link>
          <Link
            to=""
            className="hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300 "
          >
            FAQs
          </Link>
          <Link
            to=""
            className="hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300 "
          >
            Contact Us
          </Link>
          <Link
            to=""
            className="hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300 "
          >
            Terms of Service
          </Link>
          <Link
            to=""
            className="hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300 "
          >
            Privacy And Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};
