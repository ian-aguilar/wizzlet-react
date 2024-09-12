// ** packages **
import { AxiosRequestConfig } from "axios";

// ** hooks **
import { useAxiosGet, useAxiosPost } from "@/hooks/useAxios";

const BASE_PATH = "/property";

export const useEbayFormHandleApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const ebayFormSubmitApi = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`ebay/form`, data, config);
  };

  return { ebayFormSubmitApi, isLoading, isError, isSuccess };
};

export const useGetAllFieldsApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getAllFieldsApi = async (id: number | string | null) => {
    return callApi(`${BASE_PATH}/get/${id}`);
  };

  return { getAllFieldsApi, isLoading, isError, isSuccess };
};

export const useGetCategoryApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getCategoryApi = async () => {
    return callApi("/categories");
  };

  return { getCategoryApi, isLoading, isError, isSuccess };
};
