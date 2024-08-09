import { useAxiosDelete, useAxiosGet, useAxiosPost } from "@/hooks/useAxios";
import { AxiosRequestConfig } from "axios";

const AUTH_API_BASE_PATH = "/label";

export const useAddLabelPostAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const addLabelPostAPI = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`${AUTH_API_BASE_PATH}/create`, data, config);
  };

  return { addLabelPostAPI, isLoading, isError, isSuccess };
};

export const useFetchLabelDataAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getLabelListingAPI = async (queryString?: string) => {
    return callApi(`${AUTH_API_BASE_PATH}/list?${queryString}`);
  };

  return { getLabelListingAPI, isLoading, isError, isSuccess };
};

export const useDeleteLabelDataAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosDelete();

  const deleteLabelAPI = async (id: number) => {
    return callApi(`${AUTH_API_BASE_PATH}/delete/${id}`);
  };

  return { deleteLabelAPI, isLoading, isError, isSuccess };
};
