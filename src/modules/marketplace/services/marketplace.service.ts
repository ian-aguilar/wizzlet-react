import { useAxiosGet } from "@/hooks/useAxios";

const AUTH_API_BASE_PATH = "/marketplace";
//  ** Get All Marketplace Listing **
export const useMarketplaceListingAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getMarketplaceListingAPI = async (data?: object) => {
    return callApi(`${AUTH_API_BASE_PATH}/all`, data);
  };

  return { getMarketplaceListingAPI, isLoading, isError, isSuccess };
};


