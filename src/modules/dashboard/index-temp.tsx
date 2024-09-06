import {
  AddIconBtn,
  AutoSyncIcon,
  BulkImportIcon,
  CategoryBtnIcon,
  CheckIconBtn,
  DeleteIcon,
  DownArrowIcon,
  DownloadCSVIcon,
  EditLabelIcon,
  SortIcon,
} from "@/assets/Svg";
import { Button } from "../cms/common/Button";
import Checkbox from "@/components/form-fields/components/Checkbox";
import Input from "@/components/form-fields/components/Input";
import AmazonImg from "/images/Amazon_logo.png";
import EbayImg from "/images/ebay_logo.png";
import ProductImg from "/images/labelMAnager.png";
const Dashboard = () => {
  return (
    <>
      {" "}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-blackPrimary font-bold text-3xl pb-2">
          Inventory Management
        </h2>
        <div className="flex gap-2">
          <Button
            btnName="Filters"
            btnClass=" !text-base bg-white  "
            BtnIconLeft={<CategoryBtnIcon />}
          />
          <Button
            btnName="Add New"
            btnClass=" !text-base bg-greenPrimary text-white "
            BtnIconLeft={<AddIconBtn />}
          />
        </div>
      </div>
      {/* Add New Inventory Item*/}
      {/* Add New Inventory Item */}
      {/* Inventory Management */}
      <section className="InventoryMgtStripe   w-full bg-white   p-5 mb-5 ">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <div className="leftItems">
            <span className="block text-grayText text-base font-normal uppercase pb-4 ">
              SELECT Your Marketplace
            </span>
            <div className="flex gap-2">
              <Button
                btnName="Amazon"
                btnClass="!rounded-full !bg-black !text-lg text-white !px-4 !py-1 !w-auto hover:!bg-greenPrimary "
                BtnIconLeft={
                  <CheckIconBtn className="text-white inline-block mr-2 w-4 h-4" />
                }
              />
              <Button
                btnName="Ebay"
                btnClass="!rounded-full !bg-black !text-lg  text-white !px-4 !py-1 !w-auto hover:!bg-greenPrimary "
                BtnIconLeft={
                  <CheckIconBtn className="text-white inline-block mr-2 w-4 h-4" />
                }
              />
              <Button
                btnName="Fizno"
                btnClass="!rounded-full border !text-lg  !text-grayText bg-white !px-4 !py-1 !w-auto hover:bg-greenPrimary  hover:!text-white "
              />
              <Button
                btnName="Walmart"
                btnClass="!rounded-full border !text-lg  !text-grayText bg-white !px-4 !py-1 !w-auto hover:bg-greenPrimary  hover:!text-white "
              />
            </div>
          </div>
          <div className="RightItems flex gap-4 items-center">
            <Button
              btnName="Sync Now"
              btnClass="  !bg-greenPrimary text-white  !text-base   "
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
      <section className=" w-full bg-white  p-5 mb-5 ">
        <div className="TopTabsBtns flex justify-between items-center gap-4 flex-wrap ">
          <div className="TopLEftTabs flex  ">
            <div className="activeTab px-7 py-2 flex items-center text-greenPrimary text-lg gap-2 border-b-2 border-greenPrimary cursor-pointer font-medium hover:bg-greenPrimary/10  transition-all duration-300 hover:transition-all hover:duration-300  ">
              Active{" "}
              <span className="text-base bg-greenPrimary/10 px-1 rounded-md">
                {" "}
                100{" "}
              </span>{" "}
            </div>
            <div className=" Tab px-7 py-2 flex items-center text-black text-lg gap-2 border-b-2 border-greyBorder cursor-pointer  font-medium hover:bg-greenPrimary/10 transition-all duration-300 hover:transition-all hover:duration-300 ">
              Active{" "}
              <span className="text-base bg-greyBorder/50 px-1 rounded-md">
                {" "}
                0{" "}
              </span>{" "}
            </div>
            <div className=" Tab px-7 py-2 flex items-center text-black text-lg gap-2 border-b-2 border-greyBorder cursor-pointer  font-medium hover:bg-greenPrimary/10 transition-all duration-300 hover:transition-all hover:duration-300 ">
              Active{" "}
              <span className="text-base bg-greyBorder/50 px-1 rounded-md">
                {" "}
                5{" "}
              </span>{" "}
            </div>
          </div>
          <div className="RightBtnsTop flex gap-2">
            {/* <Input
              name="Search by title or SKU"
              className="pl-6"
              InputLeftIcon={<SearchIcon />}
            /> */}
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
            <Button
              btnClass=" !font-medium hover:border-blackPrimary/20 text-grayText !text-base  !py-2 !px-3 "
              btnName="By Category "
              BtnIconLeft={<CategoryBtnIcon className="text-grayText" />}
              btnEndIcon={<DownArrowIcon />}
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
                <Button
                  btnClass="hover:!border-grayText/30 !text-base !font-medium !px-3 !py-3 bg-white "
                  btnName="10"
                  btnEndIcon={<SortIcon />}
                />
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
            <div className=" col-span-12 xl:col-span-6 InventorySelectBox bg-white p-5 flex items-center gap-3">
              <div>
                <Checkbox checkLabel=" " />
              </div>
              <div className="IBox flex gap-6 w-full ">
                <div className="prodImg">
                  <img
                    src={ProductImg}
                    className="max-w-[170px] max-h-[132px] "
                    alt=""
                  />
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
                  <h4 className="text-[19px] font-medium text-blackPrimary mr-10 line-clamp-1 ">
                    Nike Air Max 1 Essential Men's Shoes
                  </h4>
                  <div className="Badges flex flex-wrap gap-1 text-sm ">
                    <div className="rounded-[5px] bg-greenPrimary/20 text-greenPrimary font-normal p-1 ">
                      Cloth
                    </div>
                    <div className="rounded-[5px] bg-greenPrimary/20 text-greenPrimary font-normal p-1 ">
                      Electronics
                    </div>
                    <div className="rounded-[5px] bg-greenPrimary/20 text-greenPrimary font-normal p-1 ">
                      Shoes
                    </div>
                  </div>
                  <div className="DescSpecifications flex flex-wrap gap-6 py-5">
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        Price
                      </span>
                      <p className="text-blackPrimary font-medium ">$59</p>
                    </div>
                    <div className="border-r border-dashed border-grayText/30">
                      &nbsp;
                    </div>
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        Date
                      </span>
                      <p className="text-blackPrimary font-medium ">
                        15 May 2020
                      </p>
                    </div>
                    <div className="border-r border-dashed border-grayText/30">
                      &nbsp;
                    </div>
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        QTY
                      </span>
                      <p className="text-blackPrimary font-medium ">4</p>
                    </div>
                    <div className="border-r border-dashed border-grayText/30">
                      &nbsp;
                    </div>
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        SKU
                      </span>
                      <p className="text-blackPrimary font-medium ">H1255</p>
                    </div>
                  </div>
                  <div className="syncingOn flex flex-wrap gap-1 ">
                    <div className=" rounded-md  border border-grayText/20 p-1">
                      <img src={AmazonImg} className="w-14 h-auto" alt="" />
                    </div>
                    <div className="  rounded-md   border border-grayText/20 p-1">
                      <img src={EbayImg} className="w-14 h-auto" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-span-12 xl:col-span-6 InventorySelectBox bg-white p-5 flex items-center gap-3">
              <div>
                <Checkbox checkLabel=" " />
              </div>
              <div className="IBox flex gap-6 w-full ">
                <div className="prodImg">
                  <img
                    src={ProductImg}
                    className="max-w-[170px] max-h-[132px] object-cover "
                    alt=""
                  />
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
                  <h4 className="text-[19px] font-medium text-blackPrimary mr-10 line-clamp-1 ">
                    Nike Air Max 1 Essential Men's Shoes
                  </h4>
                  <div className="Badges flex flex-wrap gap-1 text-sm ">
                    <div className="rounded-[5px] bg-greenPrimary/20 text-greenPrimary font-normal p-1 ">
                      Cloth
                    </div>
                    <div className="rounded-[5px] bg-greenPrimary/20 text-greenPrimary font-normal p-1 ">
                      Electronics
                    </div>
                    <div className="rounded-[5px] bg-greenPrimary/20 text-greenPrimary font-normal p-1 ">
                      Shoes
                    </div>
                  </div>
                  <div className="DescSpecifications flex flex-wrap gap-6 py-5">
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        Price
                      </span>
                      <p className="text-blackPrimary font-medium ">$59</p>
                    </div>
                    <div className="border-r border-dashed border-grayText/30">
                      &nbsp;
                    </div>
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        Date
                      </span>
                      <p className="text-blackPrimary font-medium ">
                        15 May 2020
                      </p>
                    </div>
                    <div className="border-r border-dashed border-grayText/30">
                      &nbsp;
                    </div>
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        QTY
                      </span>
                      <p className="text-blackPrimary font-medium ">4</p>
                    </div>
                    <div className="border-r border-dashed border-grayText/30">
                      &nbsp;
                    </div>
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        SKU
                      </span>
                      <p className="text-blackPrimary font-medium ">H1255</p>
                    </div>
                  </div>
                  <div className="syncingOn flex flex-wrap gap-1 ">
                    <div className=" rounded-md  border border-grayText/20 p-1">
                      <img src={AmazonImg} className="w-14 h-auto" alt="" />
                    </div>
                    <div className="  rounded-md   border border-grayText/20 p-1">
                      <img src={EbayImg} className="w-14 h-auto" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-span-12 xl:col-span-6 InventorySelectBox bg-white p-5 flex items-center gap-3">
              <div>
                <Checkbox checkLabel=" " />
              </div>
              <div className="IBox flex gap-6 w-full ">
                <div className="prodImg">
                  <img
                    src={ProductImg}
                    className="max-w-[170px] max-h-[132px] object-cover "
                    alt=""
                  />
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
                  <h4 className="text-[19px] font-medium text-blackPrimary mr-10 line-clamp-1 ">
                    Nike Air Max 1 Essential Men's Shoes
                  </h4>
                  <div className="Badges flex flex-wrap gap-1 text-sm ">
                    <div className="rounded-[5px] bg-greenPrimary/20 text-greenPrimary font-normal p-1 ">
                      Cloth
                    </div>
                    <div className="rounded-[5px] bg-greenPrimary/20 text-greenPrimary font-normal p-1 ">
                      Electronics
                    </div>
                    <div className="rounded-[5px] bg-greenPrimary/20 text-greenPrimary font-normal p-1 ">
                      Shoes
                    </div>
                  </div>
                  <div className="DescSpecifications flex flex-wrap gap-6 py-5">
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        Price
                      </span>
                      <p className="text-blackPrimary font-medium ">$59</p>
                    </div>
                    <div className="border-r border-dashed border-grayText/30">
                      &nbsp;
                    </div>
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        Date
                      </span>
                      <p className="text-blackPrimary font-medium ">
                        15 May 2020
                      </p>
                    </div>
                    <div className="border-r border-dashed border-grayText/30">
                      &nbsp;
                    </div>
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        QTY
                      </span>
                      <p className="text-blackPrimary font-medium ">4</p>
                    </div>
                    <div className="border-r border-dashed border-grayText/30">
                      &nbsp;
                    </div>
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        SKU
                      </span>
                      <p className="text-blackPrimary font-medium ">H1255</p>
                    </div>
                  </div>
                  <div className="syncingOn flex flex-wrap gap-1 ">
                    <div className=" rounded-md  border border-grayText/20 p-1">
                      <img src={AmazonImg} className="w-14 h-auto" alt="" />
                    </div>
                    <div className="  rounded-md   border border-grayText/20 p-1">
                      <img src={EbayImg} className="w-14 h-auto" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-span-12 xl:col-span-6 InventorySelectBox bg-white p-5 flex items-center gap-3">
              <div>
                <Checkbox checkLabel=" " />
              </div>
              <div className="IBox flex gap-6 w-full ">
                <div className="prodImg">
                  <img
                    src={ProductImg}
                    className="max-w-[170px] max-h-[132px] object-cover "
                    alt=""
                  />
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
                  <h4 className="text-[19px] font-medium text-blackPrimary mr-10 line-clamp-1 ">
                    Nike Air Max 1 Essential Men's Shoes
                  </h4>
                  <div className="Badges flex flex-wrap gap-1 text-sm ">
                    <div className="rounded-[5px] bg-greenPrimary/20 text-greenPrimary font-normal p-1 ">
                      Cloth
                    </div>
                    <div className="rounded-[5px] bg-greenPrimary/20 text-greenPrimary font-normal p-1 ">
                      Electronics
                    </div>
                    <div className="rounded-[5px] bg-greenPrimary/20 text-greenPrimary font-normal p-1 ">
                      Shoes
                    </div>
                  </div>
                  <div className="DescSpecifications flex flex-wrap gap-6 py-5">
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        Price
                      </span>
                      <p className="text-blackPrimary font-medium ">$59</p>
                    </div>
                    <div className="border-r border-dashed border-grayText/30">
                      &nbsp;
                    </div>
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        Date
                      </span>
                      <p className="text-blackPrimary font-medium ">
                        15 May 2020
                      </p>
                    </div>
                    <div className="border-r border-dashed border-grayText/30">
                      &nbsp;
                    </div>
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        QTY
                      </span>
                      <p className="text-blackPrimary font-medium ">4</p>
                    </div>
                    <div className="border-r border-dashed border-grayText/30">
                      &nbsp;
                    </div>
                    <div>
                      <span className="uppercase font-normal text-sm text-grayText">
                        SKU
                      </span>
                      <p className="text-blackPrimary font-medium ">H1255</p>
                    </div>
                  </div>
                  <div className="syncingOn flex flex-wrap gap-1 ">
                    <div className=" rounded-md  border border-grayText/20 p-1">
                      <img src={AmazonImg} className="w-14 h-auto" alt="" />
                    </div>
                    <div className="  rounded-md   border border-grayText/20 p-1">
                      <img src={EbayImg} className="w-14 h-auto" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Inventory Management */}
    </>
  );
};

export default Dashboard;
