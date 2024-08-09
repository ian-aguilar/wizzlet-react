import { useAxiosGet, useAxiosPost } from "@/hooks/useAxios";
import { AxiosRequestConfig } from "axios";

const AUTH_API_BASE_PATH = "/profile";

export const useFetchProfileDataAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getProfileDataAPI = async (data?: object) => {
    return callApi(`${AUTH_API_BASE_PATH}/profile-data`, data);
  };

  return { getProfileDataAPI, isLoading, isError, isSuccess };
};

export const useProfileDataPostAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const profileDataPostAPI = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`${AUTH_API_BASE_PATH}/update`, data, config);
  };

  return { profileDataPostAPI, isLoading, isError, isSuccess };
};
