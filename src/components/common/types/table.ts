import { SortOrder, TableColumn } from "react-data-table-component";

export interface ITableProps<T> {
  loading: boolean;
  reload?: boolean;
  columns: TableColumn<T>[];
  getData: (data: TableFetchParams) => Promise<TableFetchResult<T>>;
  limit: number;
  page: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
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
