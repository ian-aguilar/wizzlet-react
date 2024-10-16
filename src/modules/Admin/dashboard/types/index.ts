export interface ProgressComponentProps {
  totalUsers: number;
  onlineUsers: number;
  offlineUsers: number;
}

export interface CategoriesProgressProps {
  categoryPercentage: number;
  subCategoryPercentage: number;
  categoriesUsed: number;
  subCategoriesUsed: number;
}
