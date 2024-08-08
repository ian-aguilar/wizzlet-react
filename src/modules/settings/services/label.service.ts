import { useAxiosPost } from "@/hooks/useAxios";
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
