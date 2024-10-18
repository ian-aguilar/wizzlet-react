import { useAxiosGet, useAxiosPost } from "@/hooks/useAxios";

const AUTH_API_BASE_PATH = "/marketplace";
//  ** Get All Marketplace Listing **
export const useMarketplaceListingAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getMarketplaceListingAPI = async (data?: object) => {
    return callApi(`${AUTH_API_BASE_PATH}/all`, { params: data });
  };

  return { getMarketplaceListingAPI, isLoading, isError, isSuccess };
};

export const useMarketplaceStatusAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const setMarketplaceStatusAPI = async (data: object) => {
    return callApi(`${AUTH_API_BASE_PATH}/change-status`, data);
  };

  return { setMarketplaceStatusAPI, isLoading, isError, isSuccess };
};
