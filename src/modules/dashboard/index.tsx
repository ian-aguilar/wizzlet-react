import { UserRole, userSelector } from "@/redux/slices/userSlice";
import React from "react";
import { useSelector } from "react-redux";
import UserDashboard from "./components/userDashboard";
import AdminDashboard from "../Admin/dashboard";

const Dashboard: React.FC = () => {
  const user = useSelector(userSelector);
  if (user?.role === UserRole.ADMIN) {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default Dashboard;
