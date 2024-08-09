// ** packages **

// ** hooks **
import { useAxiosGet, useAxiosPatch } from "@/hooks/useAxios";

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

//  ** Get All User List **
export const useUserStatusChangeAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPatch();

  const userStatusChangeAPI = async (id: number) => {
    return callApi(`${AUTH_API_BASE_PATH}/status/${id}`);
  };

  return { userStatusChangeAPI, isLoading, isError, isSuccess };
};
