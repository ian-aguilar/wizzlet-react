import { SortOrder, TableColumn } from "react-data-table-component";

export interface ITableProps<T> {
  loading: boolean;
  columns: TableColumn<T>[];
  additionalColumns: TableColumn<T>[];
  getData: (data: TableFetchParams) => Promise<TableFetchResult<T>>;
}

export interface TableFetchParams {
  page: number;
  rowsPerPage: number;
  sortField?: string;
  sortDirection?: "asc" | "desc";
  search?: string;
}

export interface TableFetchResult<T> {
  totalRecord: number;
  data: T[];
}
export interface ISort {
  field?: string;
  direction?: SortOrder;
}
