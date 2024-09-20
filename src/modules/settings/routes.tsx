// ** packages **
import { RouteObjType } from "@/router";
import React, { Suspense } from "react";

// ** types **
import { PrivateRoutesPath } from "../Auth/types";

// ** common components **
import { Loader } from "@/components/common/Loader";

const ChangePassword = React.lazy(() => import("./pages/ChangePassword"));
const LabelManager = React.lazy(() => import("./pages/LabelManager"));
const Profile = React.lazy(() => import("./pages/Profile"));
const LabelView = React.lazy(() => import("./pages/LabelView"));

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
  {
    path: PrivateRoutesPath.setting.labelManager.viewLabel.view,
    element: <LabelView />,
  },
]);
