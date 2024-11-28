import { useAxiosDelete, useAxiosGet } from "@/hooks/useAxios";

const CONTACTUS_API_BASE_PATH = "/contactus";

export const useGetContactusListAPI = () => {
  const [callApi, { isSuccess, isError, isLoading }] = useAxiosGet();

  const getContactusListAPI = (data: object) => {
    return callApi(`${CONTACTUS_API_BASE_PATH}/all`, { params: data });
  };

  return { getContactusListAPI, isSuccess, isError, isLoading };
};

export const useRemoveContactUsAPI = () => {
  const [callApi, { isSuccess, isError, isLoading }] = useAxiosDelete();

  const removeContactUsAPI = (id: number) => {
    return callApi(`${CONTACTUS_API_BASE_PATH}/remove/${id}`);
  };

  return { removeContactUsAPI, isSuccess, isError, isLoading };
};
