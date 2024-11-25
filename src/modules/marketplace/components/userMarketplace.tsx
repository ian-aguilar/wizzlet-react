// ** Packages **
import { useEffect, useState } from "react";

// ** Icons **
import { DownArrowBlack } from "@/assets/Svg";

// ** Components **
import Button from "@/components/form-fields/components/Button";

// ** Types **
import { btnShowType } from "@/components/form-fields/types";
import { PrivateRoutesPath } from "@/modules/Auth/types";
import { IMarketplace } from "../types";

// ** Config **
import { VITE_APP_API_URL } from "@/config";

// ** Services **
import { useEbayAuthAPI } from "../services/ebay.service";
import {
  useMarketplaceDisconnectAPI,
  useMarketplaceListingAPI,
} from "../services/marketplace.service";
import { useAmazonAuthAPI } from "../services/amazon.service";
import { ErrorModal } from "@/components/common/ErrorModal";
import { Loader } from "@/components/common/Loader";
import ShopifyAuthModal from "@/modules/shopify/auth/shopifyAuthModal";
import { useGetShopifyProfilesApi } from "@/modules/shopify/auth/services/productBasicForm.service";
import { ShopifyProfileAttributeType } from "@/modules/shopify/auth/types";
const UserMarketplace = () => {
  //================== States =========================
  const [marketplace, setMarketplace] = useState<{
    connectedMarketplace: IMarketplace[];
    notConnectedMarketplace: IMarketplace[];
  }>({ connectedMarketplace: [], notConnectedMarketplace: [] });
  const [selectedShopifyProfile, setSelectedShopifyProfile] = useState<ShopifyProfileAttributeType | null>(null);
  const [buttonLoading, setButtonLoading] = useState<number>();
  const [isDeleteModel, setIsDeleteModel] = useState<boolean>(false);
  const [isShopifyModal, setIsShopifyModal] = useState<boolean>(false);
  const [shopifyProfiles, setShopifyProfiles] = useState<ShopifyProfileAttributeType[]>([]);
  const [disconnectMarketplace, setDisconnectMarketplace] = useState<
    number | null
  >(null);

  // ================= Custom hooks ====================
  const { getMarketplaceListingAPI, isLoading: marketLoading } =
    useMarketplaceListingAPI();

  const { getShopifyProfileApi, isLoading: shopifyProfilesLoading } =
    useGetShopifyProfilesApi();

  const { ebayAuthAPI, isLoading } = useEbayAuthAPI();

  const { amazonAuthAPI, isLoading: amazonLoading } = useAmazonAuthAPI();
  const { disconnectMarketplaceAPI, isLoading: isDisconnectBtnLoading } =
    useMarketplaceDisconnectAPI();

  useEffect(() => {
    marketplaceListing();
  }, [isDeleteModel, disconnectMarketplace]);

  useEffect(() => {
    getShopifyProfiles();
  }, []);

  useEffect(() => {
    if (shopifyProfiles.length > 0) {
      const shopifyStoresAndMarkets = shopifyProfiles.map((item) => item?.shop) as string[];
      setMarketplace((prev) => ({
        ...prev,
        notConnectedMarketplace: prev?.notConnectedMarketplace.map((item) => {
          if (item.name === "shopify") {
            return {
              ...item,
              isConnected: shopifyProfiles.length > 0,
              profilesDisplayNames: shopifyStoresAndMarkets,
            };
          }
          return item;
        }),
      }));
    }
  }, [shopifyProfiles]);

  const marketplaceListing = async () => {
    const { data, error } = await getMarketplaceListingAPI({});
    if (!error && data) {
      setMarketplace(data?.data);
    }
  };
  const getShopifyProfiles = async () => {
    const { data, error } = await getShopifyProfileApi({});
    if (!error && data) {
      setShopifyProfiles(data?.data);
    }
  };

  const authenticateUser = async (item: IMarketplace) => {
    switch (item?.name) {
      case "ebay":
        {
          setButtonLoading(item.id);
          const { data, error } = await ebayAuthAPI(
            PrivateRoutesPath.marketplace.view
          );
          if (!error && data) {
            window.location.replace(data?.data?.url);
          }
        }
        break;
      case "amazon":
        {
          setButtonLoading(item.id);
          const { data, error } = await amazonAuthAPI(
            PrivateRoutesPath.marketplace.view
          );
          if (!error && data) {
            window.location.replace(data?.data?.url);
          }
        }
        break;
      case "shopify":
        {
          setIsShopifyModal(true);
        }
        break;
      default:
        break;
    }
  };

  const handleDisconnect = async () => {
    setIsDeleteModel(false);
    if (disconnectMarketplace) {
      setButtonLoading(disconnectMarketplace);
      const { error } = await disconnectMarketplaceAPI({
        marketId: disconnectMarketplace,
      });
      if (!error) {
        setIsDeleteModel(false);
        setDisconnectMarketplace(null);
      }
    }
  };
  return (
    <>
      {isShopifyModal && <ShopifyAuthModal setSelectedShopifyProfile={setSelectedShopifyProfile} isLoading={shopifyProfilesLoading} shopifyProfiles={shopifyProfiles} handleClose={() => setIsShopifyModal(false)} />}
      {marketLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <section className="MarketPlaceSection  h-[calc(100%_-_40px)] w-full bg-white overflow-y-auto scroll-design p-5 ">
          {marketplace?.connectedMarketplace.length > 0 ? (
            <>
              <h4 className="text-center pb-7 text-[26px] font-medium ">
                Connected Marketplaces
              </h4>
              <div className="grid grid-cols-12 gap-x-5 gap-y-5 ">
                {marketplace?.connectedMarketplace.map((item) => (
                  <div
                    key={item?.id}
                    className={`col-span-6 sm:col-span-4 bg-grayLightBody/10 p-8 flex flex-col ${item?.coming_soon ? "relative" : ""
                      }`}
                  >
                    <div className="flex flex-wrap justify-between items-start gap-4 ">
                      <div>
                        <img
                          src={VITE_APP_API_URL + item.logo}
                          className="max-w-[150px]  w-full h-auto"
                          alt=""
                        />
                      </div>
                      <span className="inline-flex items-center px-4 gap-2  bg-green-600/10 border border-green-500 text-sm  rounded-full py-1 text-green-500">
                        <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-green-500 ">
                          &nbsp;
                        </span>
                        CONNECTED
                      </span>
                    </div>
                    <div className="mt-auto pt-10 ">
                      <Button
                        btnName="Disconnect "
                        btnClass=""
                        showType={btnShowType.red}
                        onClickHandler={() => {
                          setIsDeleteModel(true);
                          setDisconnectMarketplace(item.id);
                        }}
                        isLoading={
                          item.id === buttonLoading
                            ? isDisconnectBtnLoading
                            : false
                        }
                      />
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
            <h4 className="text-center pb-7 text-[26px] font-medium ">
              Connect Marketplaces
            </h4>
            <div className="grid grid-cols-12 gap-x-5 gap-y-5 ">
              {marketplace?.notConnectedMarketplace.map((item) => (
                <div
                  key={item?.id}
                  className={`col-span-6 sm:col-span-4 bg-grayLightBody/10 p-8 flex flex-col ${item?.coming_soon ? "relative" : ""
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
                      <h1> {item.name}</h1>
                    </div>
                    {item?.isConnected ? (
                      <>
                        <h5 className="">
                          {item?.profilesDisplayNames?.join(', ')}
                        </h5>
                        {selectedShopifyProfile?.shop && <h5 className="">
                          Selected: {selectedShopifyProfile?.shop}
                        </h5>}

                        <span className="inline-flex items-center px-4 gap-2  bg-green-600/10 border border-green-500 text-sm  rounded-full py-1 text-green-500">
                          <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-green-500 ">
                            &nbsp;
                          </span>
                          CONNECTED
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="inline-flex items-center px-4 gap-2  bg-grayLightBody/10 text-sm  rounded-full py-1 text-grayText">
                          <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-grayLightBody ">
                            &nbsp;
                          </span>
                          NOT CONNECTED
                        </span>
                      </>
                    )}

                  </div>
                  <div className="mt-auto pt-10 ">
                    <Button
                      btnName="Connect "
                      btnClass=""
                      onClickHandler={() => authenticateUser(item)}
                      isLoading={
                        item.id === buttonLoading
                          ? isLoading || amazonLoading
                          : false
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <div>
              {isDeleteModel && (
                <ErrorModal
                  onClose={() => {
                    setIsDeleteModel(false);
                    setDisconnectMarketplace(null);
                  }}
                  isLoading={isDisconnectBtnLoading}
                  onSave={handleDisconnect}
                  heading="Are you sure you want to proceed?"
                  subText="Disconnecting from this marketplace will result in the loss of all associated data."
                />
              )}
            </div>
          </div>
        </section>
      )}{" "}
    </>
  );
};

export default UserMarketplace;
