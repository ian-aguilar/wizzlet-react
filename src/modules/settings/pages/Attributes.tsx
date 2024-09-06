// ** Packages **
import { useState } from "react";
import DataTable from "react-data-table-component";

// ** Components **
import Button from "@/components/form-fields/components/Button";
import AddAttribute from "../components/AddAttribute";
import { btnShowType } from "@/components/form-fields/types";
import { ErrorModal } from "@/components/common/ErrorModal";
import { TableFetchParams } from "@/components/common/types/table";

// ** Icons **
import { AddIconBtn, SearchIcon } from "@/assets/Svg";

// ** Types **
import { Attributes } from "../types/attribute";

// ** Services **
import { useDeleteAttributeDataAPI, useFetchAttributeDataAPI } from "../services/attribute.service";

// ** Hooks **
import useTable from "@/hooks/useTable";
import useAttributeHeaders from "../hooks/useAttributeHeaders";

const Attribute = () => {
  // ** States **
  const [deleteModel, setDeleteModel] = useState<Attributes | null>(null);
  const [addModelOpen, setAddModelOpen] = useState(false);

  // ** Custom hooks **
  const { getAttributeListingAPI, isLoading: listingLoader } = useFetchAttributeDataAPI();
  const { deleteAttributeAPI } = useDeleteAttributeDataAPI();

  // ** Add attribute model handler **
  const onAddModelClose = () => {
    setAddModelOpen(false);
  };

  // ** Call Attributes listing API **
  const getData = async ({ page, rowsPerPage, sortField, sortDirection, search }: TableFetchParams) => {
    const { data, error } = await getAttributeListingAPI({
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
      data: responseData as Attributes[],
      totalRecord: totalCount,
    };
  };

  // ** Delete button click event handler **
  const handleDeleteClick = (row: Attributes) => setDeleteModel(row);

  // ** Use of AttributeHeaders hook **
  const { columns } = useAttributeHeaders({ onDelete: handleDeleteClick });

  const closeDeleteModel = () => setDeleteModel(null);

  // Use of UseTable hook **
  const { setReload, onSearch, resetTableToInitial, ...TableProps } = useTable<Attributes>({
    getData,
  });

  // ** Call Delete Attribute API **
  const handleRemove = async () => {
    if (deleteModel) {
      const { error } = await deleteAttributeAPI(deleteModel.id);
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
        <h3 className="text-2xl  text-blackPrimary  font-medium">Attributes</h3>
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
            BtnIconLeft={<AddIconBtn className="text-white inline-block mr-2" />}
            type="submit"
            btnName="Add New Attribute"
            onClickHandler={() => setAddModelOpen(true)}
          />
        </div>
      </div>
      <div className=" ">
        <div className="bg-grayLightBody/10 p-5 ">
          <DataTable<Attributes>
            className="dataTable"
            columns={columns}
            progressPending={listingLoader}
            progressComponent={<div>Loading</div>}
            noDataComponent={<>There are no records to display!!!!</>}
            {...TableProps}
          />
        </div>

        {addModelOpen && <AddAttribute onClose={onAddModelClose} reload={() => setReload((prev) => !prev)} />}

        {deleteModel && (
          <ErrorModal
            onClose={closeDeleteModel}
            onSave={handleRemove}
            heading="Are you sure?"
            subText="This will delete your Attribute from the list."
          />
        )}
      </div>
    </div>
  );
};

export default Attribute;
