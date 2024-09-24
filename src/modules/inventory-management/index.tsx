// ** Packages **
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

// ** Icons **
import {
  AddIconBtn,
  AutoSyncIcon,
  BulkImportIcon,
  CategoryBtnIcon,
  CheckIconBtn,
  DownArrowIcon,
  DownloadCSVIcon,
  SearchIcon,
} from "@/assets/Svg";

// ** Components **
import Button from "../../components/form-fields/components/Button";
import Checkbox from "@/components/form-fields/components/Checkbox";
import { SearchBox } from "../../components/common/SearchBox";
import { Pagination } from "./components/Pagination";
import DropDown from "./components/DropDown";
import Product from "./components/Product";
import AsyncSelectField from "./components/AsyncSelectField";

// ** Helper **
import { status } from "./helper/inventryData";

// ** Services **
import { useMarketplaceListingAPI } from "../marketplace/services/marketplace.service";
import { useGetCategoriesAPI, useProductListingAPI } from "./services";

// ** Types **
import { IMarketplace } from "../marketplace/types";
import { btnShowType } from "@/components/form-fields/types";
import { E_PRODUCT_STATUS, Option, productProps } from "./types";

// Top corner filter
// import { FilterBox } from "./components/FilterBox";
// import { InputBox } from "@/components/common/InputBox";

