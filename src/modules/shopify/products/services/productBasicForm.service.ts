
// ** hooks **
import { useAxiosGet } from "@/hooks/useAxios";
import { ShopifyProduct } from "../types";
const BASE_PATH = "/shopify";

export const useGetShopifyNonImportedProductsApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getShopifyNonImportedProducts = async (data: object, shop:string, query:string) => {
    return callApi(`${BASE_PATH}/get-products-to-import/${shop}?${query}`, { params: data });
  };

  return { getShopifyNonImportedProducts, isLoading, isError, isSuccess };
};