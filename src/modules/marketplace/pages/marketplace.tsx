import { DownArrowBlack } from "@/assets/Svg";
import Button from "@/components/form-fields/components/Button";
import { btnShowType } from "@/components/form-fields/types";
// import BrandLogo from "/images/Amazon_logo.png";
// import BrandLogo2 from "/images/ebay_logo.png";
// import BrandLogo3 from "/images/Walmart_logo.png";
import { useEffect, useState } from "react";
import { useMarketplaceListingAPI } from "../services/marketplace.service";
import { IMarketplace } from "../types";
import { VITE_APP_API_URL } from "@/config";

const Marketplace = () => {
  //================== States =========================
  const [marketplace, setMarketplace] = useState<IMarketplace[]>([]);

  // ================= Custom hooks ====================
  const { getMarketplaceListingAPI } = useMarketplaceListingAPI();

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

  return (
    <section className="MarketPlaceSection  h-[calc(100%_-_40px)] w-full bg-white overflow-y-auto scroll-design p-5 ">
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

      <div>
        <h4 className="text-center pb-7 text-[26px] font-medium ">
          Connect Marketplaces
        </h4>
        <div className="grid grid-cols-12 gap-x-5 gap-y-5 ">
          {marketplace.map((item) => (
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
                  <img
                    src={VITE_APP_API_URL + item.logo}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
