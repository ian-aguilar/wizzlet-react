import {
  OptionType,
  RevenueMarketDetail,
  RevenueMarketDetails,
} from "@/modules/dashboard/types";
import { MultiValue } from "react-select";

export interface ProgressComponentProps {
  todaysUsers: number;
  onlineUsers: number;
  offlineUsers: number;
}

export interface CategoriesProgressProps {
  categoryPercentage: number;
  subCategoryPercentage?: number;
  categoriesUsed: string;
  subCategoriesUsed?: number;
}

export interface UserData {
  activeUsers: number;
  inactiveUsers: number;
  totalUsers: number;
  totalMarketplace: number;
  onlineUsers: number;
  offlineUsers: number;
}

export interface CategoryData {
  usedCategories: string;
  usedCategoriesPercentage: number;
}

export interface AdminDashboardData {
  revenueMarketDetails: RevenueMarketDetail[];
}

export interface AdminRevenueProfitChartProps {
  startDate: Date | null;
  endDate: Date | null;
  data: RevenueMarketDetails[];
  selectedMarketplace: MultiValue<OptionType> | undefined;
}
