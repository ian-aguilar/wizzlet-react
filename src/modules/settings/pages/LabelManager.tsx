import { ModalCommon } from "@/components/common/ModalCommon";
import Button from "@/components/form-fields/components/Button";
import Input from "@/components/form-fields/components/Input";
import { btnShowType } from "@/components/form-fields/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GetDataParams, IAddLabelInputs, IModelTest, Label } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { addLabelValidationSchema } from "../validation-schema/labelValidation";
import { FaTrash, FaEye } from "react-icons/fa";
import {
  useAddLabelPostAPI,
  useDeleteLabelDataAPI,
  useFetchLabelDataAPI,
} from "../services/label.service";
import Table from "@/components/common/Table";
import { TableColumn } from "react-data-table-component";
import { ModalError } from "@/components/common/ModalError";

const LabelManager = () => {
  const {
    control,
    handleSubmit,
    reset: ResetForm,
    formState: { errors },
  } = useForm<IModelTest>({
    resolver: yupResolver(addLabelValidationSchema),
  });

  // ================= Custom hooks ====================
  const { addLabelPostAPI, isLoading: loader } = useAddLabelPostAPI();
  const { deleteLabelAPI } = useDeleteLabelDataAPI();
  const { getLabelListingAPI, isLoading: listingLoader } =
    useFetchLabelDataAPI();

  //================= States =======================
  const [selectedRow, setSelectedRow] = useState<Label | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    ResetForm({
      label: "",
    });
  };

  const openErrorModal = () => setIsErrorModalOpen(true);
  const closeErrorModal = () => setIsErrorModalOpen(false);

  const onSubmit = async (payload: IAddLabelInputs) => {
    await addLabelPostAPI({
      name: payload?.label,
    });
    setIsModalOpen(false);
    ResetForm({
      label: "",
    });
  };

  const getData = async ({
    page,
    rowsPerPage,
    sortField,
    sortDirection,
    search,
  }: GetDataParams) => {
    try {
      const queryString = new URLSearchParams({
        page: page.toString(),
        limit: rowsPerPage.toString(),
        sortField: sortField || "",
        sortDirection: sortDirection || "",
        search: search || "",
      }).toString();

      const { data, error } = await getLabelListingAPI(queryString);
      if (error) {
        console.error("API error:", error);
        return { data: [], totalRecord: 0 };
      }

      const responseData = data?.data?.data || [];
      const totalCount = data?.data?.count || 0;

      return {
        data: responseData as Label[],
        totalRecord: totalCount,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        data: [],
        totalRecord: 0,
      };
    }
  };

  const handleGetData = async (params: GetDataParams) => {
    const result = await getData(params);
    return result;
  };

  const columns: TableColumn<Label>[] = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      sortField: "name",
    },
    {
      name: "Items with the label",
      selector: () => "0",
      sortable: false,
      // sortField: "created_by",
    },
    {
      name: "View Item",
      cell: (row: Label) => (
        <div className="flex">
          <div className="mr-16">
            <button
              onClick={() => console.log(`View Clicked Id <><><> ${row?.id}`)}
            >
              <FaEye />
            </button>
          </div>
          <div>
            <button onClick={() => handleDeleteClick(row)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  const handleDeleteClick = (row: Label) => {
    setSelectedRow(row);
    openErrorModal();
  };

  const handleRemove = async () => {
    if (selectedRow) {
      const { error } = await deleteLabelAPI(selectedRow.id);
      if (error) {
        console.log(error);
      } else {
        closeErrorModal();
      }
    }
  };

  return (
    <div>
      <div className="pt-14">
        <Button
          showType={btnShowType.green}
          btnClass=" !w-auto !px-14 "
          type="submit"
          btnName="Add New Label"
          onClickHandler={openModal}
        />

        <Table<Label>
          getData={handleGetData}
          loading={listingLoader}
          columns={columns}
        />

        {isModalOpen && (
          <ModalCommon
            heading="Add Label Manager"
            onCancel={closeModal}
            onConfirm={handleSubmit(onSubmit)}
            cancelButtonText="Cancel"
            isLoading={loader}
            confirmButtonText="Add"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                className=""
                placeholder="Enter Label"
                textLabelName="Add Label"
                name="label"
                label="Label"
                type="text"
                control={control}
                errors={errors}
                autoComplete={""}
              />
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
    </div>
  );
};

export default LabelManager;
