// ** Packages **
import { useEffect, useState } from "react";

// ** Common **
import { markeplaces } from "./constants";
import Button from "@/components/form-fields/components/Button";
import { SelectMarketplace } from "./components/SelectMarketplace";
import { IItems, IOption } from "./types";
import { MARKETPLACE } from "@/components/common/types";
import { ItemCard } from "./components/ItemCard";
import Checkbox from "@/components/form-fields/components/Checkbox";

// ** Services **
import {
  useGetImportedEbayProductsApi,
  useImportEbayProductsApi,
  useImportProductsFromEbayApi,
} from "./services/importProducts.service";
import { AutoSyncIcon } from "@/assets/Svg";

const ImportProducts = () => {
  const [selectedMarketplace, setSelectedMarketplace] = useState<IOption>();
  const [items, setItems] = useState<IItems[]>();
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<number[]>([]);
  const [sync, setSync] = useState<boolean>(false);

  const { importEbayProductsApi, isLoading } = useImportEbayProductsApi();
  const { getImportedEbayProductsApi } = useGetImportedEbayProductsApi();
  const { importProductsFromEbayApi, isLoading: importLoading } =
    useImportProductsFromEbayApi();

  const importProductsHandler = async () => {
    if (selectedMarketplace) {
      switch (selectedMarketplace.value) {
        case MARKETPLACE.EBAY: {
          await importEbayProductsApi();
          setSync(!sync);
          break;
        }
      }
    }
  };

  const getImportProductsHandler = async () => {
    if (selectedMarketplace) {
      switch (selectedMarketplace.value) {
        case MARKETPLACE.EBAY: {
          const { data } = await getImportedEbayProductsApi();
          setItems(data?.data);
          break;
        }
        case MARKETPLACE.AMAZON: {
          setItems([]);
          break;
        }
      }
    } else {
      const { data } = await getImportedEbayProductsApi();
      setItems(data?.data);
    }
  };

  useEffect(() => {
    getImportProductsHandler();
  }, [selectedMarketplace, sync]);

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
      await importProductsFromEbayApi(isCheck);
      await getImportProductsHandler();
      setIsCheck([]);
    }
  };

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
              placeholder: (base) => ({
                ...base,
                color: "#fff",
              }),
            }}
            isSearchable={true}
            value={selectedMarketplace}
            placeholder="Select Marketplace"
            options={markeplaces}
            onChange={(result: IOption) => {
              setSelectedMarketplace(result as IOption);
            }}
          />
          <Button
            btnName={"Sync All Products"}
            onClickHandler={importProductsHandler}
            isLoading={isLoading}
            btnClass="!w-auto border border-solid border-black/30 bg-transparent !text-grayText "
          />
          {isCheck.length > 0 && (
            <Button
              btnName={`Import ${isCheck.length} Products`}
              onClickHandler={importProductsFromEbayHandler}
              isLoading={importLoading}
              btnClass="!w-auto !ml-auto "
            />
          )}
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
                      color: "#ddd",
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
                  placeholder="10"
                />
                Entries
              </div>

              <SelectMarketplace
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
              />
              <Checkbox checkLabel="All" onChange={selectAllHandler} />
            </div>
          </div>
          <div className="max-h-[calc(100vh_-_500px)] overflow-y-auto scroll-design ">
            {items &&
              items.length > 0 &&
              items.map((item) => {
                return (
                  <ItemCard
                    item={item}
                    isCheck={isCheck}
                    setIsCheck={setIsCheck}
                    key={item.id}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportProducts;
