// ** Packages **
import React, { useState, useEffect } from "react";
import { IMarketplace } from "../marketplace/types";

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
    <div className="marketplace-form">
      <h1 className="title">Choose Marketplace</h1>
      <div className="marketplace-list">
        {marketplace.connectedMarketplace.length > 0 ? (
          marketplace.connectedMarketplace.map((item) => (
            <div key={item.id} className="marketplace-item">
              <Checkbox
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
      <Button btnName="Next" onClickHandler={handleSubmit} />
    </div>
  );
};

export default ChooseMarketplace;
