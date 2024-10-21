import { useSelector } from "react-redux";
import UserMarketplace from "../components/userMarketplace";
import { UserRole, userSelector } from "@/redux/slices/userSlice";
import AdminMarketplace from "../components/adminMarketplace";

const Marketplace = () => {
  const user = useSelector(userSelector);
  if (user?.role === UserRole.ADMIN) {
    return <AdminMarketplace />;
  } else {
    return <UserMarketplace />;
  }
};

export default Marketplace;
