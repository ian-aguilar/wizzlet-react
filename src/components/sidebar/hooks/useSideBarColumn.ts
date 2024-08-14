// ** Packages **
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

// ** Redux **
import { UserRole, userSelector } from "@/redux/slices/userSlice";

// ** Constants **
import { adminSidebar, userSidebar } from "../constants";

function useSideBarColumn() {
  const [column, setColumn] = useState(userSidebar);

  const user = useSelector(userSelector);

  useEffect(() => {
    if (user?.role === UserRole.ADMIN) setColumn(adminSidebar);
    else setColumn(userSidebar);
  }, [user?.role]);

  return column;
}

export default useSideBarColumn;
