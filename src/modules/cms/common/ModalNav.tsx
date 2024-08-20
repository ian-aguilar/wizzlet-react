import { CloseIconSvg } from "@/assets/Svg";
import React from "react";
import { Link } from "react-router-dom";

const ModalNav = () => {
  return (
    <div className="fixed inset-0    bg-white/80 backdrop-blur-md flex justify-start items-center ">
      <div className=" left-0 top-0 bottom-0 right-auto   w-[280px] min-h-screen  bg-greenPrimary    ">
        <div className="w-full text-right  py-7">
          <Link to="" className="  px-7 ">
            <CloseIconSvg className=" text-white inline-block" />
          </Link>
        </div>
        <div className="flex flex-col gap-2 md:gap-6 pb-6">
          <Link
            to=""
            className="block py-4 text-white px-7 text-center  text-2xl  font-medium hover:text-blackPrimary "
          >
            Home
          </Link>
          <Link
            to=""
            className="block py-4 text-white px-7 text-center  text-2xl  font-medium hover:text-blackPrimary "
          >
            About Us
          </Link>
          <Link
            to=""
            className="block py-4 text-white px-7 text-center  text-2xl  font-medium hover:text-blackPrimary "
          >
            FAQ
          </Link>
          <Link
            to=""
            className="block py-4 text-white px-7 text-center  text-2xl  font-medium hover:text-blackPrimary "
          >
            Contact Us
          </Link>
          <Link
            to=""
            className="block py-4 text-white px-7 text-center  text-2xl  font-medium hover:text-blackPrimary "
          >
            Login
          </Link>
          <Link
            to=""
            className="block py-4 text-white px-7 text-center  text-2xl  font-medium hover:text-blackPrimary "
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalNav;
