import {
  AddIconBtn,
  AutoSyncIcon,
  BulkImportIcon,
  CategoryBtnIcon,
  CheckIconBtn,
  DeleteIcon,
  DownArrowBlack,
  DownArrowIcon,
  DownloadCSVIcon,
  EditLabelIcon,
  SearchIcon,
  SortIcon,
} from "@/assets/Svg";
import { Button } from "../cms/common/Button";
import Checkbox from "@/components/form-fields/components/Checkbox";
import Input from "@/components/form-fields/components/Input";
import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import { useMarketplaceListingAPI } from "../marketplace/services/marketplace.service";
import { IMarketplace } from "../marketplace/types";
import { categories, data, status } from "./helper/inventryData";
import { VITE_APP_API_URL } from "@/config";
import { Pagination } from "./components/Pagination";
import DropDown from "./components/DropDown";
import { SearchBox } from "./components/SearchBox";
import { E_PRODUCT_STATUS, IItemFilter } from "./types";
import { debounce } from "lodash";

const InventoryManagement = () => {
  //================== States =========================
  const [selectedMarketplace, setSelectedMarketplace] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [category, setCategory] = useState<string>("");
  const [productStatus, setProductStatus] = useState<string>(E_PRODUCT_STATUS.active);
  const [itemPerPage, setItemPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [marketplace, setMarketplace] = useState<{ connectedMarketplace: IMarketplace[] }>({
    connectedMarketplace: [],
  });


  // ================= Custom hooks ====================
  const { getMarketplaceListingAPI } = useMarketplaceListingAPI();

  // ** Function for list products by API
  const getProductsDetails = async () => {
    console.log("productStatus: ", productStatus);
    console.log("selectedMarketplace: ", selectedMarketplace);
    console.log("category: ", category);
    console.log("searchValue: ", searchValue);
    console.log("currentPage", currentPage);
    console.log("itemPerPage: ", itemPerPage);
    console.log("++++++++++============+++++++++++");
  };

  // ** Page change event function
  const onPageChanged = useCallback(
    (event: MouseEvent<HTMLElement, globalThis.MouseEvent>, page: number | string) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage, setItemPerPage]
  );

  //Dummy json data constant
  const currentData = data.slice(
    (Number(currentPage) - 1) * itemPerPage,
    (Number(currentPage) - 1) * itemPerPage + itemPerPage
  );

  //API call for get connected marketplace
  const marketplaceListing = async () => {
    const { data, error } = await getMarketplaceListingAPI({});
    if (!error && data) {
      setMarketplace(data?.data);
    }
  };

  // Handle filter market places
  const handleMarketplace = (id: number) => {
    setCurrentPage(1);
    if (!selectedMarketplace.includes(id)) {
      setSelectedMarketplace([...selectedMarketplace, id]);
    } else {
      const newSelectedMarket = selectedMarketplace.filter((market) => market !== id);
      setSelectedMarketplace(newSelectedMarket);
    }
  };

  // Handle category dropdown
  const handleCategory = (event: React.FormEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    if (event.currentTarget.value) {
      setCategory(event.currentTarget.value);
    }
  };

  // Handle page limit dropdown
  const handlePageLimit = (event: React.FormEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    if (event.currentTarget.value) {
      setItemPerPage(Number(event.currentTarget.value));
    }
  };

  // handle product status
  const handleProductStatus = (item: string) => {
    setProductStatus(item);
  };

  // search box with debouncing
  const updateSearch = () => {
    setSearchValue(searchTerm);
  };

  const delayedSearch = useCallback(debounce(updateSearch, 500), [searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value.trim());
  };

  useEffect(() => {
    marketplaceListing();
    getProductsDetails();
  }, [currentPage, searchValue, productStatus, itemPerPage, category, selectedMarketplace]);

  //useEffect for search box
  useEffect(() => {
    delayedSearch();
    return delayedSearch.cancel;
  }, [searchTerm, delayedSearch]);

  return (
    <div>
      {/* Inventory Management */}{" "}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-blackPrimary font-bold text-3xl pb-2">Inventory Management</h2>
        <div className="flex gap-2">
          <Button btnName="Filters" btnClass=" !text-base bg-white  " BtnIconLeft={<CategoryBtnIcon />} />
          <Button btnName="Add New" btnClass=" !text-base bg-greenPrimary text-white " BtnIconLeft={<AddIconBtn />} />
        </div>
      </div>
      <section className="InventoryMgtStripe   w-full bg-white   p-5 mb-5 ">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <div className="leftItems">
            <span className="block text-grayText text-base font-normal uppercase pb-4 ">SELECT Your Marketplace</span>
            <div className="flex gap-2">
              {marketplace.connectedMarketplace.map((item) => {
                return (
                  <Button
                    key={item.id}
                    btnName={item.name}
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
              BtnIconLeft={<AutoSyncIcon className="text-white w-6 h-6 min-w-6 inline-block mr-2" />}
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
                    productStatus === item ? `text-greenPrimary border-greenPrimary` : `text-black border-greyBorder`
                  }  text-lg gap-2 border-b-2 capitalize cursor-pointer font-medium hover:bg-greenPrimary/10  transition-all duration-300 hover:transition-all hover:duration-300`}
                  onClick={() => handleProductStatus(item)}
                >
                  {item}
                  <span
                    className={`text-base ${
                      productStatus === item ? `bg-greenPrimary/10` : `bg-greyBorder/50`
                    } px-1 rounded-md`}
                  >
                    {" "}
                    {data.length}{" "}
                  </span>{" "}
                </div>
              );
            })}
          </div>
          <div className="RightBtnsTop flex gap-2">
            <SearchBox
              value={searchTerm}
              name="search"
              placeholder="Search by title or SKU"
              className="pl-10 border-none"
              InputLeftIcon={<SearchIcon />}
              onChange={handleSearch}
            />
            <Button
              btnClass=" bg-grayText text-white !font-medium  !text-base   !py-2 !px-3 "
              btnName="Bulk Import CSV"
              BtnIconLeft={<BulkImportIcon className="text-white" />}
            />
            <Button
              btnClass=" !font-medium hover:border-blackPrimary/20 text-grayText  !text-base   !py-2 !px-3 "
              btnName="Download CSV "
              BtnIconLeft={<DownloadCSVIcon className="text-grayText" />}
            />
            <DropDown
              onChange={(e) => {
                handleCategory(e);
              }}
              value={category}
              dropdownClass=" !font-medium hover:border-blackPrimary/20 text-grayText !text-base  !py-2 !px-3 "
              dropdownName="By Category "
              BtnIconLeft={<CategoryBtnIcon className="text-grayText" />}
              btnEndIcon={<DownArrowIcon />}
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
                  onChange={(e) => handlePageLimit(e)}
                />
                {/* <Button
                  btnClass="hover:!border-grayText/30 !text-base !font-medium !px-3 !py-3 bg-white "
                  btnName="10"
                  btnEndIcon={<SortIcon />}
                /> */}
                Entries
              </div>

              <Button
                btnClass="hover:border-grayText/20 !text-base !font-medium !px-3 !py-3 "
                btnName=" Newest "
                btnEndIcon={<DownArrowIcon />}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 xl:gap-x-5 gap-y-5  max-h-[calc(100vh_-_685px)]  lg:max-h-[calc(100vh_-_540px)] overflow-y-auto scroll-design ">
            {currentData.map((item) => {
              return (
                <div
                  key={item.id}
                  className=" col-span-12 xl:col-span-6 InventorySelectBox bg-white p-5 flex items-center gap-3"
                >
                  <div>
                    <Checkbox isChecked={item.status === "active"} checkLabel=" " />
                  </div>
                  <div className="IBox flex gap-6 w-full ">
                    <div className="prodImg">
                      <img src={item.img} className="max-w-[170px] max-h-[132px] " alt="" />
                    </div>
                    <div className="relative w-full">
                      <div className="absolute right-1 top-1 flex gap-2 ">
                        <div>
                          <EditLabelIcon className="cursor-pointer" />
                        </div>
                        <div>
                          <DeleteIcon className="text-redAlert cursor-pointer" />
                        </div>
                      </div>
                      <h4 className="text-[19px] font-medium text-blackPrimary mr-10 line-clamp-1 ">{item.title}</h4>
                      <div className="Badges flex flex-wrap gap-1 text-sm ">
                        {item.categories.map((category) => {
                          return (
                            <div
                              key={category.id}
                              className="rounded-[5px] bg-greenPrimary/20 capitalize text-greenPrimary font-normal p-1 "
                            >
                              {category.name}
                            </div>
                          );
                        })}
                      </div>
                      <div className="DescSpecifications flex flex-wrap gap-6 py-5">
                        <div>
                          <span className="uppercase font-normal text-sm text-grayText">Price</span>
                          <p className="text-blackPrimary font-medium ">{item.price}</p>
                        </div>
                        <div className="border-r border-dashed border-grayText/30">&nbsp;</div>
                        <div>
                          <span className="uppercase font-normal text-sm text-grayText">Date</span>
                          <p className="text-blackPrimary font-medium ">{item.date}</p>
                        </div>
                        <div className="border-r border-dashed border-grayText/30">&nbsp;</div>
                        <div>
                          <span className="uppercase font-normal text-sm text-grayText">QTY</span>
                          <p className="text-blackPrimary font-medium ">{item.qty}</p>
                        </div>
                        <div className="border-r border-dashed border-grayText/30">&nbsp;</div>
                        <div>
                          <span className="uppercase font-normal text-sm text-grayText">SKU</span>
                          <p className="text-blackPrimary font-medium ">{item.SKU}</p>
                        </div>
                      </div>
                      <div className="syncingOn flex flex-wrap gap-1 ">
                        {item.marketPlaces.map((marketsLogo) => {
                          return (
                            <div key={marketsLogo.id} className=" rounded-md  border border-grayText/20 p-1">
                              <img src={`${VITE_APP_API_URL}${marketsLogo.logo}`} className="w-14 h-auto" alt="" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-row">
          <Pagination
            pageLimit={itemPerPage}
            pageNeighbors={2}
            currentPage={currentPage}
            totalRecords={data.length}
            onPageChanged={onPageChanged}
          />
        </div>
      </section>
      {/* Inventory Management */}
    </div>
  );
};

export default InventoryManagement;
