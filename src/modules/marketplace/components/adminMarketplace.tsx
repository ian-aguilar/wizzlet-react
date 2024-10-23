import { useEffect, useState } from "react";
import { IMarketplace } from "../types";
import { VITE_APP_API_URL } from "@/config";
import {
  useMarketplaceListingAPI,
  useMarketplaceStatusAPI,
} from "../services/marketplace.service";
import DropDown from "@/modules/inventory-management/components/DropDown";

const AdminMarketplace = () => {
  const [marketplace, setMarketplace] = useState<{
    connectedMarketplace: IMarketplace[];
    notConnectedMarketplace: IMarketplace[];
  }>({ connectedMarketplace: [], notConnectedMarketplace: [] });
  const { getMarketplaceListingAPI } = useMarketplaceListingAPI();
  const { setMarketplaceStatusAPI } = useMarketplaceStatusAPI();
  const marketplaceListing = async () => {
    const { data, error } = await getMarketplaceListingAPI({});
    if (!error && data) {
      setMarketplace(data?.data);
    }
  };

  const handleMarketplace = async (marketId: number, status: boolean) => {
    await setMarketplaceStatusAPI({
      marketId,
      status,
    });
    marketplaceListing();
  };

  useEffect(() => {
    marketplaceListing();
  }, []);
  return (
    <div>
      <div className="border- pb-2 mb-4 flex justify-between">
        <div className="flex gap-5">
          <h2 className="text-3xl  text-blackPrimary  font-bold">
            Marketplaces
          </h2>
        </div>
      </div>
      <section className=" w-full bg-white  p-5 mb-5 max-h-[calc(100vh_-_365px)] lg:max-h-[calc(100vh_-_350px)] overflow-y-auto scroll-design ">
        <div className="grid grid-cols-12 gap-x-5 gap-y-5 ">
          {marketplace?.notConnectedMarketplace.map((item) => (
            <div
              key={item?.id}
              className={`col-span-6 sm:col-span-4 bg-grayLightBody/10 p-8 flex flex-col`}
            >
              <div className="flex flex-wrap justify-between items-start gap-4 ">
                <div>
                  <img
                    src={VITE_APP_API_URL + item.logo}
                    className="max-w-[150px]  w-full h-auto"
                    alt=""
                  />
                </div>
                <div>
                  {item?.coming_soon ? (
                    <span className="inline-flex items-center px-4 gap-2  bg-gray-600/10 border text-sm  rounded-full py-1 text-gray-400">
                      <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-gray-500 ">
                        &nbsp;
                      </span>
                      Inactive
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-4 gap-2  bg-greenPrimary border text-sm text-white rounded-full py-1">
                      <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-white ">
                        &nbsp;
                      </span>
                      Active
                    </span>
                  )}
                </div>
              </div>
              <div className="max-w-36 mt-3 ml-auto">
                <DropDown
                  value={
                    item?.coming_soon
                      ? { label: "Inactive", value: "Inactive" }
                      : { label: "Active", value: "Active" }
                  }
                  options={[
                    { id: 1, name: "Active" },
                    { id: 2, name: "Inactive" },
                  ]}
                  dropdownClass="w-28"
                  onChange={(e) => {
                    if (e?.value === "Active") {
                      handleMarketplace(item.id, false);
                    } else if (e?.value === "Inactive") {
                      handleMarketplace(item.id, true);
                    }
                  }}
                  isSearchable={false}
                  placeholder=""
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminMarketplace;
