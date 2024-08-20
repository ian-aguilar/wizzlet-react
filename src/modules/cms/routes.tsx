import { Loader } from "@/components/common/Loader";
import { RouteObjType } from "@/router";
import React, { Suspense } from "react";
import { PrivateRoutesPath, RoutesPath } from "../Auth/types";
import { useSelector } from "react-redux";
import { getAuth } from "@/redux/slices/authSlice";
import { Navigate, Outlet } from "react-router-dom";
import { Footer } from "./common/Footer";

const CMSHome = React.lazy(() => import("./pages/Home"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const Faqs = React.lazy(() => import("./pages/Faqs"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Header = React.lazy(() => import("@/components/common/Header"));

const applySuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: <Suspense fallback={<Loader />}>{route.element}</Suspense>,
  }));
};

export const RequiresUnAuthForCMS = () => {
  const { isAuthenticated } = useSelector(getAuth);

  /* Not Logged In */
  if (isAuthenticated) {
    return <Navigate to={PrivateRoutesPath.dashboard.view} />;
  } else {
    // ** Hooks **
    return (
      <>
        <Header type="cms" />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
        <Footer />
      </>
    );
  }
};

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
