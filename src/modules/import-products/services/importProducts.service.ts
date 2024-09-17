import { useAxiosPost } from "@/hooks/useAxios";

const BASE_PATH = "/import";

export const useImportEbayProductsApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const importEbayProductsApi = async () => {
    return callApi(`${BASE_PATH}/ebay`, {});
  };

  return { importEbayProductsApi, isLoading, isError, isSuccess };
};

export const useGetImportedEbayProductsApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const getImportedEbayProductsApi = async () => {
    return callApi(`${BASE_PATH}/ebay/get`, {});
  };

  return { getImportedEbayProductsApi, isLoading, isError, isSuccess };
};

export const useImportProductsFromEbayApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const importProductsFromEbayApi = async (data: object) => {
    return callApi(`${BASE_PATH}`, { productId: data });
  };

  return { importProductsFromEbayApi, isLoading, isError, isSuccess };
};
