// Packages
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Components
import Table from "@/components/common/Table";

// Types
import { IUserListing, IUserModel } from "./types";
import {
  TableFetchParams,
  TableFetchResult,
} from "@/components/common/types/table";

// Services
import {
  useGetUserListAPI,
  useUserDeleteAPI,
  useUserPostAPI,
  useUserStatusChangeAPI,
} from "./services/user.service";

// Hooks
import useUserHeaders from "./hooks/useUserHeaders";
import { ModalCommon } from "@/components/common/ModalCommon";
import { addUserValidationSchema } from "./validation-schema/userValidation";
import Button from "@/components/form-fields/components/Button";
import { btnShowType } from "@/components/form-fields/types";
import { ModalError } from "@/components/common/ModalError";
import AddUser from "./components/add-user";

const UserManagement = () => {
  const {
    control,
    handleSubmit,
    reset: ResetForm,
    formState: { errors },
  } = useForm<IUserModel>({
    resolver: yupResolver(addUserValidationSchema),
  });

  const { userStatusChangeAPI } = useUserStatusChangeAPI();

  // ================= Custom hooks ====================
  const { userPostAPI, isLoading: loader } = useUserPostAPI();
  const { userDeleteAPI } = useUserDeleteAPI();
  const { getUserListAPI, isLoading: listingLoader } = useGetUserListAPI();

  //================= States =======================
  const [selectedRow, setSelectedRow] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    ResetForm({
      firstName: "",
      lastName: "",
      email: "",
    });
  };
  const openErrorModal = () => setIsErrorModalOpen(true);
  const closeErrorModal = () => setIsErrorModalOpen(false);

  const onSubmit = async (payload: IUserModel) => {
    await userPostAPI({
      first_name: payload?.firstName,
      last_name: payload?.lastName,
      email: payload?.email,
      // password: "sample@gmail.com",
    });
    setIsModalOpen(false);
    ResetForm({
      firstName: "",
      lastName: "",
      email: "",
    });
    setReload((prev) => !prev);
  };

  const handleRemove = async () => {
    if (selectedRow) {
      const { error } = await userDeleteAPI(selectedRow);
      if (!error) {
        closeErrorModal();
        setReload((prev) => !prev);
      }
    }
  };
  const onDelete = (id: number) => {
    setSelectedRow(id);
    openErrorModal();
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
      <div className="pt-14">
        <Button
          showType={btnShowType.green}
          btnClass=" !w-auto !px-14 "
          type="submit"
          btnName="Add New User"
          onClickHandler={openModal}
        />

        <Table<IUserListing>
          getData={getData}
          loading={listingLoader}
          columns={userHeaders}
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          reload={reload}
        />

        {isModalOpen && (
          <ModalCommon
            heading="Add User"
            onCancel={closeModal}
            onConfirm={handleSubmit(onSubmit)}
            cancelButtonText="Cancel"
            isLoading={loader}
            confirmButtonText="Add"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <AddUser control={control} errors={errors} />
            </form>
          </ModalCommon>
        )}

        {isErrorModalOpen && (
          <ModalError
            cancelButtonText="Cancel"
            confirmButtonText="Delete"
            heading="Are you sure?"
            subText="This will delete your user from list"
            onCancel={closeErrorModal}
            onConfirm={handleRemove}
          />
        )}
      </div>
    </>
  );
};

export default UserManagement;
