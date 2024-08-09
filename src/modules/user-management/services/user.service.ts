// ** packages **

// ** hooks **
import {
  useAxiosDelete,
  useAxiosGet,
  useAxiosPatch,
  useAxiosPost,
} from "@/hooks/useAxios";

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

//  ** User Status Change **
export const useUserStatusChangeAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPatch();

  const userStatusChangeAPI = async (id: number) => {
    return callApi(`${AUTH_API_BASE_PATH}/status/${id}`);
  };

  return { userStatusChangeAPI, isLoading, isError, isSuccess };
};

//  ** Create User **
export const useUserPostAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const userPostAPI = async (data: object) => {
    return callApi(`${AUTH_API_BASE_PATH}/create`, data);
  };

  return { userPostAPI, isLoading, isError, isSuccess };
};

//  ** Delete User **
export const useUserDeleteAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosDelete();

  const userDeleteAPI = async (id: number) => {
    return callApi(`${AUTH_API_BASE_PATH}/remove/${id}`);
  };

  return { userDeleteAPI, isLoading, isError, isSuccess };
};
