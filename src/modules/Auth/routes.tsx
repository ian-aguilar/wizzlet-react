// ** React Imports **
import React, { Suspense } from "react";

// **Type **
import { RouteObjType } from "@/router";
import CMSHome from "../cms/pages/Home";
import Faqs from "../cms/pages/Faqs";
import Contact from "../cms/pages/Contact";
import AboutUs from "../cms/pages/AboutUs";
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

export const CMSRoutes = applySuspense([
  {
    path: RoutesPath.CMSHome,
    element: <CMSHome />,
  },
  {
    path: RoutesPath.CMSAboutUs,
    element: <AboutUs />,
  },
  {
    path: RoutesPath.CMSFaqs,
    element: <Faqs />,
  },
  {
    path: RoutesPath.CMSContact,
    element: <Contact />,
  },
]);
