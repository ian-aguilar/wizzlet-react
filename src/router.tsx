// ** Packages **
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import React, { Suspense } from "react";

// ** Auth Routes
import { AuthenticationRoutes } from "./modules/Auth/routes";
import { SettingRoutes } from "./modules/settings/routes";
import { PrivateRoutesPath } from "./modules/Auth/types";
import Dashboard from "./modules/dashboard";
import SettingLayout from "./modules/settings/components/SettingLayout";
import { Loader } from "./components/common/Loader";
import { CMSRoutes } from "./modules/cms/routes";
import Marketplace from "./modules/marketplace";
import InventoryManagement from "./modules/inventory-management";

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
  () => import("@/modules/dashboard/components/RequiresAuth")
);

const applySuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: (
      <Suspense
        fallback={
          <>
            <Loader />
          </>
        }
      >
        {route.element}
      </Suspense>
    ),
  }));
};

const applyRequiresAuthSuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: <RequiresAuth>{route.element}</RequiresAuth>,
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
  const routesForAuthenticatedOnly: RouteObject[] = applyRequiresAuthSuspense([
    {
      path: PrivateRoutesPath.dashboard.view,
      element: <Dashboard />,
    },
    {
      path: PrivateRoutesPath.marketplace.view,
      element: <Marketplace />,
    },
    {
      path: PrivateRoutesPath.inventoryManagement.view,
      element: <InventoryManagement />,
    },
    {
      element: <SettingLayout />,
      children: SettingRoutes,
    },
  ]);

  const router = createBrowserRouter([
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
    ...CMSRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default RouterComponent;
