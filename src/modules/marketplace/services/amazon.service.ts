import { useAxiosPost } from "@/hooks/useAxios";

const AMAZON_PATH = "/amazon";

//  ** Authenticate and connect with amazon marketplace **
export const useAmazonAuthAPI = () => {
  // ** useAxiosPost Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const amazonAuthAPI = async (pathName: string) => {
    return callApi(`${AMAZON_PATH}/authorize`, { pathName });
  };

  return { amazonAuthAPI, isLoading, isError, isSuccess };
};
