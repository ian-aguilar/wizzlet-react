import { useAxiosGet } from "@/hooks/useAxios";

export const useGetAllDashboardDataApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getAllDashboardDataAPI = async (
    startDate: string,
    endDate: string,
    marketplaceIds: string[] | number[] | null
  ) => {
    const marketplaceIdsParam = marketplaceIds
      ? marketplaceIds.join(",")
      : null;

    return callApi(
      `/dashboard/sale-details?startDate=${startDate}&endDate=${endDate}&marketplaceIds=${marketplaceIdsParam}`
    );
  };

  return { getAllDashboardDataAPI, isLoading, isError, isSuccess };
};
