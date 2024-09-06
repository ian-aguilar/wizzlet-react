import { useAxiosDelete, useAxiosGet, useAxiosPost } from "@/hooks/useAxios";
import { AxiosRequestConfig } from "axios";
const AUTH_API_BASE_PATH = "/attribute"

export const useFetchAttributeDataAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getAttributeListingAPI = async (data: object) => {
    return callApi(`${AUTH_API_BASE_PATH}/list`, {
      params: data,
    });
  };

  return { getAttributeListingAPI, isLoading, isError, isSuccess };
};


export const useAddAttributePostAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const addAttributePostAPI = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`${AUTH_API_BASE_PATH}/create`, data, config);
  };

  return { addAttributePostAPI, isLoading, isError, isSuccess };
};

export const useDeleteAttributeDataAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosDelete();

  const deleteAttributeAPI = async (id: number) => {
    return callApi(`${AUTH_API_BASE_PATH}/delete/${id}`);
  };

  return { deleteAttributeAPI, isLoading, isError, isSuccess };
};