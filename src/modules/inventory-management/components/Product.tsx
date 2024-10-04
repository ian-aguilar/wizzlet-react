import { useState } from "react";
// ** Icons **
import { DeleteIcon, EditLabelIcon } from "@/assets/Svg";
import { DataNotFound } from "@/components/svgIcons";

// ** Components **
import Checkbox from "@/components/form-fields/components/Checkbox";
import { Loader } from "@/components/common/Loader";
import { ErrorModal } from "@/components/common/ErrorModal";

// ** Config **
import { VITE_APP_API_URL } from "@/config";

// ** Types **
import { productProps } from "../types";
import { useNavigate } from "react-router-dom";

// ** Services **
import { useProductDeleteAPI } from "../services";

const Product = ({
  currentData,
  isLoading,
  checkboxes,
  checkboxOnChange,
}: {
  currentData: productProps[];
  isLoading?: boolean;
  checkboxes: number[] | null;
  checkboxOnChange: (id: number) => void;
}) => {
  const [isDeleteModel, setIsDeleteModel] = useState<boolean>(false);
  const [deleteProduct, setDeleteProduct] = useState<number | null>(null);
  const closeDeleteModel = () => setDeleteProduct(null);

  const { deleteProductAPI, isLoading: deleteLoading } = useProductDeleteAPI();

  const handleRemove = async () => {
    closeDeleteModel();
    setIsDeleteModel(false);
    return;
    if (deleteProduct) {
      const { error } = await deleteProductAPI(Number(deleteProduct) );
      if (error) console.log(error);
      else {
        closeDeleteModel();
        setIsDeleteModel(false);
        navigate(`/inventory-management`);
      }
    }
  };
  const navigate = useNavigate();
  const handleEditProduct = (productId: number) => {
    navigate(`/inventory-management/product-form/1/${productId}`);
  };
  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="grid grid-cols-12 items-start xl:gap-x-5 gap-y-5  max-h-[calc(100vh_-_685px)] h-[calc(100vh_-_620px)] lg:max-h-[calc(100vh_-_620px)] overflow-y-auto scroll-design ">
        {currentData?.length ? (
          <>
            {currentData?.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" col-span-12 xl:col-span-6 InventorySelectBox bg-white p-5 flex items-center gap-3"
                >
                  <div>
                    <Checkbox
                      isChecked={checkboxes?.includes(item.id)}
                      onChange={() => checkboxOnChange(item.id)}
                    />
                  </div>
                  <div className="IBox flex gap-6 w-full ">
                    {item?.images ? (
                      <div className="prodImg">
                        <img
                          src={
                            item?.images?.indexOf("http") !== -1
                              ? `${item?.images}`
                              : `${VITE_APP_API_URL}${item?.images}`
                          }
                          className="max-w-[170px] max-h-[132px]"
                          alt=""
                        />
                      </div>
                    ) : null}
                    <div className="relative w-full">
                      <div className="absolute right-1 top-1 flex gap-2 ">
                        <div onClick={() => handleEditProduct(item?.id)}>
                          <EditLabelIcon className="cursor-pointer" />
                        </div>
                        <div
                          onClick={() => {
                            setIsDeleteModel(true);
                            setDeleteProduct(item.id);
                          }}
                        >
                          <DeleteIcon className="text-redAlert cursor-pointer" />
                        </div>
                      </div>
                      <h4 className="text-[19px] font-medium text-blackPrimary mr-10 line-clamp-1 ">
                        {item?.title}
                      </h4>
                      {item.categories?.length > 0 ? (
                        <div className="Badges flex flex-wrap gap-1 text-sm ">
                          {item.categories.map((category) => {
                            return (
                              <div
                                key={category?.id}
                                className="rounded-[5px] bg-greenPrimary/20 capitalize text-greenPrimary font-normal p-1 "
                              >
                                {category?.name}
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                      <div className="DescSpecifications flex flex-wrap gap-6 py-5">
                        <div>
                          <span className="uppercase font-normal text-sm text-grayText">
                            Price
                          </span>
                          <p className="text-blackPrimary font-medium ">
                            {item?.price}
                          </p>
                        </div>
                        <div className="border-r border-dashed border-grayText/30">
                          &nbsp;
                        </div>
                        <div>
                          <span className="uppercase font-normal text-sm text-grayText">
                            Date
                          </span>
                          <p className="text-blackPrimary font-medium ">
                            {new Date(item?.date).toLocaleDateString("en-GB", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="border-r border-dashed border-grayText/30">
                          &nbsp;
                        </div>
                        <div>
                          <span className="uppercase font-normal text-sm text-grayText">
                            QTY
                          </span>
                          <p className="text-blackPrimary font-medium ">
                            {item?.quantity}
                          </p>
                        </div>
                        <div className="border-r border-dashed border-grayText/30">
                          &nbsp;
                        </div>
                        <div>
                          <span className="uppercase font-normal text-sm text-grayText">
                            SKU
                          </span>
                          <p className="text-blackPrimary font-medium ">
                            {item?.sku}
                          </p>
                        </div>
                      </div>
                      <div className="syncingOn flex flex-wrap gap-1 ">
                        {item?.marketplaces?.map((marketsLogo, index) => {
                          return (
                            <div
                              key={index}
                              className=" rounded-md  border border-grayText/20 p-1"
                            >
                              <img
                                src={`${VITE_APP_API_URL}${marketsLogo?.logo}`}
                                className="w-14 h-auto"
                                alt=""
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div>
              {isDeleteModel && (
                <ErrorModal
                  onClose={() => {
                    setIsDeleteModel(false);
                  }}
                  isLoading={deleteLoading}
                  onSave={handleRemove}
                  heading="Are you sure?"
                  subText="This will delete your product from list"
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div>
              <DataNotFound />
            </div>
          </>
        )}
      </div>
    );
  }
};

export default Product;
