// ** Packages **
import { SetStateAction, useCallback, useEffect, useState } from "react";

// ** Common **
import Button from "@/components/form-fields/components/Button";
import { SelectMarketplace } from "./components/SelectMarketplace";
import {
  IItems,
  IOption,
  ISyncDetails,
  ImportTab,
  SyncStatus,
  TotalImportDataType,
} from "./types";
import { MARKETPLACE } from "@/components/common/types";
import { ItemCard } from "./components/ItemCard";
import Checkbox from "@/components/form-fields/components/Checkbox";
import { Pagination } from "../inventory-management/components/Pagination";

// ** Services **
import {
  useFetchSyncDetailsAPI,
  useGetImportedProductsApi,
  useImportAmazonProductsApi,
  useImportEbayProductsApi,
  useImportProductsFromAmazonApi,
  useImportProductsFromEbayApi,
} from "./services/importProducts.service";
import { useMarketplaceListingAPI } from "../marketplace/services/marketplace.service";

// ** Icon **
import { AutoSyncIcon, SearchIcon, ShopifyIcon } from "@/assets/Svg";
import { DataNotFound } from "@/components/svgIcons";

// ** Types **
import { IMarketplace } from "../marketplace/types";
import { pageLimitStyle, selectedMarketplaceStyle } from "./constants";
import moment from "moment";
import InputSearch from "./components/InputSearch";
import { Loader } from "@/components/common/Loader";
import ShopifyAuthModal from "../shopify/auth/shopifyAuthModal";
import { ShopifyProfileAttributeType } from "../shopify/auth/types";
import { useGetShopifyProfilesApi } from "../shopify/auth/services/productBasicForm.service";
import { useGetShopifyNonImportedProductsApi } from "../shopify/products/services/productBasicForm.service";
import { ShopifyProduct } from "../shopify/products/types";

