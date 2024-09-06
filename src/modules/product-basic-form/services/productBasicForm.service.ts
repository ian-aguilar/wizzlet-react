// ** packages **
import { AxiosRequestConfig } from "axios";

// ** hooks **
import { useAxiosPost } from "@/hooks/useAxios";

const BASE_PATH = "/product";

//  ** Register User **
export const useProductBasicFormApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const basicFormSubmitApi = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`${BASE_PATH}/basic-form`, data, config);
  };

  return { basicFormSubmitApi, isLoading, isError, isSuccess };
};
