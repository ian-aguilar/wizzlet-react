import {
  ISort,
  TableFetchParams,
  TableFetchResult,
} from "@/components/common/types/table";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { SortOrder, TableColumn } from "react-data-table-component";

function useTable<T>({
  getData,
}: {
  getData: (data: TableFetchParams) => Promise<TableFetchResult<T>>;
}) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<T[]>([]);
  const [reload, setReload] = useState(false);
  const [sort, setSort] = useState<ISort>({});
  const [totalRows, setTotalRows] = useState(0);
  const [search, setSearch] = useState<string>();

  const onChangePage = (page: number) => setPage(page);

  const onChangeRowsPerPage = (limit: number, page: number) => {
    setLimit(limit);
    setPage(page);
  };

  const onSort = (selectedColumn: TableColumn<T>, sortDirection: SortOrder) => {
    setSort({
      direction: sortDirection,
      field: selectedColumn.sortField,
    });
    setPage(1);
  };

  const onSearch = useCallback(
    debounce((e) => {
      setSearch(e.target.value);
      setPage(1);
    }, 500),
    []
  );

  const fetchData = async (
    page: number,
    rowsPerPage: number,
    sort: ISort,
    search?: string
  ) => {
    const { data, totalRecord } = await getData({
      page,
      rowsPerPage,
      sortField: sort.field,
      sortDirection: sort.direction,
      search,
    });
    setData(data);
    setTotalRows(totalRecord);
  };

  useEffect(() => {
    fetchData(page, limit, sort, search);
  }, [page, limit, sort, search, reload]);

  const resetTableToInitial = () => {
    setPage(1);
    setLimit(10);
    setReload((prev) => !prev);
  };

  return {
    data,
    paginationTotalRows: totalRows,
    onChangeRowsPerPage,
    onChangePage,
    onSort,
    pagination: true,
    paginationServer: true,
    setReload,
    page,
    limit,
    onSearch,
    resetTableToInitial,
    paginationDefaultPage: page,
  };
}

export default useTable;
