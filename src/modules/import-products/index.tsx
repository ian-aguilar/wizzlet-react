import SelectField from "@/components/form-fields/components/SelectField";
import { useForm } from "react-hook-form";
import { markeplaces } from "./constants";
import { useEffect, useState } from "react";
import Button from "@/components/form-fields/components/Button";
import DropDown from "../inventory-management/components/DropDown";
import { SelectMarketplace } from "./components/SelectMarketplace";
import { IItems, IOption } from "./types";
import {
  useGetImportedEbayProductsApi,
  useImportEbayProductsApi,
} from "./services/importProducts.service";
import { MARKETPLACE } from "@/components/common/types";
import { ItemCard } from "./components/ItemCard";

const ImportProducts = () => {
  const [selectedMarketplace, setSelectedMarketplace] = useState<IOption>();
  const [items, setItems] = useState<IItems[]>();

  const { importEbayProductsApi, isLoading } = useImportEbayProductsApi();
  const { getImportedEbayProductsApi } = useGetImportedEbayProductsApi();

  const importProductsHandler = async () => {
    if (selectedMarketplace) {
      switch (selectedMarketplace.value) {
        case MARKETPLACE.EBAY: {
          await importEbayProductsApi();
          break;
        }
      }
    }
  };

  const getImportProductsHandler = async () => {
    if (selectedMarketplace) {
      switch (selectedMarketplace.value) {
        case MARKETPLACE.EBAY: {
          const { data } = await getImportedEbayProductsApi();
          setItems(data?.data);
          break;
        }
        case MARKETPLACE.AMAZON: {
          setItems([]);
          break;
        }
      }
    }
  };

  useEffect(() => {
    getImportProductsHandler();
  }, [selectedMarketplace]);

  return (
    <div>
      <div>
        <div>
          <SelectMarketplace
            isSearchable={true}
            value={selectedMarketplace}
            placeholder="Select Marketplace"
            options={markeplaces}
            onChange={(result) => {
              setSelectedMarketplace(result as IOption);
            }}
          />
          <Button
            btnName={"Sync All Products"}
            onClickHandler={importProductsHandler}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div>
        <h3>Items</h3>
        <div>
          {items &&
            items.length > 0 &&
            items.map((item) => {
              return <ItemCard item={item} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default ImportProducts;
