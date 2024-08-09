// ** Packages **
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// ** images **
import MainLogo from "/images/logo.svg";
import { PrivateRoutesPath } from "../types";

// ** slices **
import { getAuth } from "@/redux/slices/authSlice";
import { Loader } from "@/components/common/Loader";

const RequiresUnAuth = () => {
  const { isAuthenticated } = useSelector(getAuth);

  /* Not Logged In */
  if (isAuthenticated) {
    return <Navigate to={PrivateRoutesPath.dashboard.view} />;
  } else {
    // ** Hooks **
    return (
      <div>
        <div className="bg-authPattern flex justify-center min-h-screen py-20 px-4">
          <div className="mainContentAuth  w-full md:w-[600px]">
            <div className="">
              <img src={MainLogo} className="mx-auto" alt="" />

              <div className="border-white border-[3px] relative z-[99] rounded-xl mt-8 sm:min-w-600 after:block after:z-[9] after:blur-[85px] after:absolute after:w-full after:h-full after:rounded-full after:bg-greenPrimary/30 after:top-20 after:left-0">
                <Suspense
                  fallback={
                    <>
                      <Loader />
                    </>
                  }
                >
                  <Outlet />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default RequiresUnAuth;
