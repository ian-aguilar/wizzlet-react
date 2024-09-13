// ** Packages **
import React, { useState, useEffect } from "react";
import { IMarketplace } from "../marketplace/types";

// ** Components **
import Checkbox from "@/components/form-fields/components/Checkbox";
import Button from "@/components/form-fields/components/Button";

// ** Services **
import { useMarketplaceListingAPI } from "../marketplace/services/marketplace.service";
import { useSetProductMarketplaceAPI } from "./services";

// ** Types **
interface ProductBasicFormProps {
  onComplete: (selectedMarketplaces: number[]) => void;
  productId: number;
}

const ChooseMarketplace: React.FC<ProductBasicFormProps> = ({ onComplete, productId }) => {
  // ** States **

  const [selectedMarketplaces, setSelectedMarketplaces] = useState<number[]>([]); // List of selected marketplaces
  const [errorShow, setErrorShow] = useState<boolean>(false);
  const [marketplace, setMarketplace] = useState<{ connectedMarketplace: IMarketplace[] }>({
    connectedMarketplace: [],
  });

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
    setErrorShow(false);
    marketplaceListing();
  }, []);

  // Handle marketplace selection toggle
  const handleMarketplaceSelection = (id: number) => {
    if (!selectedMarketplaces.includes(id)) {
      setSelectedMarketplaces([...selectedMarketplaces, id]); // Add if not selected
    } else {
      setSelectedMarketplaces(selectedMarketplaces.filter((market) => market !== id)); // Remove if already selected
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if(selectedMarketplaces.length === 0){
      setErrorShow(true);
      return;
    }
    const { data, error } = await setProductMarketplace({
      marketplace: selectedMarketplaces,
      productId: productId,
    });
    if (!data && error) {
      console.log("Error: ", error);
    }
    else{
      setErrorShow(false)
      onComplete(selectedMarketplaces);
    }
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
      {errorShow && selectedMarketplaces.length == 0 ? (
        <span className="errorText text-red-600 font-medium text-sm">{"Marketplace is not selected."}</span>
      ) : null}
      <Button btnName="Next" onClickHandler={handleSubmit} />
    </div>
  );
};

export default ChooseMarketplace;
