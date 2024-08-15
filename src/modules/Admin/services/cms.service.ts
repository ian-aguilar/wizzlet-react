// ** hooks **
import { useAxiosPost } from "@/hooks/useAxios";
import { AxiosRequestConfig } from "axios";

const CMS_API_BASE_PATH = "/cms";

export const useCreateAboutUsAPI = () => {
  const [postRequest, { isLoading, isError, isSuccess }] = useAxiosPost();

  const createAboutUsAPI = async (data: object, config: AxiosRequestConfig<object> = {}) => {
    return postRequest(`${CMS_API_BASE_PATH}/aboutus`, data, config);
  };

  return { createAboutUsAPI, isLoading, isError, isSuccess };
};

export const useCreateContactUsAPI = () => {
  const [postRequest, { isLoading, isError, isSuccess }] = useAxiosPost();

  const createContactUsAPI = async (data: object, config: AxiosRequestConfig<object> = {}) => {
    return postRequest(`${CMS_API_BASE_PATH}/contactus`, data, config);
  };

  return { createContactUsAPI, isLoading, isError, isSuccess };
};
