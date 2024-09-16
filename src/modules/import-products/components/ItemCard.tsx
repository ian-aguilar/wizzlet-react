import Checkbox from "@/components/form-fields/components/Checkbox";
import { IItems, IItemsProps } from "../types";

export const ItemCard = ({ item, isCheck, setIsCheck }: IItemsProps) => {
  const checkHandler = (item: IItems, isChecked: boolean) => {
    setIsCheck([...isCheck, item.id]);
    if (!isChecked) {
      setIsCheck(isCheck.filter((element) => element !== item.id));
    }
  };
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
        <div className="flex justify-between">
          <span>PRICE {item.price}</span>
          <span>DATE {item.price}</span>
          <span>ITEM ID {item.product_portal_id}</span>
        </div>
      </div>
      <div>
        <Checkbox
          checkLabel=""
          isChecked={isCheck.includes(item.id)}
          onChange={(e) => {
            checkHandler(item, e.target.checked);
          }}
        />
      </div>
    </div>
  );
};
