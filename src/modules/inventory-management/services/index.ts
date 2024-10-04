// ** Custom hook **
import { useAxiosDelete, useAxiosGet, useAxiosPost } from "@/hooks/useAxios";
const CATEGORIES_PATH = "/categories";
const PRODUCT_LIST_PATH = "/products";
export const useGetCategoriesAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const getCategoriesAPI = async (
    marketplace?: number[],
    searchQuery?: string,
    page?: number
  ) => {
    return callApi(`${CATEGORIES_PATH}/marketplace-wise`, {
      marketplace: marketplace,
      search: searchQuery,
      page: page,
    });
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

export const useEditProductAPi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getEditProductsDetailsAPI = async (productId: string | undefined) => {
    return callApi(`${PRODUCT_LIST_PATH}/${productId}`);
  };
  return { getEditProductsDetailsAPI, isLoading, isError, isSuccess };
};

export const useProductsDeleteAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosDelete();

  const deleteProductsAPI = async (data: object) => {
    return callApi(`${PRODUCT_LIST_PATH}/products-delete`, { params: data });
  };
  return { deleteProductsAPI, isLoading, isError, isSuccess };
};

export const useProductDeleteAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosDelete();

  const deleteProductAPI = async (id: number) => {
    return callApi(`${PRODUCT_LIST_PATH}/products-delete/${id}`);
  };
  return { deleteProductAPI, isLoading, isError, isSuccess };
};
