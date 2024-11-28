// ** Packages **
import DataTable from "react-data-table-component";
import { useState } from "react";

// ** Components **
import { useGetContactusListAPI, useRemoveContactUsAPI } from "./services/contactus.service";
import useTable from "@/hooks/useTable";
import useContactusHeaders from "./hooks/useContactusHeaders";

// ** Common **
import { SearchIcon } from "@/assets/Svg";
import { TableFetchParams, TableFetchResult } from "@/components/common/types/table";
import { IContactUsListing } from "./types";
import { ErrorModal } from "@/components/common/ErrorModal";
import { Loader } from "@/components/common/Loader";
import { DataNotFound } from "@/components/svgIcons";

const ContactusManagement = () => {
  const [itemForDelete, setItemForDelete] = useState<number | null>(null);

  const { getContactusListAPI, isLoading } = useGetContactusListAPI();
  const { removeContactUsAPI, isLoading: removeIsLoading } = useRemoveContactUsAPI();

  const getData = async ({
    page,
    rowsPerPage,
    sortDirection,
    sortField,
    search,
  }: TableFetchParams): Promise<TableFetchResult<IContactUsListing>> => {
    const { data } = await getContactusListAPI({
      page,
      limit: rowsPerPage,
      sortDirection,
      sortField,
      search,
    });
    if (data?.data?.data) {
      return { data: data?.data?.data, totalRecord: data?.data?.count };
    } else {
      return { data: [], totalRecord: 0 };
    }
  };

  const { setReload, onSearch, ...TableProps } = useTable({
    getData,
  });

  const onDelete = (id: number) => {
    setItemForDelete(id);
  };

  const handleRemove = async () => {
    if (itemForDelete) {
      const { error } = await removeContactUsAPI(itemForDelete);
      if (!error) {
        setItemForDelete(null);
        setReload((prev) => !prev);
      }
    }
  };

  const { contactusHeader } = useContactusHeaders({ onDelete });

  return (
    <>
      <div className="flex spa">
        <h2 className="text-blackPrimary font-bold text-3xl pb-2">Contact Us</h2>{" "}
      </div>
      <section className=" w-full bg-white  p-5 mb-5 h-[calc(100%_-_40px)]  overflow-y-auto scroll-design  ">
        <div className="mb-4 flex gap-4 justify-end">
          <div className="relative">
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
          <h3 className="font-medium text-2xl mb-6">Requests</h3>
          <div className=" ">
            <DataTable<IContactUsListing>
              className="dataTable"
              columns={contactusHeader}
              progressPending={isLoading}
              progressComponent={
                <div>
                  <Loader />
                </div>
              }
              noDataComponent={
                <>
                  <DataNotFound />
                </>
              }
              {...TableProps}
            />
          </div>
        </div>
      </section>
      {itemForDelete && (
        <ErrorModal
          onClose={() => setItemForDelete(null)}
          onSave={handleRemove}
          isLoading={removeIsLoading}
          heading="Are you sure?"
          subText="This will delete this request from contact us."
        />
      )}
    </>
  );
};

export default ContactusManagement;
