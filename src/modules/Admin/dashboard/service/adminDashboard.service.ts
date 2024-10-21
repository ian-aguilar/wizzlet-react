import { useAxiosGet } from "@/hooks/useAxios";

const path = "admin-dashboard";

export const useGetAdminDashboardUserDataDataApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getAdminDashboardUserDataDataApi = async () => {
    return callApi(`/${path}/user-details`);
  };

  return { getAdminDashboardUserDataDataApi, isLoading, isError, isSuccess };
};

export const useGetAdminDashboardCategoryDataApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getAdminDashboardCategoryDataApi = async (day: number | null) => {
    return callApi(`/${path}/categories-details?day=${day}`);
  };

  return { getAdminDashboardCategoryDataApi, isLoading, isError, isSuccess };
};

export const useGetDashboardRevenueDataApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getDashboardRevenueDataApi = async (
    startDate: string,
    endDate: string,
    marketplaceIds: string[] | number[] | null
  ) => {
    const marketplaceIdsParam = marketplaceIds
      ? marketplaceIds.join(",")
      : null;

    return callApi(
      `/${path}/revenue-details?startDate=${startDate}&endDate=${endDate}&marketplaceIds=${marketplaceIdsParam}`
    );
  };

  return { getDashboardRevenueDataApi, isLoading, isError, isSuccess };
};
