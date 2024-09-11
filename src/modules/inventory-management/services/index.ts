// ** Custom hook **
import { useAxiosGet, useAxiosPost } from "@/hooks/useAxios";
const CATEGORIES_PATH = "/categories";
const PRODUCT_LIST_PATH = "/products";
export const useGetCategoriesAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const getCategoriesAPI = async (data: number[]) => {
    return callApi(`${CATEGORIES_PATH}/marketplace-wise`, { marketplace: data });
  };

  return { getCategoriesAPI, isLoading, isError, isSuccess };
};

export const useProductListingAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getProductsDetailsAPI = async (data: object) => {
    return callApi(`${PRODUCT_LIST_PATH}/list`, { params: data });
  };
  return { getProductsDetailsAPI, isLoading, isError, isSuccess };
};
