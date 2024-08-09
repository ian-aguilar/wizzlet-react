import { AxiosRequestConfig } from "axios";

// ** hooks **
import { useAxiosPost } from "@/hooks/useAxios";

const CMS_API_BASE_PATH = "/cms";

export const useCreateAboutUsAPI = () => {
  const [postRequest, { isLoading, isError, isSuccess }] = useAxiosPost();

  const createAboutUsAPI = async (data: object) => {
    return postRequest(`${CMS_API_BASE_PATH}/aboutus`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return { createAboutUsAPI, isLoading, isError, isSuccess };
};
