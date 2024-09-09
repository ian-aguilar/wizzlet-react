// ** packages **
import { AxiosRequestConfig } from "axios";

// ** hooks **
import { useAxiosGet, useAxiosPost } from "@/hooks/useAxios";

const BASE_PATH = "/product";

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

export const useTagOptionsApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getTagOptionsApi = async () => {
    return callApi(`${BASE_PATH}/tags`);
  };

  return { getTagOptionsApi, isLoading, isError, isSuccess };
};

export const useVariantPropertyOptionsApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getVariantPropertyOptionsApi = async () => {
    return callApi(`${BASE_PATH}/variant-property`);
  };

  return { getVariantPropertyOptionsApi, isLoading, isError, isSuccess };
};
