// Packages
import { useState } from "react";

// Components
import Table from "@/components/common/Table";

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

const UserManagement = () => {
  const { getUserListAPI, isLoading } = useGetUserListAPI();
  const { userStatusChangeAPI } = useUserStatusChangeAPI();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);

  const onDelete = (id: number) => {
    console.log(id, "deleted User Id");
  };

  const onStatusChange = async (id: number) => {
    await userStatusChangeAPI(id);
    setReload((prev) => !prev);
  };

  const { userHeaders } = useUserHeaders({ onDelete, onStatusChange });

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
  return (
    <>
      <div>UserManagement</div>
      <Table<IUserListing>
        getData={getData}
        loading={isLoading}
        columns={userHeaders}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        reload={reload}
      />
    </>
  );
};

export default UserManagement;
