// ** packages **
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReactNode, useState } from "react";

// ** redux **
import { getAuth } from "../../../redux/slices/authSlice";

// ** types **
import { RoutesPath } from "@/modules/Auth/types";

// ** Components **
import Sidebar from "@/components/sidebar";

// ** Icons **

import Header from "@/components/common/Header";

const RequiresAuth = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useSelector(getAuth);
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = (open: boolean) => {
    setIsOpen(open);
  };

  // /* Not Logged In */
  if (!isAuthenticated) {
    return <Navigate to={RoutesPath.Login} />;
  } else {
    return (
      <>
        <Header type="App" />
        <div className="w-full flex h-[calc(100vh_-_83px)]">
          <Sidebar handleIsOpen={handleIsOpen} />

          <article
            className={`dashboardRight  ${
              isOpen ? `w-[calc(100%_-_291px)]` : `w-[calc(100%_-_91px)]`
            } h-full bg-authPattern bg-[length:30px_30px] p-5`}
          >
            {children}
          </article>
        </div>
      </>
    );
  }
};

export default RequiresAuth;
