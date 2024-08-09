// ** React Imports **
import React, { Suspense } from "react";

// **Type **
import { RouteObjType } from "@/router";
import ResetPassword from "./pages/ResetPassword";
import { RoutesPath } from "./types";

// ** Pages **
const Login = React.lazy(() => import("@/modules/Auth/pages/Login"));
const Otp = React.lazy(() => import("@/modules/Auth/pages/Otp"));
const ForgotPassword = React.lazy(
  () => import("@/modules/Auth/pages/ForgotPassword")
);
const Registration = React.lazy(
  () => import("@/modules/Auth/pages/Registration")
);

const applySuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: <Suspense fallback={<></>}>{route.element}</Suspense>,
  }));
};

export const AuthenticationRoutes = applySuspense([
  {
    path: RoutesPath.Login,
    element: <Login />,
  },
  {
    path: RoutesPath.Otp,
    element: <Otp />,
  },
  {
    path: RoutesPath.ForgotPassword,
    element: <ForgotPassword />,
  },
  {
    path: RoutesPath.ResetPassword,
    element: <ResetPassword />,
  },
  {
    path: RoutesPath.SignUp,
    element: <Registration />,
  },
]);
