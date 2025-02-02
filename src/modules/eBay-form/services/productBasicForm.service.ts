// ** packages **

// ** hooks **
import { useAxiosGet, useAxiosPost, useAxiosPut } from "@/hooks/useAxios";
import { AxiosRequestConfig } from "axios";

const BASE_PATH = "/property";

export const useEbayFormHandleApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPut();

  const ebayFormSubmitApi = async (
    data: object,
    {
      productId,
      categoryId,
    }: { productId: number | string; categoryId: number | string }
  ) => {
    return callApi(
      `/ebay/form?categoryId=${categoryId}&productId=${productId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
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

// ** create notification in database **
export const useCreateUserNotificationInDbApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const createUserNotificationInDbApi = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`notification/user-db-create`, data, config);
  };

  return { createUserNotificationInDbApi, isLoading, isError, isSuccess };
};
