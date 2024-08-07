// ** packages **
import { Suspense } from "react";
// import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// ** redux **
// import { getAuth } from "../../../redux/slices/authSlice";

const RequiresAuth = () => {
  // const { isAuthenticated } = useSelector(getAuth);

  // /* Not Logged In */
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <Suspense fallback={<></>}>
      <Outlet />
    </Suspense>
  );
};

export default RequiresAuth;
