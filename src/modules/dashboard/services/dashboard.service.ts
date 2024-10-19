import { useAxiosGet } from "@/hooks/useAxios";

export const useGetAllDashboardDataApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getAllDashboardDataAPI = async (
    startDate: string,
    endDate: string,
    marketplaceIds: string[] | number[] | null,
    userId: number | null = null
  ) => {
    const marketplaceIdsParam = marketplaceIds
      ? marketplaceIds.join(",")
      : null;

    return callApi(
      `/dashboard/sale-details?startDate=${startDate}&endDate=${endDate}&marketplaceIds=${marketplaceIdsParam}&adminUserId=${userId}`
    );
  };

  return { getAllDashboardDataAPI, isLoading, isError, isSuccess };
};
