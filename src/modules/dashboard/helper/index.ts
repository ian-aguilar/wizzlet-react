import { Marketplace, RevenueData } from "../types";

export const getRevenueAndLabels = (
  revenueMarketDetails: Array<{
    date: string;
    marketplaceId: number[];
    revenue: number;
  }>,
  startDate: string,
  endDate: string,
  selectedMarketplaceIds?: number[]
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const revenues: number[] = [];
  const labels: string[] = [];

  const dateRevenueMap: { [key: string]: number } = {};

  // Populate the date-revenue map from input data, filtering by selected marketplace IDs if provided
  revenueMarketDetails.forEach((detail) => {
    const date = new Date(detail.date);
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    // Check if the detail's marketplaceId matches the selected marketplace IDs
    const isMatch = selectedMarketplaceIds
      ? detail.marketplaceId.some((id) => selectedMarketplaceIds.includes(id))
      : true; // Include all if no selectedMarketplaceIds are provided

    if (isMatch) {
      dateRevenueMap[formattedDate] =
        (dateRevenueMap[formattedDate] || 0) + detail.revenue;
    }
  });

  // Loop through all the dates from start to end
  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // getMonth() is zero-indexed
    const day = d.getDate();

    const formattedDate = `${year}-${month}-${day}`;

    // Add revenue for the date, or 0 if no revenue is available for that date
    revenues.push(dateRevenueMap[formattedDate] || 0);

    // Format label as 'Oct X' (or other month names)
    const monthLabel = d.toLocaleString("en-US", { month: "short" });
    labels.push(`${monthLabel} ${day}`);
  }

  return { revenues, labels };
};

export const calculateMarketplaceRevenue = (
  revenueData: RevenueData[],
  marketplaces: Marketplace[],
  selectedMarketplaceId?: number[]
): { totalRevenue: number[]; names: string[] } => {
  // Filter marketplaces based on selectedMarketplaceId if provided
  const filteredMarketplaces = selectedMarketplaceId
    ? marketplaces.filter((marketplace) =>
        selectedMarketplaceId.includes(marketplace.id)
      )
    : marketplaces;

  const result = filteredMarketplaces.map((marketplace) => {
    const totalRevenue = revenueData
      .filter((data) => data.marketplaceId.includes(marketplace.id))
      .reduce((acc, data) => acc + data.revenue, 0);

    return {
      name: marketplace.name,
      totalRevenue,
    };
  });

  const totalRevenue = result.map((res) => res.totalRevenue);
  const names = result.map((res) => res.name);

  return { totalRevenue, names };
};
