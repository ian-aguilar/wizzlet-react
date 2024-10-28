import { useAxiosDelete, useAxiosGet, useAxiosPut } from "@/hooks/useAxios";

export const useGetAllAmazonPropertiesApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getAllAmazonPropertiesApi = async (
    categoryId: number | string | undefined
  ) => {
    return callApi(`/property/amazon/${categoryId}`);
  };

  return { getAllAmazonPropertiesApi, isLoading, isError, isSuccess };
};

export const useAmazonFormHandleApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPut();

  const amazonFormSubmitApi = async (
    data: object,
    { productId }: { productId: number | string },
    { categoryId }: { categoryId: number | string | undefined }
  ) => {
    return callApi(
      `/amazon/form?productId=${productId}&categoryId=${categoryId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  return { amazonFormSubmitApi, isLoading, isError, isSuccess };
};

export const useAmazonEditProductValuesApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const editAmazonProductValueApi = async (id: string | undefined) => {
    return callApi(`/amazon/products/values/${id}`);
  };

  return { editAmazonProductValueApi, isLoading, isError, isSuccess };
};

export const useCreateAmazonProductApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPut();

  const createAmazonProductApi = async (id: number | null | undefined) => {
    return callApi(`/products/create/amazon/${id}`, {});
  };

  return { createAmazonProductApi, isLoading, isError, isSuccess };
};

export const useGetProductTypeApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getProductTypeApi = async (id: number | null | undefined) => {
    return callApi(`/products/type/${id}`, {});
  };

  return { getProductTypeApi, isLoading, isError, isSuccess };
};

export const useGetAmazonVariationPropertiesApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getAmazonVariationProperties = async (
    id: number | null | undefined
  ) => {
    return callApi(`/property/amazon/variation/${id}`, {});
  };

  return { getAmazonVariationProperties, isLoading, isError, isSuccess };
};

export const useGetAmazonChildProductsApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getAmazonChildProductsApi = async (id: number | null | undefined) => {
    return callApi(`/products/amazon/child/${id}`, {});
  };

  return { getAmazonChildProductsApi, isLoading, isError, isSuccess };
};

export const useAmazonChildFormHandleApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPut();

  const amazonChildFormSubmitApi = async (
    data: object,
    { productId }: { productId: number | string },
    { categoryId }: { categoryId: number | string | undefined },
    { childId }: { childId: number | string | undefined },
    { variationId }: { variationId: number | string | undefined }
  ) => {
    return callApi(
      `/amazon/form/${categoryId}/${productId}?childId=${childId}&variationId=${variationId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  return { amazonChildFormSubmitApi, isLoading, isError, isSuccess };
};

export const useDeleteAmazonChildProductApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosDelete();

  const deleteAmazonChildProductApi = async (
    productId: number | null | undefined,
    variantId: number | null | undefined
  ) => {
    return callApi(`/products/amazon/child/${productId}/${variantId}`, {});
  };

  return { deleteAmazonChildProductApi, isLoading, isError, isSuccess };
};
