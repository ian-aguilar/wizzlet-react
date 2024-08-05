import React from "react";
import Logo from "/images/logo.svg";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "@/assets/Svg";
export const Header = () => {
  return (
    <header className="border-b shadow-headerWeb">
      <div className="max-w-[1640px] w-full px-4  mx-auto flex justify-between items-center py-6 ">
        <div className="max-w-[177px] min-w-[177px] w-[177px]">
          <img src={Logo} alt="" className="w-full h-auto" />
        </div>
        <nav className=" hidden md:flex gap-12 items-center">
          <Link
            to=""
            className="text-blackPrimary  font-medium  hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300  "
          >
            Home
          </Link>
          <Link
            className="text-blackPrimary  font-medium  hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300  "
            to=""
          >
            About
          </Link>
          <Link
            className="text-blackPrimary  font-medium  hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300  "
            to=""
          >
            FAQ
          </Link>
          <Link
            className="text-blackPrimary  font-medium  hover:text-greenPrimary  transition-all duration-300 hover:transition-all hover:duration-300  "
            to=""
          >
            Contact Us
          </Link>
        </nav>
        <div className=" hidden md:flex ">
          <Link
            to=""
            className="px-5 py-3 hover:brightness-110 transition-all duration-300 hover:transition-all hover:duration-300 "
          >
            Log In
          </Link>
          <button className="px-5 py-3 border border-greenPrimary bg-greenPrimary text-white rounded-md hover:brightness-110 transition-all duration-300 hover:transition-all hover:duration-300 ">
            Get Started
          </button>
        </div>
        <div className="HamburgerIcon  md:hidden block ">
          <Link to="" className="inline-block ">
            {" "}
            <HamburgerIcon />{" "}
          </Link>
        </div>
      </div>
    </header>
  );
};
