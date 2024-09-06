import { useAxiosPost } from "@/hooks/useAxios";

const EBAY_PATH = "/ebay";

//  ** Authenticate and connect with ebay marketplace **
export const useEbayAuthAPI = () => {
  // ** useAxiosPost Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const ebayAuthAPI = async (pathName: string) => {
    return callApi(`${EBAY_PATH}/authorize`, { pathName });
  };

  return { ebayAuthAPI, isLoading, isError, isSuccess };
};
