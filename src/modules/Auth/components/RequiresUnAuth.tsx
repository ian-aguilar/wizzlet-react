// ** Packages **
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

// ** images **
import MainLogo from "/images/logo.svg";

const RequiresUnAuth = () => {
  // ** Hooks **
  return (
    <div>
      <div className="bg-authPattern flex justify-center min-h-screen py-20 px-4">
        <div className="mainContentAuth  w-full md:w-[600px]">
          <div className="">
            <img src={MainLogo} className="mx-auto" alt="" />

            <Suspense fallback={<></>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequiresUnAuth;
