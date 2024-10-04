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
  DeleteIcon,
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
import DatePickerBox from "@/components/common/DatePickerBox";
import { FilterBox } from "./components/FilterBox";

// ** Helper **
import { status } from "./helper/constant";

// ** Services **
import { useMarketplaceListingAPI } from "../marketplace/services/marketplace.service";
import {
  useGetCategoriesAPI,
  useProductListingAPI,
  useProductsDeleteAPI,
} from "./services";
import { useFetchLabelDataAPI } from "../settings/services/label.service";

// ** Types **
import { IMarketplace } from "../marketplace/types";
import { btnShowType } from "@/components/form-fields/types";
import { E_PRODUCT_STATUS, Option, TopFilter, productProps } from "./types";
import { ErrorModal } from "@/components/common/ErrorModal";

const InventoryManagement = () => {
  // ** States **
  const [totalItem, setTotalItem] = useState<number>();
  const [selectedMarketplace, setSelectedMarketplace] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [category, setCategory] = useState<Option[] | undefined>(undefined);
  const [productTag, setProductTag] = useState<Option[] | null>(null);
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState<number[] | null>([]);
  const [isDeleteModel, setIsDeleteModel] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<Option | undefined>(
    undefined
  );
  const [filterDate, setFilterDate] = useState<Date>();
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
  const [productType, setProductType] = useState<Option | null>(null);
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
  const { getLabelListingAPI, isLoading: productTagLoading } =
    useFetchLabelDataAPI();
  const { getProductsDetailsAPI, isLoading: productListLoading } =
    useProductListingAPI();
  const { deleteProductsAPI, isLoading: deleteProductLoading } =
    useProductsDeleteAPI();

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
    limit: number = Number(itemPerPage.value),
    categoryName: Option[] | undefined = category,
    filterCreatedDate: Date | undefined = filterDate,
    productTypeData: Option | null = productType,
    productLabel: Option[] | null = productTag
  ) => {
    const categoryLabels = categoryName?.map((item) => item.label) || null;
    const productTags = productLabel?.map((item) => item.label) || null;
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
      filterDate: filterCreatedDate,
      productType: productTypeData?.value,
      productTags: {
        labels: productTags,
      },
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
        Number(itemPerPage.value),
        category,
        filterDate,
        productType,
        productTag
      );
    },
    [
      searchTerm,
      selectedMarketplace,
      productStatus,
      itemPerPage.value,
      category,
    ]
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

  const getProductTags = async (search: string, page: number) => {
    const { data, error } = await getLabelListingAPI({
      search: search,
      page: page,
      limit: 15,
    });
    if (!error && data) {
      const tags = data?.data?.data.map(
        (item: { id: number; name: string }) => {
          return { value: item.id, label: item.name };
        }
      );
      return { option: tags, count: data.data?.count };
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
    setCurrentPage(1);
    setProductStatus(item);
  };

  // ** search box with debouncing **
  const request = debounce(
    (
      value,
      selectedMarketplace,
      status,
      page,
      itemPerPage,
      category,
      filterDate,
      productType,
      productTag
    ) => {
      setCurrentPage(1);
      getProductsDetails(
        value,
        selectedMarketplace,
        status,
        page,
        itemPerPage,
        category,
        filterDate,
        productType,
        productTag
      );
    },
    500
  );

  const debounceRequest = useCallback(
    (
      value: string,
      selectedMarketplace: number[],
      status: string,
      category: Option[] | undefined,
      filterDate: Date | undefined,
      productType: Option | null,
      productTag: Option[] | null
    ) =>
      request(
        value,
        selectedMarketplace,
        status,
        1,
        itemPerPage.value,
        category,
        filterDate,
        productType,
        productTag
      ),
    [itemPerPage]
  );

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const selectedBox: number[] | null = products?.products
      .map((item) => (newSelectAll ? item?.id : null))
      .filter((item): item is number => item !== null);
    setCheckboxes(selectedBox);
  };

  const handleProductCheckboxChange = (id: number) => {
    const isChecked = checkboxes ? checkboxes!.includes(id) : null;
    const updatedCheckboxes = isChecked
      ? checkboxes!.filter((itemId) => itemId !== id)
      : checkboxes
      ? [...checkboxes, id]
      : [id];
    setCheckboxes(updatedCheckboxes);
    setSelectAll(updatedCheckboxes.length === products?.products.length);
  };

  const closeDeleteModel = () => setCheckboxes(null);

  const handleRemove = async () => {
    closeDeleteModel();
    setIsDeleteModel(false);
    return;
    if (checkboxes?.length) {
      const { error } = await deleteProductsAPI(checkboxes as number[]);
      if (error) console.log(error);
      else {
        closeDeleteModel();
        setIsDeleteModel(false);
        setCurrentPage(1);
      }
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value.trim());
    debounceRequest(
      event.currentTarget.value.trim(),
      selectedMarketplace,
      productStatus,
      category,
      filterDate,
      productType,
      productTag
    );
  };

  useEffect(() => {
    getProductsDetails(
      searchTerm,
      selectedMarketplace,
      productStatus,
      Number(currentPage),
      Number(itemPerPage.value),
      category,
      filterDate,
      productType,
      productTag
    );
  }, [
    currentPage,
    productStatus,
    itemPerPage,
    category,
    selectedMarketplace,
    filterDate,
    productType,
    productTag,
  ]);

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
              btnClass={`!text-base ${
                filterDate || productTag?.length || productType
                  ? `bg-greenPrimary text-white`
                  : `bg-white`
              }`}
              BtnIconLeft={<CategoryBtnIcon />}
            />
            {/* Top corner filter  */}
            <div className="relative ">
              <FilterBox
                label="FILTER BY"
                isOpen={isFilterBoxOpen}
                clearButton={
                  (filterDate || productTag?.length || productType) && (
                    <Button
                      showType={btnShowType.greenRound}
                      btnName="CLEAR FILTER"
                      btnClass="!bg-greenPrimary text-white !text-base h-8 w-34 text-sm"
                      onClickHandler={() => {
                        setFilterDate(undefined);
                        setProductType(null);
                        setProductTag(null);
                      }}
                    />
                  )
                }
              >
                <DropDown
                  value={currentFilter}
                  onChange={(e) => {
                    if (e) {
                      setFilterDate(undefined);
                      setProductType(null);
                      setProductTag(null);
                      setCurrentFilter(e);
                    }
                  }}
                  isSearchable={false}
                  dropdownClass="!font-medium hover:border-blackPrimary/20 bg-slate-300 text-black min-w-80 !text-base"
                  options={[
                    { id: 1, name: TopFilter.dateCreated },
                    { id: 2, name: TopFilter.productTag },
                    { id: 3, name: TopFilter.productType },
                  ]}
                />
                {currentFilter?.value === "Date Created" ? (
                  <div>
                    <DatePickerBox
                      // label="Filter by Date"
                      icon={true}
                      className="!font-medium hover:border-blackPrimary/20 border text-grayText  !text-base min-w-80  !py-2 !px-3 "
                      dateFormat="dd/MM/yyyy"
                      maxDate={new Date()}
                      name="dateCreated"
                      onChange={(e) => {
                        setCurrentPage(1);
                        setFilterDate(new Date(e));
                      }}
                      value={filterDate}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                ) : null}
                {currentFilter?.value === "Product Type" ? (
                  <div>
                    <DropDown
                      placeholder="Select type"
                      value={productType || null}
                      dropdownClass="hover:!border-grayText/30 !text-base !font-medium  !py-3 bg-white "
                      options={[
                        { id: 1, name: "Normal" },
                        { id: 2, name: "Variant" },
                      ]}
                      onChange={(e) => {
                        setCurrentPage(1);
                        if (e) {
                          setProductType(e);
                        }
                      }}
                    />
                  </div>
                ) : null}
                {currentFilter?.value === "Product Tags" ? (
                  <div>
                    <AsyncSelectField
                      name="selectTag"
                      serveSideSearch={true}
                      getOnChange={(e) => {
                        setCurrentPage(1);
                        if (!e.length) {
                          setProductTag(null);
                          return;
                        }
                        if (e) {
                          setProductTag(e);
                          getProductsDetails(
                            searchTerm,
                            selectedMarketplace,
                            productStatus,
                            1,
                            Number(itemPerPage.value),
                            category,
                            filterDate,
                            productType,
                            productTag
                          );
                        }
                      }}
                      isLoading={productTagLoading}
                      isMulti={true}
                      isSearchable={true}
                      notClearable={true}
                      getOptions={getProductTags}
                      value={productTag ? productTag : null}
                      className=" !font-medium hover:border-blackPrimary/20 text-grayText min-w-80 !text-base  !py-2 "
                      placeholder="Select Tag"
                    />
                  </div>
                ) : null}
              </FilterBox>
            </div>
          </div>
          <Button
            btnName="Add New"
            showType={btnShowType.greenRound}
            onClickHandler={() =>
              navigate("/inventory-management/product-form/1/0")
            }
            btnClass=" !text-base bg-greenPrimary text-white "
            BtnIconLeft={<AddIconBtn />}
          />
        </div>
      </div>
      <section className="InventoryMgtStripe   w-full bg-white   py-3 px-5 mb-2 ">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <div className="leftItems">
            <span className="block text-grayText text-base font-normal uppercase pb-2 ">
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
                        ) : null
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
      <section className=" w-full bg-white px-4 py-3 mb-5 ">
        <div className="TopTabsBtns flex justify-between items-center gap-2 flex-wrap ">
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
          <div className="RightBtnsTop flex gap-2 items-center">
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
              btnClass=" bg-grayText text-white !font-medium  !text-sm my-2.5  "
              btnName="Bulk Import CSV"
              BtnIconLeft={<BulkImportIcon className="text-white" />}
            />
            <Button
              showType={btnShowType.primary}
              btnClass=" !font-medium hover:border-blackPrimary/20 text-grayText  !text-sm  my-2.5   "
              btnName="Download CSV "
              BtnIconLeft={<DownloadCSVIcon className="text-grayText" />}
            />
            <AsyncSelectField
              name="Categories select box"
              serveSideSearch={true}
              getOnChange={(e) => {
                setCurrentPage(1);
                if (!e.length) {
                  setCategory(undefined);
                  return;
                }
                if (e) {
                  setCategory(e);
                  getProductsDetails(
                    searchTerm,
                    selectedMarketplace,
                    productStatus,
                    1,
                    Number(itemPerPage.value),
                    category,
                    filterDate,
                    productType,
                    productTag
                  );
                }
              }}
              isLoading={categoryLoading}
              isMulti={true}
              isSearchable={true}
              notClearable={true}
              getOptions={getCategories}
              value={category !== undefined || null ? category : undefined}
              className=" !font-medium hover:border-blackPrimary/20 text-grayText min-w-52 !text-base  "
              placeholder="By Category"
            />
          </div>
        </div>

        <div className="ActiveItemsBox px-5 py-2 bg-grayLightBody/5 mt-2">
          <div className="flex gap-5 justify-between items-center flex-wrap mb-3">
            <div className="flex gap-5 items-center ">
              <h3 className="text-[26px] font-medium">
                {productStatus === E_PRODUCT_STATUS.active
                  ? `Active Items`
                  : `Draft Items`}
              </h3>
              {products?.products.length > 0 && (
                <Checkbox
                  checkLabel="Select All"
                  isChecked={checkboxes?.length === products?.products.length}
                  onChange={handleSelectAllChange}
                />
              )}
              {checkboxes && checkboxes?.length > 0 && (
                <div>
                  <Button
                    showType={btnShowType.red}
                    btnClass="text-white !font-medium !text-base flex gap-1"
                    btnName={`Delete Items ${
                      checkboxes?.length ? `(${checkboxes?.length})` : null
                    }`}
                    BtnIconLeft={<DeleteIcon className="text-white " />}
                    onClickHandler={() => setIsDeleteModel(true)}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-5 items-center ">
              <div className="inline-flex gap-2 items-center text-grayText">
                Show
                <DropDown
                  dropdownName="Limit"
                  value={itemPerPage}
                  dropdownClass="hover:!border-grayText/30 !text-base !font-medium !px-3     "
                  options={[
                    { id: 1, name: "10" },
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
                        Number(e.value),
                        category,
                        filterDate,
                        productType,
                        productTag
                      );
                    }
                  }}
                />
                Entries
              </div>
              <Button
                btnClass="hover:border-grayText/20 !text-base !font-medium !px-3 !py-2 "
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
              checkboxes={checkboxes}
              checkboxOnChange={handleProductCheckboxChange}
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
        <div>
          {isDeleteModel && (
            <ErrorModal
              onClose={() => {
                setCheckboxes(null);
                setIsDeleteModel(false);
              }}
              isLoading={deleteProductLoading}
              onSave={handleRemove}
              heading="Are you sure?"
              subText="This will delete selected products."
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default InventoryManagement;
