import { useAxiosGet, useAxiosPost } from "@/hooks/useAxios";

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

export const useGetProductMarketplaceAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getProductMarketplace = async (productId: string) => {
    return callApi(`${PATH}/getProductMarketplace`, {
      params: { productId: productId },
    });
  };

  return { getProductMarketplace, isLoading, isError, isSuccess };
};
