import { AutoSyncIcon, CheckIconBtn, DownArrowBlack } from "@/assets/Svg";
import Button from "@/components/form-fields/components/Button";
import BrandLogo from "/images/Amazon_logo.png";
import BrandLogo2 from "/images/ebay_logo.png";
import BrandLogo3 from "/images/Walmart_logo.png";
import Input from "@/components/form-fields/components/Input";
const Dashboard = () => {
  return (
    <>
      {/* <section className="MarketPlaceSection  h-[calc(100%_-_40px)] w-full bg-white overflow-y-auto scroll-design p-5 ">
        <div className="py-24 px-20 bg-grayLightBody/10 sm:bg-MarketPlaceDB bg-right bg-no-repeat mb-14">
          <h3 className=" text-5xl md:text-[58px] font-bold text-grayText/50 pb-6 bg-cover ">
            No Marketplace Connected
          </h3>
          <Button
            btnClass=" flex gap-2 items-center !text-2xl !w-auto bg-transparent border !border-blackPrimary/20 !py-2 !px-4 !text-blackPrimary font-semibold "
            btnName="Connect Now"
            BtnIconRight={<DownArrowBlack />}
          />
        </div>

        <div>
          <h4 className="text-center pb-7 text-[26px] font-medium ">
            Connect Marketplaces
          </h4>
          <div className="grid grid-cols-12 gap-x-5 gap-y-5 ">
            <div className=" col-span-6 sm:col-span-4 bg-grayLightBody/10  p-8 flex flex-col ">
              <div className="flex flex-wrap justify-between items-start gap-4 ">
                <div>
                  <img
                    src={BrandLogo2}
                    className="max-w-[150px]  w-full h-auto"
                    alt=""
                  />
                </div>
                <span className="inline-flex items-center px-4 gap-2  bg-grayLightBody/10 text-sm  rounded-full py-1 text-grayText">
                  <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-grayLightBody ">
                    &nbsp;
                  </span>
                  NOT CONNECTED
                </span>
              </div>
              <div className="mt-auto pt-10 ">
                <Button btnName="Connect " btnClass="" />
              </div>
            </div>
            <div className=" col-span-6 sm:col-span-4 bg-grayLightBody/10  p-8  flex flex-col ">
              <div className="flex flex-wrap justify-between items-start gap-4 ">
                <div>
                  <img
                    src={BrandLogo3}
                    className="max-w-[150px] w-full h-auto"
                    alt=""
                  />
                </div>
                <span className="inline-flex items-center px-4 gap-2  bg-grayLightBody/10 text-sm  rounded-full py-1 text-grayText">
                  <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-grayLightBody ">
                    &nbsp;
                  </span>
                  NOT CONNECTED
                </span>
              </div>
              <div className="mt-auto pt-10 ">
                <Button btnName="Connect " btnClass="" />
              </div>
            </div>
            <div className=" col-span-6 sm:col-span-4 bg-grayLightBody/10  p-8  flex flex-col ">
              <div className="flex flex-wrap justify-between items-start gap-4 ">
                <div>
                  <img
                    src={BrandLogo}
                    className="max-w-[150px]  w-full h-auto"
                    alt=""
                  />
                </div>
                <span className="inline-flex items-center px-4 gap-2  bg-grayLightBody/10 text-sm  rounded-full py-1 text-grayText">
                  <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-grayLightBody ">
                    &nbsp;
                  </span>
                  NOT CONNECTED
                </span>
              </div>
              <div className="mt-auto pt-10 ">
                <Button btnName="Connect " btnClass="" />
              </div>
            </div>
            <div className=" col-span-6 sm:col-span-4 bg-grayLightBody/10  p-8 flex flex-col ">
              <div className="flex flex-wrap justify-between items-start gap-4 ">
                <div>
                  <img
                    src={BrandLogo2}
                    className="max-w-[150px]  w-full h-auto"
                    alt=""
                  />
                </div>
                <span className="inline-flex items-center px-4 gap-2  bg-grayLightBody/10 text-sm  rounded-full py-1 text-grayText">
                  <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-grayLightBody ">
                    &nbsp;
                  </span>
                  NOT CONNECTED
                </span>
              </div>
              <div className="mt-auto pt-10 ">
                <Button btnName="Connect " btnClass="" />
              </div>
            </div>
            <div className=" col-span-6 sm:col-span-4 bg-grayLightBody/10  p-8  flex flex-col ">
              <div className="flex flex-wrap justify-between items-start gap-4 ">
                <div>
                  <img
                    src={BrandLogo3}
                    className="max-w-[150px] w-full h-auto"
                    alt=""
                  />
                </div>
                <span className="inline-flex items-center px-4 gap-2  bg-grayLightBody/10 text-sm  rounded-full py-1 text-grayText">
                  <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-grayLightBody ">
                    &nbsp;
                  </span>
                  NOT CONNECTED
                </span>
              </div>
              <div className="mt-auto pt-10 ">
                <Button btnName="Connect " btnClass="" />
              </div>
            </div>
            <div className=" col-span-6 sm:col-span-4 bg-grayLightBody/10  p-8  flex flex-col relative">
              <div className="absolute inset-0 bg-grayLightBody/50 backdrop-blur-sm z-10 flex justify-center items-center text-black text-2xl font-medium  ">
                Coming Soon
              </div>
              <div className="flex flex-wrap justify-between items-start gap-4 ">
                <div>
                  <img
                    src={BrandLogo}
                    className="max-w-[150px]  w-full h-auto"
                    alt=""
                  />
                </div>
                <span className="inline-flex items-center px-4 gap-2  bg-grayLightBody/10 text-sm  rounded-full py-1 text-grayText">
                  <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-grayLightBody ">
                    &nbsp;
                  </span>
                  NOT CONNECTED
                </span>
              </div>
              <div className="mt-auto pt-10 ">
                <Button btnName="Connect " btnClass="" />
              </div>
            </div>
          </div>
        </div>
      </section> */}

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
                btnClass="rounded-full !bg-black text-white !px-4 !py-1 !w-auto hover:!bg-greenPrimary "
                BtnIconLeft={
                  <CheckIconBtn className="text-white inline-block mr-2 w-4 h-4" />
                }
              />
              <Button
                btnName="Ebay"
                btnClass="rounded-full !bg-black text-white !px-4 !py-1 !w-auto hover:!bg-greenPrimary "
                BtnIconLeft={
                  <CheckIconBtn className="text-white inline-block mr-2 w-4 h-4" />
                }
              />
              <Button
                btnName="Fizno"
                btnClass="rounded-full border !text-grayText bg-white !px-4 !py-1 !w-auto hover:bg-greenPrimary  hover:!text-white "
              />
              <Button
                btnName="Walmart"
                btnClass="rounded-full border !text-grayText bg-white !px-4 !py-1 !w-auto hover:bg-greenPrimary  hover:!text-white "
              />
            </div>
          </div>
          <div className="RightItems flex gap-4 items-center">
            <Button
              btnName="Sync Now"
              btnClass=""
              BtnIconLeft={
                <AutoSyncIcon className="text-white w-5 h-5 min-w-5 inline-block mr-2" />
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
      <section className=" w-full bg-white  p-5 mb-5">
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
          <div className="RightBtnsTop flex gap-2 ">sdefg </div>
        </div>
      </section>
      {/* Inventory Management */}
      <section className="ConnectYourMarketplace w-full bg-white  p-5 mb-5">
        <p className="font-medium text-xl text-blackPrimary pb-7">
          Connect Your Marketplace
        </p>
        <div className="grid grid-cols-12 gap-6 ">
          <div className=" col-span-6 xl:col-span-3 flex gap-4 flex-wrap justify-between items-center p-5 bg-grayLightBody/10 rounded-md  ">
            <div>
              <img
                src={BrandLogo}
                className="max-w-[114px] w-full h-auto"
                alt=""
              />
            </div>
            <div className="bg-greenPrimary/10 border border-greenPrimary/50 text-greenPrimary/80 py-1 px-2 rounded-full flex gap-2 items-center  uppercase text-sm ">
              <span className="w-2 min-w-2  h-2 bg-greenPrimary/80 rounded-full"></span>
              Connected
            </div>
          </div>
          <div className=" col-span-6 xl:col-span-3 flex gap-4 flex-wrap justify-between items-center p-5 bg-grayLightBody/10 rounded-md  ">
            <div>
              <img
                src={BrandLogo2}
                className="max-w-[114px] w-full h-auto"
                alt=""
              />
            </div>
            <div className="bg-greenPrimary/10 border border-greenPrimary/50 text-greenPrimary/80 py-1 px-2 rounded-full flex gap-2 items-center  uppercase text-sm ">
              <span className="w-2 min-w-2  h-2 bg-greenPrimary/80 rounded-full"></span>
              Connected
            </div>
          </div>
          <div className=" col-span-6 xl:col-span-3 flex gap-4 flex-wrap justify-between items-center p-5 bg-grayLightBody/10 rounded-md  ">
            <div>
              <img
                src={BrandLogo3}
                className="max-w-[114px] w-full h-auto"
                alt=""
              />
            </div>
            <div className="bg-grayText/10 border border-graybg-grayText/50 text-graybg-grayText/80 py-1 px-2 rounded-full flex gap-2 items-center uppercase text-sm">
              <span className="w-2 min-w-2  h-2 bg-grayText  rounded-full"></span>
              Not Connected
            </div>
          </div>
          <div className=" col-span-6 xl:col-span-3 flex gap-4 flex-wrap justify-between items-center p-5 bg-grayLightBody/10 rounded-md relative ">
            <div className="absolute inset-0 rounded-md bg-grayLightBody/50 backdrop-blur-sm flex justify-center items-center text-[22px] font-medium z-10 ">
              Coming Soon
            </div>
            <div>
              <img
                src={BrandLogo}
                className="max-w-[114px] w-full h-auto"
                alt=""
              />
            </div>
            <div className="bg-greenPrimary/10 border border-greenPrimary/50 text-greenPrimary/80 py-1 px-2 rounded-full flex gap-2 items-center  uppercase text-sm ">
              <span className="w-2 min-w-2  h-2 bg-greenPrimary/80 rounded-full"></span>
              Connected
            </div>
          </div>
        </div>
      </section>

      <section className=" w-full bg-white  p-5 mb-5">
        <h3 className="font-medim text-[26px] pb-7 ">Analytics</h3>
        <div className="grid grid-cols-10 gap-4 mb-5 ">
          <div className="flex justify-center items-center w-full h-full col-span-8 border ">
            8
          </div>
          <div className="flex justify-center items-center w-full h-full col-span-2 border ">
            2
          </div>
        </div>
        <div className="grid grid-cols-11 gap-4 mb-5">
          <div className="flex justify-center items-center w-full h-full col-span-5 border ">
            5
          </div>
          <div className="flex justify-center items-center w-full h-full col-span-3 border ">
            3
          </div>
          <div className="flex justify-center items-center w-full h-full col-span-3 border ">
            3
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
