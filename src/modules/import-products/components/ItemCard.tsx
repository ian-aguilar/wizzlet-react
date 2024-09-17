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
    <div className="flex bg-white items-center mt-2 p-5  gap-4 border border-grayLightBody/20 rounded-md ">
      <div className="flex gap-4 items-start">
        <div>
          <img
            src={item.picture_url?.PictureURL}
            className="w-[171px] h-[132px] object-cover rounded-md "
          />
        </div>
        <div>
          <div>
            {item.is_imported === true ? (
              <span className="bg-[#97A0B2] text-white text-xs font-medium py-0.5 rounded-md px-1">
                Imported
              </span>
            ) : (
              <span className="bg-[#6C778B] text-white  text-xs font-medium py-0.5 rounded-md px-1">
                Not Imported
              </span>
            )}
          </div>
          <h2 className="text-[19px] font-medium py-2 ">{item.title}</h2>
          <div className="flex gap-4 text-sm ">
            <span className="font-medium flex items-center gap-2">
              {" "}
              <p className="font-normal inline-block text-grayText">
                {" "}
                PRICE
              </p>{" "}
              {item.price}
            </span>
            <span className="text-[#D8DCE4]">|</span>
            <span className="font-medium flex items-center gap-2">
              {" "}
              <p className="font-normal inline-block text-grayText">
                DATE
              </p>{" "}
              {item.price}
            </span>
            <span className="text-[#D8DCE4]">|</span>
            <span className="font-medium flex items-center gap-2">
              {" "}
              <p className="font-normal inline-block text-grayText">
                {" "}
                ITEM ID
              </p>{" "}
              {item.product_portal_id}
            </span>
          </div>
        </div>
      </div>
      {!item.is_imported && (
        <div className="ml-auto  pr-8">
          <Checkbox
            checkLabel=""
            isChecked={isCheck.includes(item.id)}
            onChange={(e) => {
              checkHandler(item, e.target.checked);
            }}
          />
        </div>
      )}
    </div>
  );
};
