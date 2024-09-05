import { useAxiosPost } from "@/hooks/useAxios";

const EBAY_PATH = "/ebay";

export const useEbayAuthAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const ebayAuthAPI = async (pathName: string) => {
    return callApi(`${EBAY_PATH}/authorize`, { pathName });
  };

  return { ebayAuthAPI, isLoading, isError, isSuccess };
};
