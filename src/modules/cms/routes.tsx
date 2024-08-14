import { Loader } from "@/components/common/Loader";
import { RouteObjType } from "@/router";
import { Suspense } from "react";
import { PrivateRoutesPath, RoutesPath } from "../Auth/types";
import CMSHome from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Faqs from "./pages/Faqs";
import Contact from "./pages/Contact";
import Header from "@/components/common/Header";
import { useSelector } from "react-redux";
import { getAuth } from "@/redux/slices/authSlice";
import { Navigate, Outlet } from "react-router-dom";

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
