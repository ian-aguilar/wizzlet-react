import Table from "@/components/common/Table";
import { useGetUserListAPI } from "./services/user.service";
import {
  TableFetchParams,
  TableFetchResult,
} from "@/components/common/types/table";

const columns = [
  {
    name: "Name",
    id: "full_name",
    sortField: "full_name",
    sortable: true,
    selector: (row: any) => row.full_name,
  },
  {
    name: "Email",
    id: "email",
    sortField: "email",
    sortable: true,
    selector: (row: any) => row.email,
  },
];

interface UserData {
  email: string;
  full_name: string;
}

const UserManagement = () => {
  const { getUserListAPI, isLoading } = useGetUserListAPI();

  const getData = async ({
    page,
    rowsPerPage,
    sortDirection,
    sortField,
    search,
  }: TableFetchParams): Promise<TableFetchResult<UserData>> => {
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
      <Table<UserData>
        getData={getData}
        loading={isLoading}
        columns={columns}
      />
    </>
  );
};

export default UserManagement;