const InventoryManagement = () => {
  // ** States **
  const [totalItem, setTotalItem] = useState<number>();
  const [selectedMarketplace, setSelectedMarketplace] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [category, setCategory] = useState<Option[] | undefined>(undefined);
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState<boolean>(false);
  // const [currentFilter, setCurrentFilter] = useState<Option | undefined>(
    //   undefined
    // );
    // const [filterDate, setFilterDate] = useState<Date>();
  const [productStatus, setProductStatus] = useState<string>(
    E_PRODUCT_STATUS.active
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [marketplace, setMarketplace] = useState<{
    connectedMarketplace: IMarketplace[];
  }>({
    connectedMarketplace: [],
  });
  const [itemPerPage, setItemPerPage] = useState<Option>({
    label: "10",
    value: "10",
  });
  const [products, setProducts] = useState<{
    products: productProps[];
    totalRecord?: number;
    otherStatusTotal?: number;
  }>({
    products: [],
  });
  
  const navigate = useNavigate();
  
  // ** Custom hooks **
  const { getMarketplaceListingAPI } = useMarketplaceListingAPI();
  const { getCategoriesAPI, isLoading: categoryLoading } =
  useGetCategoriesAPI();
  const { getProductsDetailsAPI, isLoading: productListLoading } =
  useProductListingAPI();
  
  // ** API call for get connected marketplace **
  const marketplaceListing = async () => {
    const { data, error } = await getMarketplaceListingAPI({});
    if (!error && data) {
      setMarketplace(data?.data);
      setSelectedMarketplace(
        data?.data.connectedMarketplace.map((item: IMarketplace) => item.id)
        );
      }
    };
    
    useEffect(() => {
      marketplaceListing();
    }, []);

  // ** Function for list products by API
  const getProductsDetails = async (
    search: string = searchTerm,
    marketplace: number[] = [],
    status: string = "",
    page: number = Number(currentPage),
    limit: number = Number(itemPerPage.value)
    ) => {
    const categoryLabels = category?.map((item) => item.label) || []
    const { data, error } = await getProductsDetailsAPI({
      productStatus: status !== "" ? status : productStatus,
      selectedMarketplace: {
        marketplace: marketplace.length ? marketplace : selectedMarketplace,
      },
      category: {
        categories: categoryLabels,
      },
      search: search,
      currentPage: page,
      itemPerPage: limit,
    });
    if (!error && data) {
      setProducts(data?.data);
      setTotalItem(data?.data?.totalRecord);
    }
  };

  // ** Page change event function
  const onPageChanged = useCallback(
    (selectedItem: { selected: number }): void => {
      const newPage = selectedItem.selected + 1;
      setCurrentPage(newPage);
      getProductsDetails(
        searchTerm,
        selectedMarketplace,
        productStatus,
        newPage,
        Number(itemPerPage.value)
      );
    },
    [searchTerm, selectedMarketplace, productStatus, itemPerPage.value]
  );

  // ** Categories fetch **
  const getCategories = async (search: string, page: number) => {
    const { data, error } = await getCategoriesAPI(
      selectedMarketplace,
      search,
      page
    );
    if (!error && data) {
      return data?.data;
    }
  };

  // ** Handle filter market places **
  const handleMarketplace = (id: number) => {
    setCurrentPage(1);
    setCategory([]);
    if (!selectedMarketplace.includes(id)) {
      setSelectedMarketplace([...selectedMarketplace, id]);
    } else {
      const newSelectedMarket = selectedMarketplace.filter(
        (market) => market !== id
      );
      setSelectedMarketplace(newSelectedMarket);
    }
  };

  // ** handle product status **
  const handleProductStatus = (item: E_PRODUCT_STATUS) => {
    setCurrentPage(1);
    setProductStatus(item);
  };

  // ** search box with debouncing **
  const request = debounce(
    (value, selectedMarketplace, status, page, itemPerPage) => {
      setCurrentPage(1);
      getProductsDetails(value, selectedMarketplace, status, page, itemPerPage);
    },
    500
  );

  const debounceRequest = useCallback(
    (value: string, selectedMarketplace: number[], status: string) =>
      request(value, selectedMarketplace, status, 1, itemPerPage.value),
    [itemPerPage]
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value.trim());
    debounceRequest(
      event.currentTarget.value.trim(),
      selectedMarketplace,
      productStatus
    );
  };

  useEffect(() => {
    getProductsDetails(searchTerm, selectedMarketplace, productStatus, Number(currentPage), Number(itemPerPage.value));
  }, [currentPage, productStatus, itemPerPage, category, selectedMarketplace]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-blackPrimary font-bold text-3xl pb-2">
          Inventory Management
        </h2>
        <div className="flex gap-2">
          <div>
            <Button
              onClickHandler={() => setIsFilterBoxOpen(!isFilterBoxOpen)}
              btnName="Filters"
              showType={btnShowType.primary}
              btnClass="!text-base bg-white "
              BtnIconLeft={<CategoryBtnIcon />}
            />
            {/* Top corner filter  */}
            {/*
            <div className="relative ">
              <FilterBox label="FILTER BY" isOpen={isFilterBoxOpen}>
                <DropDown
                  value={currentFilter}
                  onChange={(e) => {
                    if (e) {
                      setCurrentFilter(e);
                    }
                  }}
                  isSearchable={false}
                  dropdownClass="!font-medium hover:border-blackPrimary/20 bg-slate-300 text-black min-w-80 !text-base"
                  options={[{ id: 1, name: "Date Created" }]}
                />
                {currentFilter?.value === "Date Created" ? (
                  <div>
                    <InputBox
                      type="date"
                      name="dateCreated"
                      onChange={(e) => {
                        setFilterDate(e.currentTarget.value as unknown as Date);
                      }}
                      value={filterDate}
                      placeholder="Select date"
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </FilterBox>
            </div> */}
          </div>
          <Button
            btnName="Add New"
            showType={btnShowType.greenRound}
            onClickHandler={() => navigate("/inventory-management/product-form/1/0")}
            btnClass=" !text-base bg-greenPrimary text-white "
            BtnIconLeft={<AddIconBtn />}
          />
        </div>
      </div>
      <section className="InventoryMgtStripe   w-full bg-white   p-5 mb-5 ">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <div className="leftItems">
            <span className="block text-grayText text-base font-normal uppercase pb-4 ">
              SELECT Your Marketplace
            </span>
            <div className="flex gap-2">
              {marketplace.connectedMarketplace.length > 0 ? (
                marketplace.connectedMarketplace.map((item) => {
                  return (
                    <Button
                      key={item.id}
                      btnName={item.name}
                      showType={btnShowType.primary}
                      onClickHandler={() => handleMarketplace(item.id)}
                      btnClass={`!rounded-full capitalize ${
                        selectedMarketplace.includes(item.id)
                          ? `!bg-black text-white`
                          : `border !text-grayText hover:!text-white`
                      } !text-lg  !px-4 !py-1 !w-auto hover:!bg-greenPrimary`}
                      BtnIconLeft={
                        selectedMarketplace.includes(item.id) ? (
                          <CheckIconBtn className="text-white inline-block mr-2 w-4 h-4" />
                        ) : (
                          <></>
                        )
                      }
                    />
                  );
                })
              ) : (
                <p>No marketplaces connected</p>
              )}
            </div>
          </div>
          <div className="RightItems flex gap-4 items-center">
            <Button
              btnName="Sync Now"
              btnClass="!bg-greenPrimary text-white !text-base"
              BtnIconLeft={
                <AutoSyncIcon className="text-white w-6 h-6 min-w-6 inline-block mr-2" />
              }
            />
            <div className="flex gap-2 items-center ">
              <span className="p-3 bg-grayLightBody/5 inline-block rounded-full">
                <AutoSyncIcon className="text-greenPrimary w-9 h-9 min-w-9" />
              </span>
              <div className="whitespace-nowrap text-sm">
                <div className="text-black font-medium">Last Auto Sync</div>
                <p className="text-grayText">15 May 2020 9:30 am</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" w-full bg-white p-4 mb-5 ">
        <div className="TopTabsBtns flex justify-between items-center gap-4 flex-wrap ">
          <div className="TopLEftTabs flex">
            {status.map((item) => {
              return (
                <div
                  key={item}
                  className={`activeTab px-7 py-2 flex items-center ${
                    productStatus === item
                      ? `text-greenPrimary border-greenPrimary`
                      : `text-black border-greyBorder`
                  }  text-lg gap-2 border-b-2 capitalize cursor-pointer font-medium hover:bg-greenPrimary/10  transition-all duration-300 hover:transition-all hover:duration-300`}
                  onClick={() => handleProductStatus(item)}
                >
                  {item}
                  <span
                    className={`text-base ${
                      productStatus === item
                        ? `bg-greenPrimary/10`
                        : `bg-greyBorder/50`
                    } px-1 rounded-md`}
                  >
                    {productStatus === item
                      ? totalItem
                      : products.otherStatusTotal}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="RightBtnsTop flex gap-2">
            <SearchBox
              value={searchTerm}
              name="search"
              placeholder="Search by title or SKU"
              className="pl-10"
              InputLeftIcon={<SearchIcon />}
              onChange={handleSearch}
            />
            <Button
              showType={btnShowType.primary}
              btnClass=" bg-grayText text-white !font-medium  !text-base   !py-2 !px-3 "
              btnName="Bulk Import CSV"
              BtnIconLeft={<BulkImportIcon className="text-white" />}
            />
            <Button
              showType={btnShowType.primary}
              btnClass=" !font-medium hover:border-blackPrimary/20 text-grayText  !text-base   !py-2 !px-3 "
              btnName="Download CSV "
              BtnIconLeft={<DownloadCSVIcon className="text-grayText" />}
            />
            <AsyncSelectField
              name="Categories select box"
              serveSideSearch={true}
              getOnChange={(e) => {
                setCurrentPage(1);
                if (e) {
                  setCategory(e);
                  getProductsDetails(
                    searchTerm,
                    selectedMarketplace,
                    productStatus,
                    1
                  );
                }
              }}
              isLoading={categoryLoading}
              isMulti={true}
              isSearchable={true}
              notClearable={false}
              getOptions={getCategories}
              value={category !== undefined || null ? category : undefined}
              className=" !font-medium hover:border-blackPrimary/20 text-grayText min-w-80 !text-base  !py-2 !px-3 "
              placeholder="By Category"
            />
          </div>
        </div>

        <div className="ActiveItemsBox p-5 bg-grayLightBody/5 mt-7">
          <div className="flex gap-5 justify-between items-center flex-wrap mb-6">
            <div className="flex gap-5 items-center ">
              <h3 className="text-[26px] font-medium ">
                {productStatus === E_PRODUCT_STATUS.active
                  ? `Active Items`
                  : `Draft Items`}
              </h3>
              <Checkbox checkLabel="Check All" />
            </div>
            <div className="flex gap-5 items-center ">
              <div className="inline-flex gap-2 items-center text-grayText">
                Show
                <DropDown
                  dropdownName="Limit"
                  value={itemPerPage}
                  dropdownClass="hover:!border-grayText/30 !text-base !font-medium !px-3 !py-3 bg-white "
                  options={[
                    { id: 1, name: "2" },
                    { id: 2, name: "20" },
                    { id: 3, name: "25" },
                    { id: 4, name: "50" },
                    { id: 5, name: "100" },
                  ]}
                  onChange={(e) => {
                    setCurrentPage(1);
                    if (e) {
                      setItemPerPage(e);
                      getProductsDetails(
                        searchTerm,
                        selectedMarketplace,
                        productStatus,
                        1,
                        Number(e.value)
                      );
                    }
                  }}
                />
                Entries
              </div>
              <Button
                btnClass="hover:border-grayText/20 !text-base !font-medium !px-3 !py-3 "
                btnName="Newest"
                showType={btnShowType.primary}
                btnEndIcon={<DownArrowIcon />}
              />
            </div>
          </div>
          <div>
            <Product
              isLoading={productListLoading}
              currentData={products.products}
            />
          </div>
        </div>
        <div className="flex justify-end pt-2">
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
      </section>
    </div>
  );
};

export default InventoryManagement;
