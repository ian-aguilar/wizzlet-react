// ** Packages **
import { SetStateAction, useCallback, useEffect, useState } from "react";

// ** Common **
import Button from "@/components/form-fields/components/Button";
import { SelectMarketplace } from "./components/SelectMarketplace";
import { IItems, IOption } from "./types";
import { MARKETPLACE } from "@/components/common/types";
import { ItemCard } from "./components/ItemCard";
import Checkbox from "@/components/form-fields/components/Checkbox";
import { Pagination } from "../inventory-management/components/Pagination";

// ** Services **
import {
  useGetImportedProductsApi,
  useImportAmazonProductsApi,
  useImportEbayProductsApi,
  // useImportProductsFromAmazonApi,
  useImportProductsFromEbayApi,
} from "./services/importProducts.service";
import { useMarketplaceListingAPI } from "../marketplace/services/marketplace.service";

// ** Icon **
import { AutoSyncIcon } from "@/assets/Svg";
import { DataNotFound } from "@/components/svgIcons";

// ** Types **
import { IMarketplace } from "../marketplace/types";

const ImportProducts = () => {
  const [items, setItems] = useState<IItems[]>();
  const [totalItem, setTotalItem] = useState<number>();
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [countCheckbox, setCountCheckbox] = useState<number>(0);
  const [isCheck, setIsCheck] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [sync, setSync] = useState(false);
  const [itemPerPage, setItemPerPage] = useState<IOption>({
    label: "10",
    value: "10",
  });
  const [selectedMarketplace, setSelectedMarketplace] = useState<IOption>();
  const [marketplace, setMarketplace] = useState<{
    connectedMarketplace: IMarketplace[];
    notConnectedMarketplace: IMarketplace[];
  }>({ connectedMarketplace: [], notConnectedMarketplace: [] });

  const { getImportedProductsApi } = useGetImportedProductsApi();
  const { getMarketplaceListingAPI } = useMarketplaceListingAPI();
  const { importEbayProductsApi, isLoading } = useImportEbayProductsApi();
  // const { importProductsFromAmazonApi } = useImportProductsFromAmazonApi();
  const { importAmazonProductsApi, isLoading: syncAmazonLoading } =
    useImportAmazonProductsApi();
  const { importProductsFromEbayApi, isLoading: importLoading } =
    useImportProductsFromEbayApi();

  const importProductsHandler = async () => {
    if (selectedMarketplace) {
      switch (selectedMarketplace.value) {
        case MARKETPLACE.EBAY: {
          await importEbayProductsApi();
          setSync((prev) => !prev);
          break;
        }
        case MARKETPLACE.AMAZON: {
          return;
          await importAmazonProductsApi();
          setSync((prev) => !prev);
          break;
        }
      }
    }
  };

  const getImportProductsHandler = async () => {
    if (selectedMarketplace) {
      switch (selectedMarketplace.value) {
        case MARKETPLACE.EBAY: {
          const { data } = await getImportedProductsApi({
            currentPage: currentPage,
            limit: itemPerPage.value,
            marketplace: MARKETPLACE.EBAY,
          });
          setItems(data?.data?.products || []);
          setTotalItem(data?.data?.totalRecord);
          break;
        }
        case MARKETPLACE.AMAZON: {
          const { data } = await getImportedProductsApi({
            currentPage: currentPage,
            limit: itemPerPage.value,
            marketplace: MARKETPLACE.AMAZON,
          });
          setItems(data?.data?.products || []);
          setTotalItem(data?.data?.totalRecord);
          return;
        }
      }
    }
  };

  const marketplaceListing = async () => {
    const { data, error } = await getMarketplaceListingAPI({});
    if (!error && data) {
      setMarketplace(data?.data);
      const tempMarketplace = data?.data.connectedMarketplace.find(
        (item: IMarketplace) => item.name === MARKETPLACE.EBAY
      );
      if (tempMarketplace) {
        setSelectedMarketplace({
          label: tempMarketplace.name.toUpperCase(),
          value: tempMarketplace.name.toLowerCase(),
        });
      }
    }
  };

  useEffect(() => {
    marketplaceListing();
  }, []);

  const marketplaces = marketplace?.connectedMarketplace?.map((item) => {
    return {
      label: item?.name.toUpperCase(),
      value: item?.name.toLowerCase(),
    };
  });

  useEffect(() => {
    getImportProductsHandler();
  }, [selectedMarketplace, sync, itemPerPage, currentPage]);

  const selectAllHandler = () => {
    setIsAllChecked(!isAllChecked);
    if (items) {
      const selectedItems: number[] = [];
      items.forEach((item) => {
        if (!item.is_imported) {
          selectedItems.push(item.id);
        }
      });
      setIsCheck(selectedItems);
    }
    if (isAllChecked) {
      setIsCheck([]);
    }
  };

  const importProductsFromEbayHandler = async () => {
    if (isCheck.length > 0) {
      if (selectedMarketplace?.value === MARKETPLACE.EBAY) {
        await importProductsFromEbayApi(isCheck);
      }
      if (selectedMarketplace?.value === MARKETPLACE.AMAZON) {
        return;
      }
      await getImportProductsHandler();
      setIsCheck([]);
    }
  };

  const onPageChanged = useCallback(
    (selectedItem: { selected: number }): void => {
      const newPage = selectedItem.selected + 1;
      setCurrentPage(newPage);
    },
    [selectedMarketplace, itemPerPage.value]
  );

  useEffect(() => {
    if (items && items.length > 0) {
      const importedItemsCount = items.filter(
        (item) => !item.is_imported
      ).length;
      setCountCheckbox(importedItemsCount);
    } else {
      setCountCheckbox(0);
    }
  }, [items]);

  return (
    <div>
      <div className="flex justify-between gap-4 mb-2 items-center">
        <h2 className="text-blackPrimary font-bold text-3xl pb-2">Import</h2>
        <div className="flex gap-2 items-center ">
          <span className="p-3 bg-greenPrimary/5 inline-block rounded-full">
            <AutoSyncIcon className="text-greenPrimary w-9 h-9 min-w-9" />
          </span>
          <div className="whitespace-nowrap text-sm">
            <div className="text-black font-medium">Last Auto Sync</div>
            <p className="text-grayText">15 May 2020 9:30 am</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-7 mb-4">
        <p className="uppercase text-base font-normal text-grayText mb-2">
          Select the source to import from
        </p>
        <div className="flex gap-4 items-center ">
          <SelectMarketplace
            StylesConfig={{
              singleValue: (base: any) => ({
                ...base,
                color: "#fff !important",
                fontSize: "16px",
                lineHeight: "18px",
              }),
              indicatorSeparator: (base: any) => ({
                ...base,
                display: "none",
              }),
              dropdownIndicator: (base: any) => ({
                ...base,
                color: "#fff  !important",
                paddingRight: "0px",
              }),
              control: (base: any) => ({
                ...base,
                background: "#09A17A",
                border: "1px solid rgb(31 77 161 / 0.2) !important",
                padding: "3px 14px",
                boxSizing: "border-box",
                borderRadius: "5px",
                boxShadow: "none",
                color: "#fff ",
              }),
              valueContainer: (base: any) => ({
                ...base,
                paddingLeft: "0px",
                color: "#fff",
              }),
              placeholder: (base: any) => ({
                ...base,
                color: "#fff",
              }),
            }}
            isDisabled={isLoading || syncAmazonLoading}
            isSearchable={false}
            value={selectedMarketplace}
            placeholder="Select Marketplace"
            options={marketplaces}
            onChange={(result: IOption) => {
              setSelectedMarketplace(result as IOption);
            }}
          />
          <Button
            btnName={"Sync All Products"}
            onClickHandler={importProductsHandler}
            isLoading={isLoading || syncAmazonLoading}
            btnClass="!w-auto border border-solid border-black/30 bg-transparent !text-grayText "
          />
          <div>
            {isCheck.length > 0 && (
              <Button
                btnName={`Import ${isCheck.length} Products`}
                onClickHandler={importProductsFromEbayHandler}
                isLoading={importLoading}
                btnClass="!w-auto !ml-auto "
              />
            )}
          </div>
        </div>
        {/* <div className="flex gap-4 items-start pt-5">
          <div className="flex flex-col gap-2 ">
            <label> Search </label>
            <SearchBox
              InputLeftIcon={<SearchIcon />}
              className="pl-14"
              placeholder="Search"
              name=""
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label> Status </label>
            <Button
              btnName={"Connected"}
              isLoading={isLoading}
              btnClass="!w-auto !bg-white !text-grayText border border-grayLightBody "
              btnEndIcon={
                <DownArrowIcon className="text-grayText inline-block ml-1" />
              }
            />
          </div>
        </div> */}
      </div>
      <div className="bg-white p-5">
        <div className="bg-[#F7F8FA] p-7">
          <div className="flex justify-between mb-3 ">
            <h3 className="font-medium text-[26px]">Items</h3>

            <div className="flex gap-5 items-center pr-8">
              <div className="inline-flex gap-2 items-center text-grayText">
                Show
                <SelectMarketplace
                  StylesConfig={{
                    singleValue: (base: any) => ({
                      ...base,
                      color: "#000000",
                      fontSize: "16px",
                      lineHeight: "18px",
                    }),
                    indicatorSeparator: (base: any) => ({
                      ...base,
                      display: "none",
                    }),
                    dropdownIndicator: (base: any) => ({
                      ...base,
                      color: "#ddd",
                      paddingRight: "0px",
                    }),
                    control: (base: any) => ({
                      ...base,
                      background: "transparent",
                      border: "1px solid rgb(31 77 161 / 0.2) !important",
                      padding: "3px 7px",
                      boxSizing: "border-box",
                      borderRadius: "5px",
                      boxShadow: "none",
                    }),
                    valueContainer: (base: any) => ({
                      ...base,
                      paddingLeft: "0px",
                    }),
                    colors: {
                      text: "#fff",
                    },
                  }}
                  isDisabled={isLoading || syncAmazonLoading}
                  options={[
                    { label: "10", value: "10" },
                    { label: "20", value: "20" },
                    { label: "25", value: "25" },
                    { label: "50", value: "50" },
                    { label: "100", value: "100" },
                  ]}
                  onChange={(e: SetStateAction<IOption>) => {
                    setCurrentPage(1);
                    if (e) {
                      setItemPerPage(e);
                    }
                  }}
                  placeholder="10"
                />
                Entries
              </div>

              {/* <SelectMarketplace
                StylesConfig={{
                  singleValue: (base: any) => ({
                    ...base,
                    color: "#fff",
                    fontSize: "16px",
                    lineHeight: "18px",
                  }),
                  indicatorSeparator: (base: any) => ({
                    ...base,
                    display: "none",
                  }),
                  dropdownIndicator: (base: any) => ({
                    ...base,
                    color: "#ddd",
                    paddingRight: "0px",
                  }),
                  control: (base: any) => ({
                    ...base,
                    background: "transparent",
                    border: "1px solid rgb(31 77 161 / 0.2) !important",
                    padding: "3px 7px",
                    boxSizing: "border-box",
                    borderRadius: "5px",
                    boxShadow: "none",
                  }),
                  valueContainer: (base: any) => ({
                    ...base,
                    paddingLeft: "0px",
                  }),
                }}
                placeholder="Newest"
              /> */}
              {countCheckbox > 0 && (
                <Checkbox checkLabel="All" onChange={selectAllHandler} />
              )}
            </div>
          </div>
          <div className="max-h-[calc(100vh_-_500px)] overflow-y-auto scroll-design ">
            {items && items.length > 0 ? (
              items.map((item) => {
                return (
                  <ItemCard
                    item={item}
                    isCheck={isCheck}
                    setIsCheck={setIsCheck}
                    key={item.id}
                  />
                );
              })
            ) : (
              <div className="justify-center flex">
                <DataNotFound />
              </div>
            )}
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
      </div>
    </div>
  );
};

export default ImportProducts;
