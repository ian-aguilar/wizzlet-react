// ** packages **
import { RouteObjType } from "@/router";
import { Suspense } from "react";

// ** types **
import { PrivateRoutesPath } from "../Auth/types";

// ** common components **
import ChangePassword from "./pages/ChangePassword";
import LabelManager from "./pages/LabelManager";
import Profile from "./pages/Profile";
import { Loader } from "@/components/common/Loader";

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

export const SettingRoutes = applySuspense([
  {
    path: PrivateRoutesPath.setting.profile.view,
    element: <Profile />,
  },
  {
    path: PrivateRoutesPath.setting.labelManager.view,
    element: <LabelManager />,
  },
  {
    path: PrivateRoutesPath.setting.changePassword.view,
    element: <ChangePassword />,
  },
]);
