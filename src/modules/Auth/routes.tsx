// ** React Imports **
import React, { Suspense } from "react";

// **Type **
import { RouteObjType } from "@/router";

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
    path: "/",
    element: <Login />,
  },
]);

export default AuthenticationRoutes;
