// ** Packages **
import { useState } from "react";
import DataTable from "react-data-table-component";

// ** Types **
import { IUserListing } from "./types";
import { btnShowType } from "@/components/form-fields/types";

// ** Components **
import {
  TableFetchParams,
  TableFetchResult,
} from "@/components/common/types/table";
import AddUser from "./components/add-user";
import { ModalError } from "@/components/common/ModalError";

// ** Services **
import {
  useGetUserListAPI,
  useUserDeleteAPI,
  useUserStatusChangeAPI,
} from "./services/user.service";

// ** Hooks **
import useTable from "@/hooks/useTable";
import useUserHeaders from "./hooks/useUserHeaders";
import Button from "@/components/form-fields/components/Button";

const UserManagement = () => {
  //================= States =======================
  const [addModel, setAddModel] = useState(false);
  const [itemForDelete, setItemForDelete] = useState<number | null>(null);

  // ================= Custom hooks ====================
  const { getUserListAPI, isLoading } = useGetUserListAPI();
  const { userStatusChangeAPI } = useUserStatusChangeAPI();
  const { userDeleteAPI } = useUserDeleteAPI();

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

  const onDelete = (id: number) => setItemForDelete(id);

  const onStatusChange = async (id: number) => {
    await userStatusChangeAPI(id);
    setReload((prev) => !prev);
  };

  const { userHeaders } = useUserHeaders({ onDelete, onStatusChange });

  const handleRemove = async () => {
    if (itemForDelete) {
      const { error } = await userDeleteAPI(itemForDelete);
      if (!error) {
        setItemForDelete(null);
        setReload((prev) => !prev);
      }
    }
  };

  return (
    <>
      <div className="pt-14">
        <Button
          showType={btnShowType.green}
          btnClass=" !w-auto !px-14 "
          type="submit"
          btnName="Add New User"
          onClickHandler={() => setAddModel(true)}
        />

        <input type="text" onChange={onSearch} placeholder="Search" />

        <DataTable<IUserListing>
          className="dataTable"
          columns={userHeaders}
          progressPending={isLoading}
          progressComponent={<div>Loading</div>}
          noDataComponent={<>There are no records to display!!!!</>}
          {...TableProps}
        />

        {addModel && (
          <AddUser
            onClose={() => setAddModel(false)}
            reload={() => setReload((prev) => !prev)}
          />
        )}

        {itemForDelete && (
          <ModalError
            cancelButtonText="Cancel"
            confirmButtonText="Delete"
            heading="Are you sure?"
            subText="This will delete your user from list"
            onCancel={() => setItemForDelete(null)}
            onConfirm={handleRemove}
          />
        )}
      </div>
    </>
  );
};

export default UserManagement;
