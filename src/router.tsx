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
import SettingLayout from "./modules/settings/components/SettingLayout";
import { Loader } from "./components/common/Loader";
import { CMSRoutes, RequiresUnAuthForCMS } from "./modules/cms/routes";
import ProductForm from "./modules/all-product-form-wrapper";

const Marketplace = React.lazy(
  () => import("./modules/marketplace/pages/marketplace")
);
const InventoryManagement = React.lazy(
  () => import("./modules/inventory-management")
);
const Dashboard = React.lazy(() => import("./modules/dashboard/index"));
const AdminDashboard = React.lazy(() => import("./modules/Admin/dashboard"));

const UserManagement = React.lazy(() => import("./modules/user-management"));
const Aboutus = React.lazy(() => import("./modules/Admin/Aboutus/Index"));
const Contactus = React.lazy(() => import("./modules/Admin/Contactus/Index"));
const ImportProducts = React.lazy(() => import("./modules/import-products"));
const ContactusManagement = React.lazy(
  () => import("./modules/contact-us-management")
);
const FaqForm = React.lazy(() => import("./modules/Admin/Faq"));
const HomePageForm = React.lazy(() => import("./modules/Admin/Home"));
const Terms = React.lazy(() => import("./modules/Admin/Terms/Index"));
const Privacy = React.lazy(() => import("./modules/Admin/Privacy/Index"));

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
    element: <Suspense fallback={<Loader />}>{route.element}</Suspense>,
  }));
};

const applyRequiresAuthSuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: (
      <Suspense fallback={<Loader />}>
        <RequiresAuth>{route.element}</RequiresAuth>
      </Suspense>
    ),
  }));
};

const RouterComponent = () => {
  // ** Un-Auth **
  const routesForNotAuthenticatedOnly: RouteObject[] = applySuspense([
    {
      element: <RequiresUnAuth />,
      children: [...AuthenticationRoutes],
    },
  ]);

  // ** Auth **
  const routesForAuthenticatedOnly: RouteObject[] = applyRequiresAuthSuspense([
    {
      path: PrivateRoutesPath.dashboard.view,
      element: <Dashboard />,
    },
    {
      path: PrivateRoutesPath.adminDashboard.view,
      element: <AdminDashboard />,
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
      path: PrivateRoutesPath.productForm.view,
      element: <ProductForm />,
    },
    {
      path: PrivateRoutesPath.import.view,
      element: <ImportProducts />,
    },
    {
      path: PrivateRoutesPath.userManagement.view,
      element: <UserManagement />,
    },
    {
      element: <SettingLayout />,
      children: SettingRoutes,
    },
    {
      path: PrivateRoutesPath.cmsManagement.aboutus,
      element: <Aboutus />,
    },
    {
      path: PrivateRoutesPath.cmsManagement.contactus,
      element: <Contactus />,
    },
    {
      path: PrivateRoutesPath.cmsManagement.faq,
      element: <FaqForm />,
    },
    {
      path: PrivateRoutesPath.cmsManagement.home,
      element: <HomePageForm />,
    },
    {
      path: PrivateRoutesPath.cmsManagement.terms,
      element: <Terms />,
    },
    {
      path: PrivateRoutesPath.cmsManagement.privacy,
      element: <Privacy />,
    },
    {
      path: PrivateRoutesPath.contactusManagement.view,
      element: <ContactusManagement />,
    },
  ]);

  // ** CMS **
  const routesForCMS: RouteObject[] = applySuspense([
    {
      element: <RequiresUnAuthForCMS />,
      children: [...CMSRoutes],
    },
  ]);

  const router = createBrowserRouter([
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
    ...routesForCMS,
  ]);

  return <RouterProvider router={router} />;
};

export default RouterComponent;
