import Checkbox from "@/components/form-fields/components/Checkbox";
import { IItemsProps } from "../types";

export const ItemCard = ({ item }: IItemsProps) => {
  return (
    <div className="flex bg-white mt-[5px] justify-between">
      <div>
        <img src={item.picture_url?.PictureURL} />
      </div>
      <div>
        <div>
          {item.is_imported === true ? (
            <span className="bg-slate-500 text-white">Not Imported</span>
          ) : (
            <span className="bg-green-700 text-white">Imported</span>
          )}
        </div>
        <h2>{item.title}</h2>
        <div className="flex">
          <span>Price {item.price}</span>
          <span>Date {item.price}</span>
          <span>Item Id {item.product_portal_id}</span>
        </div>
      </div>
      <div>
        <Checkbox checkLabel="" />
      </div>
    </div>
  );
};
