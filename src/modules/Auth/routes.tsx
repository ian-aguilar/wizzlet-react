// ** React Imports **
import React, { Suspense } from "react";

// **Type **
import { RouteObjType } from "@/router";

// ** Pages **
const Login = React.lazy(() => import("@/modules/Auth/pages/Login"));
const Otp = React.lazy(() => import("@/modules/Auth/pages/Otp"));
const ForgotPassword = React.lazy(
  () => import("@/modules/Auth/pages/ForgotPassword")
);
const Registration = React.lazy(
  () => import("@/modules/Auth/pages/Registration")
);
const Dashboard = React.lazy(() => import("@/modules/dashboard/pages"));

const applySuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: <Suspense fallback={<></>}>{route.element}</Suspense>,
  }));
};

export const AuthenticationRoutes = applySuspense([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/signup",
    element: <Registration />,
  },
]);

export const nonAuthenticationRoutes = applySuspense([
  {
    path: "/",
    element: <Dashboard />,
  },
]);
