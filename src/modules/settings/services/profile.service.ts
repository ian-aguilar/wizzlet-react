import { useAxiosGet, useAxiosPost } from "@/hooks/useAxios";

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

  const profileDataPostAPI = async (data: object) => {
    return callApi(`${AUTH_API_BASE_PATH}/update`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return { profileDataPostAPI, isLoading, isError, isSuccess };
};
