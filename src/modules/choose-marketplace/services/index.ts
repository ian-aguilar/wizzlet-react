import { useAxiosPost } from "@/hooks/useAxios";

const PATH = "/product";

//  ** Authenticate and connect with ebay marketplace **
export const useSetProductMarketplaceAPI = () => {
  // ** useAxiosPost Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const setProductMarketplace = async (data: object) => {
    return callApi(`${PATH}/setMarketplace`, data);
  };

  return { setProductMarketplace, isLoading, isError, isSuccess };
};
