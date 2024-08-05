// ** React Imports **
import React, { Suspense } from "react";

// **Type **
import { RouteObjType } from "@/router";
import CMSHome from "../cms/pages/Home";
import Faqs from "../cms/pages/Faqs";
import Contact from "../cms/pages/Contact";
import AboutUs from "../cms/pages/AboutUs";
import ResetPassword from "./pages/ResetPassword";

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
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/signup",
    element: <Registration />,
  },
]);

export const CMSRoutes = applySuspense([
  {
    path: "/home",
    element: <CMSHome />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/faqs",
    element: <Faqs />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

export const nonAuthenticationRoutes = applySuspense([
  {
    path: "/",
    element: <Dashboard />,
  },
]);
