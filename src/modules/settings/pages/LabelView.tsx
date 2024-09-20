// ** Packages **
import { debounce } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

// ** Icons **
import { LeftArrowIcon, SearchIcon } from "@/assets/Svg";

// ** Components **
import LabelItems from "../components/LabelItems";
import { SearchBox } from "@/components/common/SearchBox";
import DropDown from "@/modules/inventory-management/components/DropDown";
import { Pagination } from "@/modules/inventory-management/components/Pagination";

// ** Types **
import { ILabelViewProps, Option } from "../types/label";
import { PrivateRoutesPath } from "@/modules/Auth/types";

// ** Services **
import { useFetchLabelProductDataAPI } from "../services/label.service";

const LabelView = () => {
  const [labelProduct, setLabelProduct] = useState<ILabelViewProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalItem, setTotalItem] = useState<number>();
  const [label, setLabel] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [itemPerPage, setItemPerPage] = useState<Option>({
    label: "10",
    value: "10",
  });

  const { getLabelProductListingAPI, isLoading } =
    useFetchLabelProductDataAPI();
  const { labelId } = useParams();
  const navigate = useNavigate();

  const getLabelProducts = async (
    search: string = "",
    page: number = Number(currentPage),
    limit: number = Number(itemPerPage.value)
  ) => {
    const { data, error } = await getLabelProductListingAPI({
      labelId: labelId,
      search: search,
      currentPage: page,
      itemPerPage: limit,
    });
    console.log("data: ", data?.data);
    if (data && !error) {
      setLabelProduct(data?.data.products);
      setTotalItem(data?.data?.totalRecords);
      setLabel(data?.data?.labelName);
    }
  };

  // ** Page change event function
  const onPageChanged = useCallback(
    (selectedItem: { selected: number }): void => {
      const newPage = selectedItem.selected + 1;
      console.log("selectedItem.selected: ", newPage);
      setCurrentPage(newPage);
      getLabelProducts(searchTerm, newPage, Number(itemPerPage.value));
    },
    [searchTerm, Number(itemPerPage.value)]
  );
  // ** search box with debouncing **
  const request = debounce((value, page, itemPerPage) => {
    setCurrentPage(1);
    getLabelProducts(value, page, itemPerPage);
  }, 500);

  const debounceRequest = useCallback(
    (value: string) => request(value, 1, itemPerPage.value),
    [itemPerPage]
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value.trim());
    debounceRequest(event.currentTarget.value.trim());
  };

  useEffect(() => {
    getLabelProducts(
      searchTerm,
      Number(currentPage),
      Number(itemPerPage.value)
    );
  }, [itemPerPage, currentPage]);

  return (
    <>
      <div className="pb-5">
        <div className="border-b border-greyBorder pb-2 mb-4 flex justify-between">
          <div className="flex gap-5">
            <div
              className="border p-2 rounded-full bg-white cursor-pointer"
              onClick={() => {
                navigate(PrivateRoutesPath.setting.labelManager.view);
              }}
            >
              <LeftArrowIcon />
            </div>
            <h3 className="text-2xl  text-blackPrimary  font-medium">
              Label Manager
            </h3>
            <div className="rounded-[5px] bg-greenPrimary/20 capitalize text-greenPrimary font-normal p-1 px-4 ">
              {label}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <SearchBox
              value={searchTerm}
              name="search"
              placeholder="Search by title or SKU"
              className="pl-10"
              InputLeftIcon={<SearchIcon />}
              onChange={handleSearch}
            />
          </div>
          <div className="inline-flex gap-2 items-center text-grayText">
            Show
            <DropDown
              dropdownName="Limit"
              isSearchable={false}
              value={itemPerPage}
              dropdownClass="hover:!border-grayText/30 !text-base !font-medium !px-3 !py-3 bg-white "
              options={[
                { id: 1, name: "1" },
                { id: 2, name: "2" },
                { id: 3, name: "25" },
                { id: 4, name: "50" },
                { id: 5, name: "100" },
              ]}
              onChange={(e) => {
                setSearchTerm("");
                setCurrentPage(1);
                if (e) {
                  setItemPerPage(e);
                  getLabelProducts(
                    searchTerm,
                    Number(currentPage),
                    Number(e.value)
                  );
                }
              }}
            />
            Entries
          </div>
        </div>
        <div>
          <div>
            <LabelItems isLoading={isLoading} currentData={labelProduct} />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          {totalItem ? (
            <Pagination
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageLimit={Number(itemPerPage.value)}
              currentPage={currentPage}
              totalRecords={Number(totalItem)}
              onPageChanged={onPageChanged}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default LabelView;
