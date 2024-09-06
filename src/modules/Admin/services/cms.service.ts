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


//** Create Terms custom hook */
export const useCreateTermsAPI = () => {
  const [postRequest, { isLoading, isError, isSuccess }] = useAxiosPost();
  const createTermsAPI = async (data: object, config: AxiosRequestConfig<object> = {}) => {
    return postRequest(`${CMS_API_BASE_PATH}/terms`, data, config);
  };
  return { createTermsAPI, isLoading, isError, isSuccess };
};

//** Create privacy & policy custom hook */
export const useCreatePrivacyAPI = () => {
  const [postRequest, { isLoading, isError, isSuccess }] = useAxiosPost();
  const createPrivacyAPI = async (data: object, config: AxiosRequestConfig<object> = {}) => {
    return postRequest(`${CMS_API_BASE_PATH}/privacy`, data, config);
  };
  return { createPrivacyAPI, isLoading, isError, isSuccess };
};
