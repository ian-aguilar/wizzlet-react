// ** Packages **
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const RequiresUnAuth = () => {
  // ** Hooks **

  return (
    <div>
      <Suspense fallback={<></>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default RequiresUnAuth;
