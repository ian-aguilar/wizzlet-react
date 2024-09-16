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

  const getAllFieldsApi = async (id: number | null | undefined) => {
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

export const useGetProductTypeApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getProductTypeApi = async (id: string | undefined) => {
    return callApi(`products/type/${id}`);
  };

  return { getProductTypeApi, isLoading, isError, isSuccess };
};

export const useCreateEbayProductApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const createEbayProductApi = async (id: number | null | undefined) => {
    return callApi(`/products/create/ebay/${id}`, {});
  };

  return { createEbayProductApi, isLoading, isError, isSuccess };
};

export const useEditProductValuesApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const editProductValueApi = async (id: string | undefined) => {
    return callApi(`/products/values/${id}`);
  };

  return { editProductValueApi, isLoading, isError, isSuccess };
};
