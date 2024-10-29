// ** Packages **
import { useState } from "react";
import DataTable from "react-data-table-component";

// ** Components **
import AddLabel from "../components/AddLabel";
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
import { AddIconBtn, InfoIcon, SearchIcon } from "@/assets/Svg";
import { ErrorModal } from "@/components/common/ErrorModal";
import { BaseModal } from "@/components/common/baseModal";
import { DataNotFound } from "@/components/svgIcons";

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
      return { data: [], totalRecord: 0 };
    }
    const responseData = data?.data?.data || [];
    const totalCount = data?.data?.count || 0;

    return {
      data: responseData as Label[],
      totalRecord: totalCount,
    };
  };
  const { setReload, onSearch, resetTableToInitial, ...TableProps } =
    useTable<Label>({
      getData,
    });

  const onAddModelClose = () => {
    setAddModelOpen(false);
  };

  const closeDeleteModel = () => setDeleteModel(null);

  const handleRemove = async () => {
    if (deleteModel) {
      const { error } = await deleteLabelAPI(deleteModel.id);
      if (!error) {
        closeDeleteModel();
        resetTableToInitial();
      }
    }
  };

  return (
    <div className="pb-5">
      <div className="border-b border-greyBorder pb-2 mb-4 flex justify-between flex-wrap">
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
            noDataComponent={<DataNotFound className="!h-[50vh]" />}
            {...TableProps}
          />
        </div>

        {addModelOpen && (
          <AddLabel
            onClose={onAddModelClose}
            reload={() => setReload((prev) => !prev)}
          />
        )}

        {deleteModel && deleteModel?.productTagCount <= 0 ? (
          <ErrorModal
            onClose={closeDeleteModel}
            onSave={handleRemove}
            heading="Are you sure?"
            subText="This label will be deleted from the list."
          />
        ) : deleteModel && deleteModel?.productTagCount > 0 ? (
          <BaseModal
            showType={btnShowType.green}
            confirmButtonText="OK"
            heading={"Massage"}
            subText={
              "This label cannot be deleted because it is currently in use."
            }
            onCancel={closeDeleteModel}
            onConfirm={closeDeleteModel}
            icon={<InfoIcon className="w-16 h-16 text-redAlert mx-auto " />}
          />
        ) : null}
      </div>
    </div>
  );
};

export default LabelManager;
