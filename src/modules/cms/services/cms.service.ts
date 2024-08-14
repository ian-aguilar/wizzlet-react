import { useAxiosGet, useAxiosPost } from "@/hooks/useAxios";

const CMS_API_BASE_PATH = "/cms";

export const useGetAboutusAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getAboutusAPI = async (data?: object) => {
    return callApi(`${CMS_API_BASE_PATH}/aboutus`, data);
  };

  return { getAboutusAPI, isLoading, isError, isSuccess };
};

export const useGetContactusAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getContactusAPI = async (data?: object) => {
    return callApi(`${CMS_API_BASE_PATH}/contactus`, data);
  };

  return { getContactusAPI, isLoading, isError, isSuccess };
};

export const usePostContactusAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const postContactusAPI = async (data: object) => {
    return callApi(`/contactus`, data);
  };

  return { postContactusAPI, isLoading, isError, isSuccess };
};
