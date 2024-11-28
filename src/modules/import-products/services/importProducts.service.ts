import { useAxiosPost } from "@/hooks/useAxios";

const BASE_PATH = "/import";

export const useImportEbayProductsApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const importEbayProductsApi = async () => {
    return callApi(`${BASE_PATH}/ebay`, {});
  };

  return { importEbayProductsApi, isLoading, isError, isSuccess };
};

export const useImportAmazonProductsApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const importAmazonProductsApi = async () => {
    return callApi(`${BASE_PATH}/amazon`, {});
  };

  return { importAmazonProductsApi, isLoading, isError, isSuccess };
};

export const useGetImportedProductsApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const getImportedProductsApi = async (data: object) => {
    return callApi(`${BASE_PATH}/marketplace/get`, data);
  };

  return { getImportedProductsApi, isLoading, isError, isSuccess };
};

export const useImportProductsFromEbayApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const importProductsFromEbayApi = async (data: object) => {
    return callApi(`${BASE_PATH}`, { productId: data });
  };

  return { importProductsFromEbayApi, isLoading, isError, isSuccess };
};

export const useImportProductsFromAmazonApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const importProductsFromAmazonApi = async (data: object) => {
    return callApi(`${BASE_PATH}/amazon-migration`, { productId: data });
  };

  return { importProductsFromAmazonApi, isLoading, isError, isSuccess };
};

export const useFetchSyncDetailsAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const fetchSyncDetailsApi = async (market: string | null) => {
    return callApi(`${BASE_PATH}/sync-details`, { marketplace: market });
  };

  return { fetchSyncDetailsApi, isLoading, isError, isSuccess };
};
