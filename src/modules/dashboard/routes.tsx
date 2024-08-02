// ** React Imports **
import { Suspense } from "react";

// **Type **
import { RouteObjType } from "@/router";
import Dashboard from "../dashboard/pages";

const applySuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: <Suspense fallback={<></>}>{route.element}</Suspense>,
  }));
};

const UserRoutes = applySuspense([
  {
    path: "/",
    element: <Dashboard />,
  },
]);

export default UserRoutes;
