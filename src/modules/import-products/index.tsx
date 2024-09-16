// ** Packages **
import { useEffect, useState } from "react";

// ** Common **
import { markeplaces } from "./constants";
import Button from "@/components/form-fields/components/Button";
import { SelectMarketplace } from "./components/SelectMarketplace";
import { IItems, IOption } from "./types";
import { MARKETPLACE } from "@/components/common/types";
import { ItemCard } from "./components/ItemCard";
import Checkbox from "@/components/form-fields/components/Checkbox";

// ** Services **
import {
  useGetImportedEbayProductsApi,
  useImportEbayProductsApi,
} from "./services/importProducts.service";

const ImportProducts = () => {
  const [selectedMarketplace, setSelectedMarketplace] = useState<IOption>();
  const [items, setItems] = useState<IItems[]>();
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<number[]>([]);

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
    } else {
      const { data } = await getImportedEbayProductsApi();
      setItems(data?.data);
    }
  };

  useEffect(() => {
    getImportProductsHandler();
  }, [selectedMarketplace]);

  const selectAllHandler = () => {
    setIsAllChecked(!isAllChecked);
    if (items) {
      setIsCheck(items.map((item) => item.id));
    }
    if (isAllChecked) {
      setIsCheck([]);
    }
  };

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
        <div className="flex justify-between">
          <h3>Items</h3>
          <Checkbox checkLabel="All" onChange={selectAllHandler} />
        </div>
        <div>
          {items &&
            items.length > 0 &&
            items.map((item) => {
              return (
                <ItemCard item={item} isCheck={isCheck} setIsCheck={setIsCheck} key={item.id} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ImportProducts;
