import { TableColumn } from "react-data-table-component";
import { ShopifyProfileAttributeType } from "../types";
import { ShopifyProfileStatus } from "../enums";
import { AutoSyncIcon } from "@/assets/Svg";
import { toast } from "react-toastify";
interface ShopifyProfileHeadersProps {
  onSelect: (data: ShopifyProfileAttributeType) => void;
}

const useShopifyProfileHeaders = ({ onSelect }: ShopifyProfileHeadersProps) => {
  const shopifyProfileheaders: TableColumn<ShopifyProfileAttributeType>[] = [
    {
      name: "Stores",
      id: "shop",
      sortField: "shop",
      sortable: true,
      selector: (row) => row.shop, // Explicitly select the `shop` field
    },
    {
      name: "Name",
      id: "uniqueId",
      sortField: "uniqueId",
      sortable: true,
      selector: (row) => row.uniqueId, // Explicitly select the `uniqueId` field
    },
    {
      name: "Status",
      id: "shop",
      sortField: "shop",
      sortable: true,
      cell: (row) => (
        <span>
          {row.accessToken ? ShopifyProfileStatus.ACTIVE : ShopifyProfileStatus.INACTIVE}
        </span>
      ),
    },
    {
      name: "Action",
      id: "action",
      cell: (row) => (
        <div className="flex gap-4 ">
          <span onClick={ () => {
            onSelect(row as ShopifyProfileAttributeType );
            toast.success(`${row?.shop} Profile Selected`);
          } } className="text-greenPrimary cursor-pointer">
            <AutoSyncIcon  />
          </span>
        </div>
      ),
    }
  ];

  return { shopifyProfileheaders };
};
export default useShopifyProfileHeaders;