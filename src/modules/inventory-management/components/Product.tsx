// ** Icons **
import { DeleteIcon, EditLabelIcon } from "@/assets/Svg";

// ** Components **
import Checkbox from "@/components/form-fields/components/Checkbox";

// ** Config **
import { VITE_APP_API_URL } from "@/config";

// ** Types **
import { productProps } from "../types";

const Product = ({ currentData }: productProps) => {
  return (
    <div className="grid grid-cols-12 xl:gap-x-5 gap-y-5  max-h-[calc(100vh_-_685px)]  lg:max-h-[calc(100vh_-_540px)] overflow-y-auto scroll-design ">
      {currentData.map((item) => {
        return (
          <div
            key={item.id}
            className=" col-span-12 xl:col-span-6 InventorySelectBox bg-white p-5 flex items-center gap-3"
          >
            <div>
              <Checkbox isChecked={item.status === "active"} checkLabel=" " />
            </div>
            <div className="IBox flex gap-6 w-full ">
              <div className="prodImg">
                <img src={item.img} className="max-w-[170px] max-h-[132px] " alt="" />
              </div>
              <div className="relative w-full">
                <div className="absolute right-1 top-1 flex gap-2 ">
                  <div>
                    <EditLabelIcon className="cursor-pointer" />
                  </div>
                  <div>
                    <DeleteIcon className="text-redAlert cursor-pointer" />
                  </div>
                </div>
                <h4 className="text-[19px] font-medium text-blackPrimary mr-10 line-clamp-1 ">{item.title}</h4>
                <div className="Badges flex flex-wrap gap-1 text-sm ">
                  {item.categories.map((category) => {
                    return (
                      <div
                        key={category.id}
                        className="rounded-[5px] bg-greenPrimary/20 capitalize text-greenPrimary font-normal p-1 "
                      >
                        {category.name}
                      </div>
                    );
                  })}
                </div>
                <div className="DescSpecifications flex flex-wrap gap-6 py-5">
                  <div>
                    <span className="uppercase font-normal text-sm text-grayText">Price</span>
                    <p className="text-blackPrimary font-medium ">{item.price}</p>
                  </div>
                  <div className="border-r border-dashed border-grayText/30">&nbsp;</div>
                  <div>
                    <span className="uppercase font-normal text-sm text-grayText">Date</span>
                    <p className="text-blackPrimary font-medium ">{item.date}</p>
                  </div>
                  <div className="border-r border-dashed border-grayText/30">&nbsp;</div>
                  <div>
                    <span className="uppercase font-normal text-sm text-grayText">QTY</span>
                    <p className="text-blackPrimary font-medium ">{item.qty}</p>
                  </div>
                  <div className="border-r border-dashed border-grayText/30">&nbsp;</div>
                  <div>
                    <span className="uppercase font-normal text-sm text-grayText">SKU</span>
                    <p className="text-blackPrimary font-medium ">{item.SKU}</p>
                  </div>
                </div>
                <div className="syncingOn flex flex-wrap gap-1 ">
                  {item.marketPlaces.map((marketsLogo) => {
                    return (
                      <div key={marketsLogo.id} className=" rounded-md  border border-grayText/20 p-1">
                        <img src={`${VITE_APP_API_URL}${marketsLogo.logo}`} className="w-14 h-auto" alt="" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
