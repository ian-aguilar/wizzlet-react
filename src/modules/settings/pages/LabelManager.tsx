// ** Packages **
import { useState } from "react";
import DataTable from "react-data-table-component";

// ** Components **
import AddLabel from "../components/AddLabel";
import { ModalError } from "@/components/common/ModalError";
import { btnShowType } from "@/components/form-fields/types";
import Button from "@/components/form-fields/components/Button";

// ** Types **
import { Label } from "../types/label";
import { TableFetchParams } from "@/components/common/types/table";

// ** Hooks **
import useTable from "@/hooks/useTable";
import useLabelHeaders from "../hooks/useLabelHeaders";

// ** Services **
import {
  useDeleteLabelDataAPI,
  useFetchLabelDataAPI,
} from "../services/label.service";

// ** Icons **
import { AddIconBtn, SearchIcon } from "@/assets/Svg";

const LabelManager = () => {
  //================= States =======================
  const [deleteModel, setDeleteModel] = useState<Label | null>(null);
  const [addModelOpen, setAddModelOpen] = useState(false);

  // ================= Custom hooks ====================
  const { deleteLabelAPI } = useDeleteLabelDataAPI();
  const { getLabelListingAPI, isLoading: listingLoader } =
    useFetchLabelDataAPI();

  const handleDeleteClick = (row: Label) => setDeleteModel(row);

  const { columns } = useLabelHeaders({ onDelete: handleDeleteClick });

  const getData = async ({
    page,
    rowsPerPage,
    sortField,
    sortDirection,
    search,
  }: TableFetchParams) => {
    const { data, error } = await getLabelListingAPI({
      page,
      limit: rowsPerPage,
      sortDirection,
      sortField,
      search,
    });
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
  };
  const {
    setReload,
    page,
    limit,
    onSearch,
    resetTableToInitial,
    ...TableProps
  } = useTable<Label>({
    getData,
  });

  const onAddModelClose = () => {
    setAddModelOpen(false);
    setReload((prev) => !prev);
  };

  const closeDeleteModel = () => setDeleteModel(null);

  const handleRemove = async () => {
    if (deleteModel) {
      const { error } = await deleteLabelAPI(deleteModel.id);
      if (error) console.log(error);
      else {
        closeDeleteModel();
        resetTableToInitial();
      }
    }
  };

  return (
    <div className="pb-5">
      <div className="border-b border-greyBorder pb-2 mb-4 flex justify-between">
        <h3 className="text-2xl  text-blackPrimary  font-medium">
          Label Manager
        </h3>
        <div className=" flex gap-2 ">
          <div className="relative  ">
            <input
              className="bg-transparent py-3 px-9 outline-none focus:outline-none border rounded-md"
              type="text"
              onChange={onSearch}
              placeholder="Search"
            />
            <span className="inline-block absolute left-3 top-4">
              <SearchIcon />
            </span>
          </div>
          <Button
            showType={btnShowType.green}
            btnClass=" !w-auto !px-4 "
            BtnIconLeft={
              <AddIconBtn className="text-white inline-block mr-2" />
            }
            type="submit"
            btnName="Add New Label"
            onClickHandler={() => setAddModelOpen(true)}
          />
        </div>
      </div>

      <div className=" ">
        <div className="bg-grayLightBody/10 p-5 ">
          <DataTable<Label>
            className="dataTable"
            columns={columns}
            progressPending={listingLoader}
            progressComponent={<div>Loading</div>}
            noDataComponent={<>There are no records to display!!!!</>}
            {...TableProps}
          />
        </div>

        {addModelOpen && <AddLabel onClose={onAddModelClose} />}

        {deleteModel && (
          <ModalError
            cancelButtonText="Cancel"
            confirmButtonText="Delete"
            heading="Are you sure?"
            subText="This will delete your user from list"
            onCancel={closeDeleteModel}
            onConfirm={handleRemove}
          />
        )}
      </div>
    </div>
  );
};

export default LabelManager;
