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

export const useCreateContactUsAPI = () => {
  const [postRequest, { isLoading, isError, isSuccess }] = useAxiosPost();

  const createContactUsAPI = async (data: object) => {
    return postRequest(`${CMS_API_BASE_PATH}/contactus`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return { createContactUsAPI, isLoading, isError, isSuccess };
};
