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

import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import Button from "../../components/form-fields/components/Button";
import Checkbox from "@/components/form-fields/components/Checkbox";
import { SearchBox } from "../../components/common/SearchBox";
import { Pagination } from "./components/Pagination";
import DropDown from "./components/DropDown";
import Product from "./components/Product";

import { IMarketplace } from "../marketplace/types";
import { E_PRODUCT_STATUS, Option } from "./types";
import { btnShowType } from "@/components/form-fields/types";

import { categories, data, status } from "./helper/inventryData";
import { useMarketplaceListingAPI } from "../marketplace/services/marketplace.service";
import { useNavigate } from "react-router-dom";
import { PrivateRoutesPath } from "../Auth/types";

const InventoryManagement = () => {
  //================== States =========================
  const [selectedMarketplace, setSelectedMarketplace] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [category, setCategory] = useState<Option | undefined>(undefined);
  const [productStatus, setProductStatus] = useState<string>(
    E_PRODUCT_STATUS.active
  );
  const [itemPerPage, setItemPerPage] = useState<Option>({
    label: "10",
    value: "10",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [marketplace, setMarketplace] = useState<{
    connectedMarketplace: IMarketplace[];
  }>({
    connectedMarketplace: [],
  });
  const navigate = useNavigate();

  // ================= Custom hooks ====================
  const { getMarketplaceListingAPI } = useMarketplaceListingAPI();

  // ** Function for list products by API
  const getProductsDetails = async (search: string = "") => {
    console.log("productStatus: ", productStatus);
    console.log("selectedMarketplace: ", selectedMarketplace);
    console.log("category: ", category?.value ? category.value : "");
    console.log("searchValue: ", search);
    console.log("currentPage", currentPage);
    console.log("itemPerPage: ", itemPerPage.value);
    console.log("++++++++++============+++++++++++");
  };

  // ** Page change event function
  const onPageChanged = useCallback(
    (
      event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
      page: number | string
    ) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage, setItemPerPage]
  );

  // ** Dummy json data constant **
  const currentData = data.slice(
    (Number(currentPage) - 1) * Number(itemPerPage.value),
    (Number(currentPage) - 1) * Number(itemPerPage.value) +
      Number(itemPerPage.value)
  );

  // ** API call for get connected marketplace **
  const marketplaceListing = async () => {
    const { data, error } = await getMarketplaceListingAPI({});
    if (!error && data) {
      setMarketplace(data?.data);
    }
  };

  // ** Handle filter market places **
  const handleMarketplace = (id: number) => {
    setCurrentPage(1);
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
    setProductStatus(item);
  };

  // ** search box with debouncing **
  const request = debounce((value) => {
    getProductsDetails(value);
  }, 500);

  const debounceRequest = useCallback((value: string) => request(value), []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value.trim());
    debounceRequest(event.currentTarget.value.trim());
  };

  useEffect(() => {
    marketplaceListing();
  }, []);

  useEffect(() => {
    getProductsDetails();
  }, [currentPage, productStatus, itemPerPage, category, selectedMarketplace]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-blackPrimary font-bold text-3xl pb-2">
          Inventory Management
        </h2>
        <div className="flex gap-2">
          <Button
            btnName="Filters"
            showType={btnShowType.primary}
            btnClass="!text-base bg-white  "
            BtnIconLeft={<CategoryBtnIcon />}
          />
          <Button
            btnName="Add New"
            showType={btnShowType.greenRound}
            onClickHandler={() =>
              navigate(PrivateRoutesPath.productBasicForm.view)
            }
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
              {marketplace.connectedMarketplace.map((item) => {
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
              })}
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
      <section className=" w-full bg-white p-5 mb-5 ">
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
                  onClick={() => handleProductStatus(item)}>
                  {item}
                  <span
                    className={`text-base ${
                      productStatus === item
                        ? `bg-greenPrimary/10`
                        : `bg-greyBorder/50`
                    } px-1 rounded-md`}>
                    {data.length}
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
            <DropDown
              isSearchable={false}
              placeholder="By Category"
              onChange={(e) => {
                setSearchTerm("");
                setCurrentPage(1);
                if (e) {
                  setCategory(e);
                }
              }}
              value={category ? category : undefined}
              dropdownClass=" !font-medium hover:border-blackPrimary/20 text-grayText !text-base  !py-2 !px-3 "
              options={categories}
            />
          </div>
        </div>

        <div className="ActiveItemsBox p-5 bg-grayLightBody/5 mt-7">
          <div className="flex gap-5 justify-between items-center flex-wrap mb-6">
            <div className="flex gap-5 items-center ">
              <h3 className="text-[26px] font-medium ">Active Items</h3>
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
                    { id: 1, name: "10" },
                    { id: 2, name: "20" },
                    { id: 3, name: "25" },
                    { id: 4, name: "50" },
                    { id: 5, name: "100" },
                  ]}
                  onChange={(e) => {
                    setSearchTerm("");
                    setCurrentPage(1);
                    if (e) {
                      setItemPerPage(e);
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
            <Product currentData={currentData} />
          </div>
        </div>
        <div className="flex-row">
          <Pagination
            pageLimit={Number(itemPerPage.value)}
            pageNeighbors={2}
            currentPage={currentPage}
            totalRecords={data.length}
            onPageChanged={onPageChanged}
          />
        </div>
      </section>
    </div>
  );
};

export default InventoryManagement;
