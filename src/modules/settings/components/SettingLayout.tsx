// ** packages **
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import SettingSidebar from "./SettingSidebar";
import { Loader } from "@/components/common/Loader";

const SettingLayout = () => {
  return (
    <section className="h-[calc(100%_-_40px)] w-full bg-white overflow-y-auto scroll-design p-7">
      <div className="SettingsSection block lg:flex lg:h-full">
        <SettingSidebar />
        <div className="w-full px-4 xl:px-20">
          <Suspense
            fallback={
              <>
                <Loader />
              </>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default SettingLayout;
