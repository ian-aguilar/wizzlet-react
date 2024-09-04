import { useAxiosGet, useAxiosPost } from "@/hooks/useAxios";

const AUTH_API_BASE_PATH = "/marketplace";
const EBAY_PATH = "/ebay";
//  ** Get All Marketplace Listing **
export const useMarketplaceListingAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getMarketplaceListingAPI = async (data?: object) => {
    return callApi(`${AUTH_API_BASE_PATH}/all`, data);
  };

  return { getMarketplaceListingAPI, isLoading, isError, isSuccess };
};

export const useEbayAuthAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const ebayAuthAPI = async (pathName: string) => {
    return callApi(`${EBAY_PATH}/authorize`, { pathName });
  };

  return { ebayAuthAPI, isLoading, isError, isSuccess };
};
