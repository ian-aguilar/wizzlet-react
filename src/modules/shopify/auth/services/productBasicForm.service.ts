// ** packages **
import { AxiosRequestConfig } from "axios";

// ** hooks **
import { useAxiosPost } from "@/hooks/useAxios";

const BASE_PATH = "/shopify";

export const useShopifyAuthFormApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const shopifyAuthApi = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`${BASE_PATH}/auth`, data, config);
  };

  return { shopifyAuthApi, isLoading, isError, isSuccess };
};

