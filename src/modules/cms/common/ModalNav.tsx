import { CloseIconSvg } from "@/assets/Svg";
import { Link } from "react-router-dom";
import { IModalNavProps } from "../types";
import { RoutesPath } from "@/modules/Auth/types";

const ModalNav = ({ closeSidebar }: IModalNavProps) => {
  return (
    <div className="fixed inset-0    bg-white/80 backdrop-blur-md flex justify-start items-center ">
      <div className=" left-0 top-0 bottom-0 right-auto   w-[280px] min-h-screen  bg-greenPrimary    ">
        <div className="w-full text-right  py-7">
          <Link to="" className="  px-7 " onClick={closeSidebar}>
            <CloseIconSvg className=" text-white inline-block" />
          </Link>
        </div>
        <div className="flex flex-col gap-2 md:gap-6 pb-6">
          <Link
            to={RoutesPath.CMSHome}
            className="block py-4 text-white px-7 text-center  text-2xl  font-medium hover:text-blackPrimary "
            onClick={closeSidebar}
          >
            Home
          </Link>
          <Link
            to={RoutesPath.CMSAboutUs}
            className="block py-4 text-white px-7 text-center  text-2xl  font-medium hover:text-blackPrimary "
            onClick={closeSidebar}
          >
            About Us
          </Link>
          <Link
            to={RoutesPath.CMSFaqs}
            className="block py-4 text-white px-7 text-center  text-2xl  font-medium hover:text-blackPrimary "
            onClick={closeSidebar}
          >
            FAQ
          </Link>
          <Link
            to={RoutesPath.CMSContact}
            className="block py-4 text-white px-7 text-center  text-2xl  font-medium hover:text-blackPrimary "
            onClick={closeSidebar}
          >
            Contact Us
          </Link>
          <Link
            to={RoutesPath.Login}
            className="block py-4 text-white px-7 text-center  text-2xl  font-medium hover:text-blackPrimary "
            onClick={closeSidebar}
          >
            Login
          </Link>
          <Link
            to={RoutesPath.SignUp}
            className="block py-4 text-white px-7 text-center  text-2xl  font-medium hover:text-blackPrimary "
            onClick={closeSidebar}
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalNav;
