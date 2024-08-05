// ** Packages **
import {
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import React, { Suspense } from "react";

// ** Auth Routes
import UserRoutes from "./modules/dashboard/routes";
import {
  AuthenticationRoutes,
  nonAuthenticationRoutes,
} from "./modules/Auth/routes";

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
const RequiresAuth = React.lazy(
  () => import("@/modules/Auth/components/RequiresAuth")
);

const applySuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: <Suspense fallback={<></>}>{route.element}</Suspense>,
  }));
};

const RouterComponent = () => {
  // ** Un-Auth **
  const routesForNotAuthenticatedOnly: RouteObject[] = applySuspense([
    {
      element: <RequiresUnAuth />,
      children: AuthenticationRoutes,
    },
  ]);

  // ** Auth **
  const routesFortAuthenticatedOnly: RouteObject[] = applySuspense([
    {
      element: <RequiresAuth />,
      children: nonAuthenticationRoutes,
    },
  ]);

  const router = createBrowserRouter([
    ...routesForNotAuthenticatedOnly,
    ...routesFortAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default RouterComponent;
