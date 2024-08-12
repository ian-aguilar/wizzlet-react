// Types
import { IUserListing } from "./types";
import {
  TableFetchParams,
  TableFetchResult,
} from "@/components/common/types/table";

// Services
import {
  useGetUserListAPI,
  useUserStatusChangeAPI,
} from "./services/user.service";

// Hooks
import useUserHeaders from "./hooks/useUserHeaders";
import DataTable from "react-data-table-component";
import useTable from "@/hooks/useTable";

const UserManagement = () => {
  const { getUserListAPI, isLoading } = useGetUserListAPI();
  const { userStatusChangeAPI } = useUserStatusChangeAPI();

  const getData = async ({
    page,
    rowsPerPage,
    sortDirection,
    sortField,
    search,
  }: TableFetchParams): Promise<TableFetchResult<IUserListing>> => {
    const { data } = await getUserListAPI({
      page,
      limit: rowsPerPage,
      sortDirection,
      sortField,
      search,
    });
    if (data?.data?.data) {
      return { data: data?.data?.data, totalRecord: data?.data?.count };
    } else return { data: [], totalRecord: 0 };
  };

  const { setReload, page, limit, onSearch, ...TableProps } =
    useTable<IUserListing>({
      getData,
    });

  const onDelete = (id: number) => {
    console.log(id, "deleted User Id");
  };

  const onStatusChange = async (id: number) => {
    await userStatusChangeAPI(id);
    setReload((prev) => !prev);
  };

  const { userHeaders } = useUserHeaders({ onDelete, onStatusChange });

  return (
    <>
      <div>UserManagement</div>
      <input type="text" onChange={onSearch} placeholder="Search" />

      <DataTable<IUserListing>
        className="dataTable"
        columns={userHeaders}
        progressPending={isLoading}
        progressComponent={<div>Loading</div>}
        noDataComponent={<>There are no records to display!!!!</>}
        {...TableProps}
      />
    </>
  );
};

export default UserManagement;
