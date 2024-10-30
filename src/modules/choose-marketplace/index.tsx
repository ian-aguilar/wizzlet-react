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
import { capitalizeFirstLetter } from "./helper";
import { Loader } from "@/components/common/Loader";

// ** Types **

const ChooseMarketplace: React.FC<ProductBasicFormProps> = ({
  onComplete,
  getMarketplace,
  setCompletedStep,
}) => {
  const [selectedMarketplaces, setSelectedMarketplaces] = useState<number[]>(
    []
  );
  const [previouslySelectedMarketplaces, setPreviouslySelectedMarketplaces] =
    useState<number[]>([]); // Track previously selected marketplaces (from the DB)
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

  const { getMarketplaceListingAPI } = useMarketplaceListingAPI();
  const { setProductMarketplace, isLoading: isLoadingSubmit } =
    useSetProductMarketplaceAPI();
  const { getProductMarketplace, isLoading } = useGetProductMarketplaceAPI();

  // Fetch marketplaces from the API
  const marketplaceListing = async () => {
    const { data, error } = await getMarketplaceListingAPI({});
    if (!error && data) {
      setMarketplace(data?.data);
    }
  };

  // Fetch previously selected marketplaces from the database
  const getSelectedMarketplace = async () => {
    const { data, error } = await getProductMarketplace(productId as string);
    if (!error && data) {
      const idArray: number[] = data?.data?.map(
        (item: { id: number; name: string }) => item?.id
      );
      if (idArray.length) {
        setCompletedStep((prev: number[]) =>
          prev.includes(2) ? prev : [...prev, 2]
        );
      }
      const selectedIds = data?.data?.map(
        (item: { id: number; name: string }) => item?.id
      );
      setSelectedMarketplaces(selectedIds); // Set selected marketplaces
      setPreviouslySelectedMarketplaces(selectedIds); // Store as "previously selected"
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    setErrorShow(false);
    marketplaceListing(); // Load marketplace options
    getSelectedMarketplace(); // Load selected marketplaces
  }, []);

  // Handle marketplace selection toggle
  const handleMarketplaceSelection = (id: number) => {
    if (previouslySelectedMarketplaces.includes(id)) return; // Prevent deselection of previously selected

    if (!selectedMarketplaces.includes(id)) {
      setSelectedMarketplaces([...selectedMarketplaces, id]); // Add new marketplace
    } else {
      setSelectedMarketplaces(
        selectedMarketplaces.filter((market) => market !== id) // Remove marketplace
      );
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (selectedMarketplaces.length === 0) {
      setErrorShow(true);
      return;
    }

    const result = marketplace?.connectedMarketplace
      .filter((item) => selectedMarketplaces.includes(item.id)) // Filter by IDs
      .map((item) => capitalizeFirstLetter(item.name));

    const { data, error } = await setProductMarketplace({
      marketplace: selectedMarketplaces,
      productId: productId,
    });
    if (data && !error) {
      setCompletedStep((prev: number[]) =>
        prev.includes(3) ? prev : [...prev, 3]
      );
      setErrorShow(false);
      onComplete(productId);
      getMarketplace(result);
    }
  };

  return (
    <div className="marketplace-form p-7 bg-white w-full rounded-md h-[calc(100vh_-_460px)]  lg:h-[calc(100vh_-_180px)]  overflow-y-auto scroll-design  relative">
      <h3 className="title text-[26px] font-semibold pb-4 mb-4 border-b border-black/20  ">
        Choose Marketplace
      </h3>
      {isLoading ? (
        <Loader loaderClass="!absolute" />
      ) : (
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
      )}

      {errorShow && selectedMarketplaces.length === 0 ? (
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
          isLoading={isLoadingSubmit}
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
