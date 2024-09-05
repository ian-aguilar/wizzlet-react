import { DownArrowBlack } from "@/assets/Svg";
import Button from "@/components/form-fields/components/Button";
import { btnShowType } from "@/components/form-fields/types";
import { useEffect, useState } from "react";
import { useMarketplaceListingAPI } from "../services/marketplace.service";
import { IMarketplace } from "../types";
import { VITE_APP_API_URL } from "@/config";
import { PrivateRoutesPath } from "@/modules/Auth/types";
import { useEbayAuthAPI } from "../services/ebay.service";

const Marketplace = () => {
  //================== States =========================
  const [marketplace, setMarketplace] = useState<{
    connectedMarketplace: IMarketplace[];
    notConnectedMarketplace: IMarketplace[];
  }>({ connectedMarketplace: [], notConnectedMarketplace: [] });
  const [buttonLoading, setButtonLoading] = useState<number>();

  // ================= Custom hooks ====================
  const { getMarketplaceListingAPI } = useMarketplaceListingAPI();
  const { ebayAuthAPI, isLoading } = useEbayAuthAPI();

  useEffect(() => {
    marketplaceListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const marketplaceListing = async () => {
    const { data, error } = await getMarketplaceListingAPI({});
    if (!error && data) {
      setMarketplace(data?.data);
    }
  };

  const authenticateUser = async (item: IMarketplace) => {
    switch (item?.name) {
      case "ebay":
        setButtonLoading(item.id);
        const { data, error } = await ebayAuthAPI(PrivateRoutesPath.marketplace.view);
        if (!error && data) {
          window.location.replace(data?.data?.url);
        }
        break;
      default:
        break;
    }
  };
  return (
    <section className="MarketPlaceSection  h-[calc(100%_-_40px)] w-full bg-white overflow-y-auto scroll-design p-5 ">
      {marketplace?.connectedMarketplace.length > 0 ? (
        <>
          <h4 className="text-center pb-7 text-[26px] font-medium ">Connected Marketplaces</h4>
          <div className="grid grid-cols-12 gap-x-5 gap-y-5 ">
            {marketplace?.connectedMarketplace.map((item) => (
              <div
                key={item?.id}
                className={`col-span-6 sm:col-span-4 bg-grayLightBody/10 p-8 flex flex-col ${
                  item?.coming_soon ? "relative" : ""
                }`}
              >
                {item?.coming_soon ? (
                  <div className="absolute inset-0 bg-grayLightBody/50 backdrop-blur-sm z-10 flex justify-center items-center text-black text-2xl font-medium  ">
                    Coming Soon
                  </div>
                ) : null}
                <div className="flex flex-wrap justify-between items-start gap-4 ">
                  <div>
                    <img src={VITE_APP_API_URL + item.logo} className="max-w-[150px]  w-full h-auto" alt="" />
                  </div>
                  <span className="inline-flex items-center px-4 gap-2  bg-green-600/10 border border-green-500 text-sm  rounded-full py-1 text-green-500">
                    <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-green-500 ">&nbsp;</span>
                    CONNECTED
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="my-5">
            <hr />
          </div>
        </>
      ) : (
        <div className="py-24 px-20 bg-grayLightBody/10 sm:bg-MarketPlaceDB bg-right bg-no-repeat mb-14">
          <h3 className=" text-5xl md:text-[58px] font-bold text-grayText/50 pb-6 bg-cover ">
            No Marketplace Connected
          </h3>
          <Button
            showType={btnShowType.primary}
            btnClass=" flex gap-2 items-center !text-2xl !w-auto bg-transparent border !border-blackPrimary/20 !py-2 !px-4 !text-blackPrimary font-semibold "
            btnName="Connect Now"
            btnEndIcon={<DownArrowBlack />}
          />
        </div>
      )}

      <div>
        <h4 className="text-center pb-7 text-[26px] font-medium ">Connect Marketplaces</h4>
        <div className="grid grid-cols-12 gap-x-5 gap-y-5 ">
          {marketplace?.notConnectedMarketplace.map((item) => (
            <div
              key={item?.id}
              className={`col-span-6 sm:col-span-4 bg-grayLightBody/10 p-8 flex flex-col ${
                item?.coming_soon ? "relative" : ""
              }`}
            >
              {item?.coming_soon ? (
                <div className="absolute inset-0 bg-grayLightBody/50 backdrop-blur-sm z-10 flex justify-center items-center text-black text-2xl font-medium  ">
                  Coming Soon
                </div>
              ) : null}
              <div className="flex flex-wrap justify-between items-start gap-4 ">
                <div>
                  <img src={VITE_APP_API_URL + item.logo} className="max-w-[150px]  w-full h-auto" alt="" />
                </div>
                <span className="inline-flex items-center px-4 gap-2  bg-grayLightBody/10 text-sm  rounded-full py-1 text-grayText">
                  <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-grayLightBody ">&nbsp;</span>
                  NOT CONNECTED
                </span>
              </div>
              <div className="mt-auto pt-10 ">
                <Button
                  btnName="Connect "
                  btnClass=""
                  onClickHandler={() => authenticateUser(item)}
                  isLoading={item.id === buttonLoading ? isLoading : false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
