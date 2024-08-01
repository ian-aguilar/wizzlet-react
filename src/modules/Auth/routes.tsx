// ** React Imports **
import React, { Suspense } from "react";

// **Type **
import { RouteObjType } from "@/router";
import Dashboard from "../dashboard/pages";

// ** Pages **
const Login = React.lazy(() => import("@/modules/Auth/pages/login"));

const applySuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: <Suspense fallback={<></>}>{route.element}</Suspense>,
  }));
};

const AuthenticationRoutes = applySuspense([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
]);

export default AuthenticationRoutes;
