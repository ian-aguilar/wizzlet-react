import { Loader } from "@/components/common/Loader";
import { RouteObjType } from "@/router";
import { Suspense } from "react";
import { RoutesPath } from "../Auth/types";
import CMSHome from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Faqs from "./pages/Faqs";
import Contact from "./pages/Contact";

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
