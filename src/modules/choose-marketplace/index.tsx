// ** Packages **
import React, { useState, useEffect } from "react";
import { IMarketplace } from "../marketplace/types";
// ** Components **
import Checkbox from "@/components/form-fields/components/Checkbox";
import Button from "@/components/form-fields/components/Button";

// ** Services **
import { useMarketplaceListingAPI } from "../marketplace/services/marketplace.service";
import {
  useGetProductMarketplaceAPI,
  useSetProductMarketplaceAPI,
} from "./services";
import { ProductBasicFormProps } from "../all-product-form-wrapper/types";
import { useNavigate, useParams } from "react-router-dom";
import { VITE_APP_API_URL } from "@/config";

// ** Types **

const ChooseMarketplace: React.FC<ProductBasicFormProps> = ({ onComplete }) => {
  // ** States **

  const [selectedMarketplaces, setSelectedMarketplaces] = useState<number[]>(
    []
  ); // List of selected marketplaces
  const [errorShow, setErrorShow] = useState<boolean>(false);
  const [marketplace, setMarketplace] = useState<{
    connectedMarketplace: IMarketplace[];
    notConnectedMarketplace: IMarketplace[];
  }>({
    connectedMarketplace: [],
    notConnectedMarketplace: [],
  });
  const { productId } = useParams();
  const navigate = useNavigate();

  // ** Custom hooks **
  const { getMarketplaceListingAPI } = useMarketplaceListingAPI();
  const { setProductMarketplace } = useSetProductMarketplaceAPI();
  const { getProductMarketplace } = useGetProductMarketplaceAPI();

  // Fetch the marketplace listing
  const marketplaceListing = async () => {
    const { data, error } = await getMarketplaceListingAPI({});
    if (!error && data) {
      setMarketplace(data?.data);
    }
  };

  const getSelectedMarketplace = async () => {
    const { data, error } = await getProductMarketplace(productId as string);
    if (!error && data) {
      setSelectedMarketplaces(data?.data);
    }
  };

  useEffect(() => {
    setErrorShow(false);
    marketplaceListing();
    getSelectedMarketplace();
  }, []);

  // Handle marketplace selection toggle
  const handleMarketplaceSelection = (id: number) => {
    if (!selectedMarketplaces.includes(id)) {
      setSelectedMarketplaces([...selectedMarketplaces, id]); // Add if not selected
    } else {
      setSelectedMarketplaces(
        selectedMarketplaces.filter((market) => market !== id)
      ); // Remove if already selected
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (selectedMarketplaces.length === 0) {
      setErrorShow(true);
      return;
    }
    const { data, error } = await setProductMarketplace({
      marketplace: selectedMarketplaces,
      productId: productId,
    });
    if (!data && error) {
      console.log("Error: ", error);
    } else {
      setErrorShow(false);
      onComplete(productId);
    }
  };

  return (
    <div className="marketplace-form p-7 bg-white w-full rounded-md h-[calc(100vh_-_460px)]  lg:h-[calc(100vh_-_180px)]  overflow-y-auto scroll-design ">
      <h3 className="title text-[26px] font-semibold pb-4 mb-4 border-b border-black/20  ">
        Choose Marketplace
      </h3>
      <div className="marketplace-list flex flex-col gap-4 lg:max-w-[568px]">
        {marketplace.connectedMarketplace.length > 0 ? (
          marketplace.connectedMarketplace.map((item) => (
            <div
              key={item.id}
              className="marketplace-item bg-grayLightBody/10 p-4 border border-greyBorder rounded-md flex justify-between  "
            >
              <img
                src={VITE_APP_API_URL + item.logo}
                className="max-w-[77px] h-[23px] object-contain "
                alt=""
              />

              <Checkbox
                mainClass="  flex-row-reverse gap-4"
                // checkLabel={item.name}
                isChecked={selectedMarketplaces.includes(item.id)}
                onChange={() => handleMarketplaceSelection(item.id)}
                value={item.id}
              />
            </div>
          ))
        ) : (
          <p>No marketplaces available</p>
        )}
      </div>

      {errorShow && selectedMarketplaces.length == 0 ? (
        <span className="errorText text-red-600 font-medium text-sm">
          {"Marketplace is not selected."}
        </span>
      ) : null}

      <div className="flex gap-2 my-6">
        <Button
          btnName="Back"
          btnClass="!w-auto !px-6 border !border-black/20 bg-white !text-grayText !rounded-md "
          onClickHandler={() => {
            navigate(`/inventory-management/product-form/1/${productId}`);
          }}
        />
        <Button
          btnName="Save & Next"
          btnClass="!w-auto"
          onClickHandler={handleSubmit}
        />
      </div>

      <div className="">
        <h4 className="text-xl font-semibold pb-5">Coming Soon</h4>
        <div className="grid grid-cols-12 gap-2">
          {marketplace.notConnectedMarketplace.length > 0 ? (
            marketplace.notConnectedMarketplace.map((item) => {
              return (
                <div
                  key={item.id}
                  className="col-span-4 p-4 bg-grayLightBody/10   border border-greyBorder rounded-md text-center"
                >
                  <img
                    src={VITE_APP_API_URL + item.logo}
                    className="max-w-[77px] h-[23px] object-contain mx-auto"
                    alt=""
                  />
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChooseMarketplace;
