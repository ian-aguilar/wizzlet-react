import { useAxiosGet } from "@/hooks/useAxios";
import { userSelector } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";

const AUTH_API_BASE_PATH = "/notifications";
//  ** Get All Marketplace Listing **
export const useFetchNotificationAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();
  const user = useSelector(userSelector);

  const getNotificationAPI = async (data?: object) => {
    return callApi(`${AUTH_API_BASE_PATH}/all`, {
      params: { ...data, role: user?.role },
    });
  };

  return { getNotificationAPI, isLoading, isError, isSuccess };
};
