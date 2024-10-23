import { useAxiosGet, useAxiosPost } from "@/hooks/useAxios";

const AUTH_API_BASE_PATH = "/notification";
//  ** Get All Marketplace Listing **
export const useFetchNotificationAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getNotificationAPI = async (data?: object) => {
    return callApi(`${AUTH_API_BASE_PATH}/all`, {
      params: data,
    });
  };

  return { getNotificationAPI, isLoading, isError, isSuccess };
};

export const useSetMarkReadNotificationAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const setMarkReadAPI = async (data: object) => {
    return callApi(`${AUTH_API_BASE_PATH}/mark-read`, data);
  };

  return { setMarkReadAPI, isLoading, isError, isSuccess };
};
