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
import { ErrorModal } from "@/modules/user-management/components/ModalError";

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
import WarningModal from "@/modules/user-management/components/warningModal";
import InviteModal from "./components/inviteModal";
import { PlusIcon, SearchIcon } from "@/assets/Svg";

const UserManagement = () => {
  //================= States =======================
  const [addModel, setAddModel] = useState(false);
  const [itemForDelete, setItemForDelete] = useState<number | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<{
    status: boolean | null;
    link: string | null | undefined;
  }>({ status: null, link: null });
  const [itemForStatusChange, setItemForStatusChange] = useState<{
    id: number | null;
    status: string | null;
  }>({ id: null, status: null });

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

  const { setReload, onSearch, ...TableProps } = useTable<IUserListing>({
    getData,
  });

  const onDelete = (id: number) => setItemForDelete(id);

  const onInactive = (id: number, status: string) => {
    setItemForStatusChange({ id, status });
  };

  const onStatusChange = async () => {
    if (itemForStatusChange.id) {
      const { error } = await userStatusChangeAPI(itemForStatusChange.id);
      if (!error) {
        setItemForStatusChange({ id: null, status: null });
        setReload((prev) => !prev);
      }
    }
  };

  const { userHeaders } = useUserHeaders({ onDelete, onInactive });

  const handleRemove = async () => {
    if (itemForDelete) {
      const { error } = await userDeleteAPI(itemForDelete);
      if (!error) {
        setItemForDelete(null);
        setReload((prev) => !prev);
      }
    }
  };

  const handleAddUserClose = (reload?: boolean, link?: string) => {
    setAddModel(false);
    if (reload) {
      setReload((prev) => !prev);
      setIsInviteModalOpen({
        status: true,
        link: link,
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-blackPrimary font-bold text-3xl pb-2">
          User Management
        </h2>

        <Button
          showType={btnShowType.green}
          btnClass="!w-auto !px-14"
          type="submit"
          btnName="Add New User"
          onClickHandler={() => setAddModel(true)}
          BtnIconLeft={<PlusIcon className={"mr-2"} />}
        />
      </div>

      <section className=" w-full bg-white  p-5 mb-5 h-[calc(100%_-_40px)]  overflow-y-auto scroll-design  ">
        <div className="mb-4 flex gap-4 justify-end">
          <div className="relative">
            <input
              className="bg-grayLightBody/10 py-3 px-9 outline-none focus:outline-none border rounded-md"
              type="text"
              onChange={onSearch}
              placeholder="Search by name, email..."
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
              className="dataTable"
              columns={userHeaders}
              progressPending={isLoading}
              progressComponent={<div>Loading</div>}
              noDataComponent={<>There are no records to display!!!!</>}
              {...TableProps}
            />
          </div>
        </div>
      </section>
      {addModel && <AddUser onClose={handleAddUserClose} />}
      {itemForStatusChange.id && (
        <WarningModal
          heading={`Are you sure you want to ${
            itemForStatusChange.status === "ACTIVE" ? "activate" : "inactivate"
          } this user?`}
          confirmButtonText={
            itemForStatusChange.status === "ACTIVE" ? "Active" : "Inactive"
          }
          onClose={() => setItemForStatusChange({ id: null, status: null })}
          onSave={onStatusChange}
        />
      )}
      {itemForDelete && (
        <ErrorModal
          onClose={() => setItemForDelete(null)}
          onSave={handleRemove}
        />
      )}
      {isInviteModalOpen.status && (
        <InviteModal
          onClose={() =>
            setIsInviteModalOpen({
              status: false,
              link: null,
            })
          }
          link={isInviteModalOpen.link}
        />
      )}
    </>
  );
};

export default UserManagement;
