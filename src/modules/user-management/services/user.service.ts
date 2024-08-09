// ** packages **

// ** hooks **
import { useAxiosGet } from "@/hooks/useAxios";

const AUTH_API_BASE_PATH = "/user";

//  ** Get All User List **
export const useGetUserListAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getUserListAPI = async (data: object) => {
    return callApi(`${AUTH_API_BASE_PATH}/all`, { params: data });
  };

  return { getUserListAPI, isLoading, isError, isSuccess };
};
