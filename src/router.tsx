// ** Packages **
import {
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import React, { Suspense } from "react";

// ** Auth Routes
import AuthenticationRoutes from "@/modules/Auth/routes";
import UserRoutes from "./modules/dashboard/routes";

// ** Types **
export type RouteObjType = {
  path?: string;
  element: JSX.Element;
  children?: RouteObject[];
  errorElement?: JSX.Element;
};

// ** Auth Routes
const RequiresUnAuth = React.lazy(
  () => import("@/modules/Auth/components/RequiresUnAuth")
);

const applySuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: <Suspense fallback={<></>}>{route.element}</Suspense>,
  }));
};

const RouterComponent = () => {
  // ** Un-Auth
  const routesForNotAuthenticatedOnly: RouteObject[] = applySuspense([
    {
      element: <RequiresUnAuth />,
      children: AuthenticationRoutes,
    },
  ]);

  const routesForAuthenticatedOnly: RouteObject[] = applySuspense([
    {
      element: (
        <Suspense fallback={<></>}>
          <Outlet />
        </Suspense>
      ),
      children: UserRoutes,
    },
  ]);

  const router = createBrowserRouter([
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default RouterComponent;
