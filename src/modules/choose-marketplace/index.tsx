// ** Packages **
import React, { useState, useEffect } from "react";
import { IMarketplace } from "../marketplace/types";
import MArketPlaceImg from "/images/Walmart_logo.png";
// ** Components **
import Checkbox from "@/components/form-fields/components/Checkbox";
import Button from "@/components/form-fields/components/Button";

// ** Services **
import { useMarketplaceListingAPI } from "../marketplace/services/marketplace.service";
import { useSetProductMarketplaceAPI } from "./services";
import { ProductBasicFormProps } from "../all-product-form-wrapper/types";
import { useParams } from "react-router-dom";

// ** Types **

const ChooseMarketplace: React.FC<ProductBasicFormProps> = ({ onComplete }) => {
  const [selectedMarketplaces, setSelectedMarketplaces] = useState<number[]>(
    []
  ); // List of selected marketplaces
  const [marketplace, setMarketplace] = useState<{
    connectedMarketplace: IMarketplace[];
  }>({
    connectedMarketplace: [],
  });
  const { productId } = useParams();

  // ** Custom hooks **
  const { getMarketplaceListingAPI } = useMarketplaceListingAPI();
  const { setProductMarketplace } = useSetProductMarketplaceAPI();

  // Fetch the marketplace listing
  const marketplaceListing = async () => {
    const { data, error } = await getMarketplaceListingAPI({});
    if (!error && data) {
      setMarketplace(data?.data);
    }
  };

  useEffect(() => {
    marketplaceListing();
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
    const { data, error } = await setProductMarketplace({
      marketplace: selectedMarketplaces,
      productId: productId,
    });
    if (!data && error) {
      console.log("Error: ", error);
    }
    onComplete(productId);
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
              className="marketplace-item bg-grayLightBody/10 p-4 border border-greyBorder rounded-md flex justify-between  ">
              <img
                src={MArketPlaceImg}
                className="max-w-[77px] h-[23px] object-contain "
                alt=""
              />

              <Checkbox
                mainClass="  flex-row-reverse gap-4"
                checkLabel={item.name}
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
      <div className="flex gap-2 my-6">
        <Button
          btnName="Back"
          btnClass="!w-auto !px-6 border !border-black/20 bg-white !text-grayText !rounded-md "
          onClickHandler={handleSubmit}
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
          <div className="col-span-4 p-4 bg-grayLightBody/10   border border-greyBorder rounded-md text-center">
            <img
              src={MArketPlaceImg}
              className="max-w-[77px] h-[23px] object-contain mx-auto"
              alt=""
            />
          </div>
          <div className="col-span-4 p-4 bg-grayLightBody/10   border border-greyBorder rounded-md text-center">
            <img
              src={MArketPlaceImg}
              className="max-w-[77px] h-[23px] object-contain mx-auto"
              alt=""
            />
          </div>
          <div className="col-span-4 p-4 bg-grayLightBody/10   border border-greyBorder rounded-md text-center">
            <img
              src={MArketPlaceImg}
              className="max-w-[77px] h-[23px] object-contain mx-auto"
              alt=""
            />
          </div>
          <div className="col-span-4 p-4 bg-grayLightBody/10   border border-greyBorder rounded-md text-center">
            <img
              src={MArketPlaceImg}
              className="max-w-[77px] h-[23px] object-contain mx-auto"
              alt=""
            />
          </div>
          <div className="col-span-4 p-4 bg-grayLightBody/10   border border-greyBorder rounded-md text-center">
            <img
              src={MArketPlaceImg}
              className="max-w-[77px] h-[23px] object-contain mx-auto"
              alt=""
            />
          </div>
          <div className="col-span-4 p-4 bg-grayLightBody/10   border border-greyBorder rounded-md text-center">
            <img
              src={MArketPlaceImg}
              className="max-w-[77px] h-[23px] object-contain mx-auto"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseMarketplace;
