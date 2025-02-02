// ** Packages **
import { useNavigate } from "react-router-dom";

// ** Icons **
import { DeleteIcon, EditLabelIcon } from "@/assets/Svg";

// ** Components **
import { Loader } from "@/components/common/Loader";
import { DataNotFound } from "@/components/svgIcons";

// ** Config **
import { VITE_APP_API_URL } from "@/config";

// ** Types **
import { ILabelViewProps } from "../types/label";
import { useProductsDeleteAPI } from "@/modules/inventory-management/services";
import { useState } from "react";
import { ErrorModal } from "@/components/common/ErrorModal";
import DummyImage from "/images/dummyImage.png";

const LabelItems = ({
  currentData,
  isLoading,
  onChangeData,
}: {
  currentData: ILabelViewProps[];
  onChangeData: () => Promise<void>;
  isLoading?: boolean;
}) => {
  const navigate = useNavigate();
  const handleEditProduct = (productId: number) => {
    navigate(`/inventory-management/product-form/1/${productId}`);
  };
  const [isDeleteModel, setIsDeleteModel] = useState<boolean>(false);
  const [deleteProduct, setDeleteProduct] = useState<number | null>(null);
  const closeDeleteModel = () => setDeleteProduct(null);

  const { deleteProductsAPI, isLoading: deleteLoading } =
    useProductsDeleteAPI();

  const handleRemove = async () => {
    closeDeleteModel();
    setIsDeleteModel(false);
    if (deleteProduct) {
      const { error } = await deleteProductsAPI([Number(deleteProduct)]);
      if (!error) {
        closeDeleteModel();
        setIsDeleteModel(false);
        await onChangeData();
      }
    }
  };
  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="grid gap-y-5  h-[calc(100vh_-_400px)]  items-start  overflow-y-auto scroll-design">
        {currentData?.length ? (
          <>
            {currentData?.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" col-span-12 xl:col-span-6 InventorySelectBox bg-grayLightBody/5 p-5 flex items-center gap-3"
                >
                  <div className="IBox flex gap-6 w-full ">
                    {item?.images !== undefined || null ? (
                      <div className="prodImg w-[170px]">
                        <img
                          src={
                            item?.images?.indexOf("http") !== -1
                              ? `${item?.images}`
                              : `${VITE_APP_API_URL}${item?.images}`
                          }
                          className="max-w-[170px] min-w-[170px]  max-h-[132px] object-contain "
                          alt=""
                        />
                      </div>
                    ) : (
                      <img
                        src={DummyImage}
                        className="w-[171px] min-w-[171px] h-[132px] object-cover rounded-md "
                      />
                    )}
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
                      <div className="DescSpecifications flex flex-wrap gap-6 py-5">
                        {item?.type === "NORMAL" ? (
                          <>
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
                            <div className="border-r border-dashed border-grayText/30">
                              &nbsp;
                            </div>
                          </>
                        ) : null}
                        <div>
                          <span className="uppercase font-normal text-sm text-grayText">
                            Type
                          </span>
                          <p className="bg-greenPrimary/10 text-greenPrimary align-middle text-s font-medium py-0.5 rounded-md px-1 mt-1 ">
                            {item?.type}
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
                  subText="This will delete product data from every platform."
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div>
              <DataNotFound className="h-[30vh] mt-[10vh]" />
            </div>
          </>
        )}
      </div>
    );
  }
};

export default LabelItems;
