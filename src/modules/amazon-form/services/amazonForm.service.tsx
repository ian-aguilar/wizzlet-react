import { useAxiosGet } from "@/hooks/useAxios";

export const useGetAllAmazonPropertiesApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getAllAmazonPropertiesApi = async (categoryId: number) => {
    return callApi(`/property/amazon/${categoryId}`);
  };

  return { getAllAmazonPropertiesApi, isLoading, isError, isSuccess };
};
