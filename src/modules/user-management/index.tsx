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
import { AddIconBtn, SearchIcon } from "@/assets/Svg";

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
    <section className=" w-full bg-white  p-5 mb-5 h-[calc(100%_-_40px)]  overflow-y-auto scroll-design  ">
      <div className="mb-4 flex gap-4 justify-end">
        <Button
          showType={btnShowType.green}
          BtnIconLeft={<AddIconBtn className="inline-block mr-2" />}
          btnClass=" !w-auto !px-4 "
          type="submit"
          btnName="Add New User"
          onClickHandler={() => setAddModel(true)}
        />

        <div className="relative  ">
          <input
            className="bg-grayLightBody/10 py-3 px-9 outline-none focus:outline-none border rounded-md"
            type="text"
            onChange={onSearch}
            placeholder="Search"
          />
          <span className="inline-block absolute left-3 top-4">
            <SearchIcon />
          </span>
        </div>
      </div>
      <div className="bg-grayLightBody/10 p-5 ">
        <h3 className="font-medium text-2xl mb-6">Users</h3>
        <div className=" ">
          <DataTable<IUserListing>
            className="dataTable manager  max-w-[calc(100vw_-_220px)] scroll-design  overflow-auto "
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
      </div>
    </section>
  );
};

export default UserManagement;