const ImportProducts = () => {
  const [items, setItems] = useState<IItems[]>();
  const [selectedShopifyProfile, setSelectedShopifyProfile] = useState<ShopifyProfileAttributeType | null>(null);
  const [shopifyEndCursor, setShopifyEndCursor] = useState<string | null>("");
  const [shopifyHasNextPage, setShopifyHasNextPage] = useState<boolean>(true);
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [isShopifyModal, setIsShopifyModal] = useState<boolean>(false);
  const [totalItem, setTotalItem] = useState<number>();
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [countCheckbox, setCountCheckbox] = useState<number>(0);
  const [isCheck, setIsCheck] = useState<number[] | null>([]);
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [synced, setSynced] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [amazonSyncStatus, setAmazonSyncStatus] = useState<SyncStatus>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalImportData, setTotalImportData] =
    useState<TotalImportDataType | null>(null);
  const [ebaySyncStatus, setEbaySyncStatus] = useState<SyncStatus>();
  const [importSelectedTab, setImportSelectedTab] = useState<boolean>(false);
  const [shopifyProfiles, setShopifyProfiles] = useState<ShopifyProfileAttributeType[]>([]);
  const [itemPerPage, setItemPerPage] = useState<IOption>({
    label: "10",
    value: "10",
  });
  const [selectedMarketplace, setSelectedMarketplace] = useState<IOption>();
  const [marketplace, setMarketplace] = useState<{
    connectedMarketplace: IMarketplace[];
    notConnectedMarketplace: IMarketplace[];
  }>({ connectedMarketplace: [], notConnectedMarketplace: [] });

  const { getShopifyProfileApi, isLoading: shopifyProfilesLoading } =
    useGetShopifyProfilesApi();
  const { getShopifyNonImportedProducts, isLoading: shopifyNonImportedProductsLoader } =
    useGetShopifyNonImportedProductsApi();

  const getShopifyNonImportedProductAndParse = async () => {
    const { data, error } = await getShopifyNonImportedProducts({
    }, selectedShopifyProfile?.shop || "", shopifyEndCursor ? `endCursor=${shopifyEndCursor}&&limit=${itemPerPage?.value ? itemPerPage?.value : "10"}` : "");
    if (!error && data) {
      console.log(data?.data);
      setShopifyEndCursor(data?.data?.endCursor);
      setShopifyHasNextPage(data?.data?.hasNextPage);
      setShopifyProducts(data?.data?.products);
    }
  }

  useEffect(() => {
    if (selectedShopifyProfile) {
      getShopifyNonImportedProductAndParse();
    }
  }, [selectedShopifyProfile, itemPerPage])

  const getShopifyProfiles = async () => {
    const { data, error } = await getShopifyProfileApi({});
    if (!error && data) {
      setShopifyProfiles(data?.data);
    }
  };
  const [syncDetails, setSyncDetails] = useState<ISyncDetails>();
  const [counter, setCounter] = useState(0);
  const { getImportedProductsApi, isLoading: isLoadProduct } =
    useGetImportedProductsApi();
  const { getMarketplaceListingAPI, isLoading: marketLoading } =
    useMarketplaceListingAPI();
  const { fetchSyncDetailsApi } = useFetchSyncDetailsAPI();
  const { importEbayProductsApi, isLoading } = useImportEbayProductsApi();
  const { importProductsFromAmazonApi, isLoading: storeAmazonLoading } =
    useImportProductsFromAmazonApi();
  const { importAmazonProductsApi, isLoading: syncAmazonLoading } =
    useImportAmazonProductsApi();
  const { importProductsFromEbayApi, isLoading: importLoading } =
    useImportProductsFromEbayApi();

  const importProductsHandler = async () => {
    if (selectedMarketplace) {
      switch (selectedMarketplace.value) {
        case MARKETPLACE.EBAY: {
          if (
            ebaySyncStatus === SyncStatus.INPROGRESS ||
            ebaySyncStatus === SyncStatus.PENDING
          ) {
            return;
          }
          await importEbayProductsApi();
          setSyncing((sync) => !sync);
          setSynced((prev) => !prev);
          break;
        }
        case MARKETPLACE.AMAZON: {
          // return;
          if (
            amazonSyncStatus === SyncStatus.INPROGRESS ||
            amazonSyncStatus === SyncStatus.PENDING
          ) {
            return;
          }
          await importAmazonProductsApi();
          setSyncing((sync) => !sync);
          setSynced((prev) => !prev);
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
            imported: importSelectedTab,
            search: searchQuery,
          });
          setItems(data?.data?.products || []);
          setTotalItem(data?.data?.totalRecord);
          setTotalImportData(data?.data?.totalImportData);
          break;
        }
        case MARKETPLACE.AMAZON: {
          // return;
          const { data } = await getImportedProductsApi({
            currentPage: currentPage,
            limit: itemPerPage.value,
            marketplace: MARKETPLACE.AMAZON,
            imported: importSelectedTab,
            search: searchQuery,
          });
          setItems(data?.data?.products || []);
          setTotalItem(data?.data?.totalRecord);
          setTotalImportData(data?.data?.totalImportData);
          break;
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
      setIsCheck([]);
    }
  };
  useEffect(() => {
    const shopifyItems = parseShopifyProductsToItems(shopifyProducts);
    setItems([...(shopifyItems || [])]);
  }, [shopifyProducts]);

  const parseShopifyProductsToItems = (products: ShopifyProduct[]): IItems[] => {
    return products?.map((product) => {
      return {
        id: Number(product.id),
        is_imported: false,
        listed_at: new Date(product.publishedAt),
        marketplace_id: 0,
        title: product.title as string,
        type: product.productType as string,
        price: 0,
        picture_url: product.images?.[0]?.src as string,
        product_portal_id: product.id as string,
      };
    }) as IItems[];
  }
  useEffect(() => {
    marketplaceListing();
    getSyncData(selectedMarketplace?.value as string);
  }, []);

  useEffect(() => {
    getShopifyProfiles();
  }, []);

  useEffect(() => {
    getSyncData(selectedMarketplace?.value as string);
  }, [selectedMarketplace]);

  const marketplaces = marketplace?.notConnectedMarketplace?.map((item) => {
    return {
      label: item?.name.toUpperCase(),
      value: item?.name.toLowerCase(),
    };
  });

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query.trim());
  }, []);

  useEffect(() => {
    getImportProductsHandler();
  }, [
    selectedMarketplace,
    synced,
    itemPerPage,
    currentPage,
    importSelectedTab,
    searchQuery,
  ]);

  const selectAllHandler = () => {
    const newSelectAll = !isAllChecked;
    setIsAllChecked(newSelectAll);
    const selectedBox = items
      ?.map((item) => (newSelectAll && !item.is_imported ? item?.id : null))
      .filter((item): item is number => item !== null);
    if (selectedBox) {
      setIsCheck(selectedBox);
    } else {
      setIsCheck(null);
    }
  };

  const handleProductCheckboxChange = (id: number) => {
    const isChecked = isCheck ? isCheck!.includes(id) : null;
    const updatedCheckboxes = isChecked
      ? isCheck!.filter((itemId) => itemId !== id)
      : isCheck
        ? [...isCheck, id]
        : [id];
    setIsCheck(updatedCheckboxes);
    setIsAllChecked(updatedCheckboxes.length === countCheckbox);
  };

  const importProductsFromEbayHandler = async () => {
    if (isCheck && isCheck.length > 0) {
      if (selectedMarketplace?.value === MARKETPLACE.EBAY) {
        await importProductsFromEbayApi(isCheck);
      }
      if (selectedMarketplace?.value === MARKETPLACE.AMAZON) {
        // return;
        await importProductsFromAmazonApi(isCheck);
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

  const getSyncData = async (currentMarketplace: string) => {
    if (currentMarketplace) {
      const { data } = await fetchSyncDetailsApi(currentMarketplace);
      if (data) {
        const market = marketplace.connectedMarketplace
          .filter((item) => item.id === data?.data?.marketplace_id)
          .map((item) => item.name);
        if (market[0] === MARKETPLACE.AMAZON) {
          setAmazonSyncStatus(data?.data?.status);
        } else if (market[0] === MARKETPLACE.EBAY) {
          setEbaySyncStatus(data?.data?.status);
        }
        if (
          data?.data?.status === SyncStatus.COMPLETED ||
          data?.data?.status === SyncStatus.FAILED
        ) {
          setSyncing(false);
          await getImportProductsHandler();
        } else if (
          data?.data?.status === SyncStatus.INPROGRESS ||
          data?.data?.status === SyncStatus.PENDING
        ) {
          setSyncing(true);
        } else {
          setSyncing(false);
        }
        setSyncDetails(data?.data);
      } else {
        setSyncing(false);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (syncing) {
      getSyncData(selectedMarketplace?.value as string);
    }
  }, [counter, synced]);

  if (isLoadProduct || marketLoading || shopifyNonImportedProductsLoader) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else {
    return (
      <div>
        {isShopifyModal && <ShopifyAuthModal setSelectedShopifyProfile={(e) => {
          setSelectedShopifyProfile(e);
          setIsShopifyModal(false);
        }} isLoading={shopifyProfilesLoading} shopifyProfiles={shopifyProfiles} handleClose={() => setIsShopifyModal(false)} />}
        <div className="flex justify-between gap-4 mb-2 items-center">
          <h2 className="text-blackPrimary font-bold text-3xl pb-2">Import</h2>
          <div className="flex gap-2 items-center ">
            <span className="p-3 bg-greenPrimary/5 inline-block rounded-full">
              <AutoSyncIcon className="text-greenPrimary w-9 h-9 min-w-9" />
            </span>
            <div className="whitespace-nowrap text-sm">
              <div className="text-black font-medium">Last Sync</div>
              <p className="text-grayText">
                {syncDetails?.status === SyncStatus.PENDING
                  ? "In Pending"
                  : syncDetails?.status === SyncStatus.INPROGRESS
                    ? "In Progress"
                    : syncDetails?.end_time
                      ? moment(syncDetails?.end_time).format("D MMM YYYY H:mm A")
                      : `Not sync yet`}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white py-3 px-7 mb-4">
          <div className="flex justify-between">
            <p className="uppercase text-base font-normal text-grayText mb-2">
              Select the source to import from
            </p>
            <div className="text-gray-500 text-right">
              Filtering:{" "}
              <span className="text-black font-bold">
                {" "}
                {importSelectedTab
                  ? ImportTab.IMPORTED
                  : ImportTab.NOT_IMPORTED}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-4 items-center ">
              <SelectMarketplace
                StylesConfig={selectedMarketplaceStyle}
                isDisabled={isLoading || syncAmazonLoading}
                isSearchable={false}
                value={selectedMarketplace}
                placeholder="Select Marketplace"
                options={marketplaces}
                onChange={(result: IOption) => {
                  setCurrentPage(1);
                  setSelectedMarketplace(result as IOption);
                  setIsCheck([]);
                  if (result.value === MARKETPLACE.SHOPIFY) {
                    setIsShopifyModal(true);
                  }
                }}
              />
              {selectedShopifyProfile?.shop && <Button
                BtnIconLeft={
                  <ShopifyIcon className="inline-flex mr-2 w-5 h-5 text-greenPrimary  " />
                }
                btnName={selectedShopifyProfile?.shop || "Connect Shopify"}
                onClickHandler={importProductsHandler}
                btnClass="!w-auto border border-solid   !border-greenPrimary !bg-white !text-greenPrimary !font-semibold  "
              />}
              <Button
                BtnIconLeft={
                  <AutoSyncIcon className="inline-flex mr-2 w-5 h-5 text-greenPrimary  " />
                }
                btnName={"Sync All Products"}
                onClickHandler={importProductsHandler}
                isLoading={
                  isLoading ||
                  syncAmazonLoading ||
                  (selectedMarketplace?.value === MARKETPLACE.AMAZON &&
                    (amazonSyncStatus === SyncStatus.INPROGRESS ||
                      amazonSyncStatus === SyncStatus.PENDING)) ||
                  (selectedMarketplace?.value === MARKETPLACE.EBAY &&
                    (ebaySyncStatus === SyncStatus.INPROGRESS ||
                      ebaySyncStatus === SyncStatus.PENDING))
                }
                btnClass="!w-auto border border-solid   !border-greenPrimary !bg-white !text-greenPrimary !font-semibold  "
              />
            </div>
            <div>
              <div className="flex items-center space-x-4">
                <div className="flex bg-gray-100 rounded-full">
                  <button
                    onClick={() => {
                      setImportSelectedTab(false);
                      setCurrentPage(1);
                    }}
                    className={`${!importSelectedTab
                      ? "bg-gray-600 text-white"
                      : "text-gray-400"
                      } px-4 py-2 rounded-full transition-colors`}
                  >
                    {`${ImportTab.NOT_IMPORTED}(${totalImportData ? totalImportData.totalNotImported : 0
                      })`}
                  </button>
                  <button
                    onClick={() => {
                      setImportSelectedTab(true);
                      setCurrentPage(1);
                    }}
                    className={`${importSelectedTab
                      ? "bg-gray-600 text-white"
                      : "text-gray-400"
                      } px-4 py-2 rounded-full transition-colors`}
                  >
                    {`${ImportTab.IMPORTED}(${totalImportData ? totalImportData.totalImported : 0
                      })`}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2">
            <hr />
          </div>
          <div className="flex justify-between items-start ">
            <div>
              <div className="flex flex-col gap-1 ">
                {/* <label> Search </label> */}
                <InputSearch
                  InputLeftIcon={<SearchIcon />}
                  className="pl-12"
                  placeholder="Search by title"
                  name="search"
                  onChange={handleSearchChange}
                  value={searchQuery}
                />
              </div>
              <div className="flex flex-col gap-2 ">
                {/* <label> Status </label> */}
                {/* <Button
              btnName={"Connected"}
              isLoading={isLoading}
              btnClass="!w-auto !bg-white !text-grayText border border-grayLightBody "
              btnEndIcon={
                <DownArrowIcon className="text-grayText inline-block ml-1" />
              }
            /> */}
              </div>
            </div>
            <div className="mt-8">
              {isCheck && isCheck.length > 0 && (
                <div className="flex gap-2">
                  <Button
                    btnName={"Unselect All"}
                    onClickHandler={() => {
                      setIsCheck([]);
                    }}
                    btnClass="!w-auto border border-solid border-black/30 bg-transparent !text-grayText "
                  />
                  <Button
                    btnName={`Import ${isCheck?.length} Products`}
                    onClickHandler={importProductsFromEbayHandler}
                    isLoading={importLoading || storeAmazonLoading}
                    btnClass="!w-auto !ml-auto "
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white p-3">
          <div className="bg-[#F7F8FA] py-4 px-7">
            <div className="flex justify-between mb-1 ">
              <h3 className="font-medium text-[26px]">Items</h3>
              {shopifyHasNextPage
                ? "There are more products available."
                : "You've reached the end. No more products to show."
              }


              <div className="flex gap-5 items-center pr-8">
                {items && items?.length > 0 && (
                  <div className="inline-flex gap-2 items-center text-grayText">
                    Show
                    <SelectMarketplace
                      StylesConfig={pageLimitStyle}
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
                      value={itemPerPage}
                      placeholder="10"
                    />
                    Entries
                  </div>
                )}

                {/* <SelectMarketplace
                StylesConfig={newestBoxStyle}
                placeholder="Newest"
              /> */}
                {countCheckbox > 0 && (
                  <Checkbox
                    checkLabel="All"
                    onChange={selectAllHandler}
                    isChecked={isCheck?.length === countCheckbox}
                  />
                )}
              </div>
            </div>
            <div className="max-h-[calc(100vh_-_520px)] overflow-y-auto scroll-design ">
              {items && items.length > 0 ? (
                items?.map((item) => {
                  return (
                    <ItemCard
                      item={item}
                      marketplace={selectedMarketplace}
                      isCheck={isCheck ? isCheck : []}
                      checkboxOnChange={handleProductCheckboxChange}
                      key={item.id}
                    />
                  );
                })
              ) : (
                <div className="justify-center flex !max-h-[calc(100vh_-_480px)] !min-h-[calc(100vh_-_480px)]">
                  <DataNotFound className=" !h-[30vh] " />
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
  }
};

export default ImportProducts;
