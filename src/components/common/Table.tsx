// Packages
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import DataTable, { SortOrder, TableColumn } from "react-data-table-component";

// types
import { ISort, ITableProps } from "@/components/common/types/table";

function Table<T>({
  getData,
  loading,
  columns,
  limit,
  page,
  setLimit,
  setPage,
  reload,
}: ITableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [sort, setSort] = useState<ISort>({});
  const [search, setSearch] = useState<string>();

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

  const handlePageChange = (page: number) => setPage(page);

  const handlePerRowsChange = (limit: number, page: number) => {
    setLimit(limit);
    setPage(page);
  };

  const handleSort = (
    selectedColumn: TableColumn<T>,
    sortDirection: SortOrder
  ) => {
    setSort({
      direction: sortDirection,
      field: selectedColumn.sortField,
    });
    setPage(1);
  };

  const setSearchValue = useCallback(
    debounce((e) => {
      setSearch(e.target.value);
      setPage(1);
    }, 500),
    []
  );

  useEffect(() => {
    fetchData(page, limit, sort, search);
  }, [page, limit, sort, search, reload]);

  return (
    <>
      <input type="text" onChange={setSearchValue} />
      <DataTable<T>
        className="dataTable"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        progressComponent={<div>Loading</div>}
        paginationDefaultPage={page} // Set the current page
        // sortIcon={sortIcon}
        onSort={handleSort}
        noDataComponent={<>There are no records to display!!!!</>}
      />
    </>
  );
}

export default Table;
