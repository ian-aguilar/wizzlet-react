import { IMarketplace } from "@/modules/marketplace/types";
import { Dispatch, SetStateAction } from "react";
import { MultiValue } from "react-select";

export interface RevenueProfitChartProps {
  startDate: Date | null;
  endDate: Date | null;
  totalRevenue: number;
  data: RevenueMarketDetails[];
  selectedMarketplace: MultiValue<OptionType> | undefined;
}

export interface RevenueProfitDonutChartProps {
  revenueData: RevenueMarketDetails[];
  connectedMarketplace: IMarketplace[];
  selectedMarketplace: MultiValue<OptionType> | undefined;
}

export interface DatePickerWithMonthSelectProps {
  selectedMonth: string;
  startDate: Date | null | any;
  endDate: Date | null | any;
  onDateRangeChange: (dates: [Date | null, Date | null]) => void;
  onMonthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  userFullName?: string;
  isDatePickerOpen: boolean;
  setIsDatePickerOpen: Dispatch<SetStateAction<boolean>>;
}

export interface MarketplaceRevenue {
  name: string;
  value: number;
}

export interface RevenueData {
  date: string;
  marketplaceId: number[];
  revenue: number;
}

export interface Marketplace {
  id: number;
  name: string;
  coming_soon: boolean;
  logo: string;
}

export interface RevenueMarketDetails {
  date: string;
  marketplaceId: number[];
  revenue: number;
}
export interface OptionType {
  value: string;
  label: string;
}

// Define interfaces for each section of the data
export interface ListedDetail {
  listedItems: string;
}

export interface SaleDetail {
  averageSalePrice: string;
  totalSoldItems: string;
}

export interface TopSoldCategory {
  categoryName: string;
  percentage: string;
}

export interface RevenueMarketDetail {
  date: string;
  marketplaceId: number[];
  revenue: number;
}

// Define the main data type
export interface DashboardData {
  listedDetails: ListedDetail[];
  saleDetails: SaleDetail[];
  TopSoldCategories: TopSoldCategory[];
  revenueMarketDetails: RevenueMarketDetail[];
  totalRevenue: number;
}
