import { useAxiosGet, useAxiosPut } from "@/hooks/useAxios";

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
