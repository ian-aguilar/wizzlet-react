import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductBasicFormSingleProps } from "../all-product-form-wrapper/types";
import { ProductType } from "./types";
import { AmazonNormalForm } from "./components/AmazonNormalForm";
import { useGetProductTypeApi } from "./services/amazonForm.service";
import { AmazonVariantForm } from "./components/AmazonVariantForm";
// import { Loader } from "@/components/common/Loader";
// import AsyncSelectField from "../inventory-management/components/AsyncSelectField";
// import { Option } from "../settings/types/label";
// import { useGetCategoriesAPI } from "../inventory-management/services";
// import { MARKETPLACE, MARKETPLACEID } from "@/components/common/types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { schema } from "./validations";
// import { NOTIFICATION_TYPE, Type } from "@/constants";
// import { useCreateUserNotificationInDbApi } from "../eBay-form/services/productBasicForm.service";
// import { useSelector } from "react-redux";
// import { userSelector } from "@/redux/slices/userSlice";
// import { selectSocket } from "@/redux/slices/socketSlice";
// import { AmazonSaveType } from "./types";
// import { RECOMMENDED_BROWSE_NODES } from "./constants";

const AmazonForm: React.FC<ProductBasicFormSingleProps> = ({ onComplete }) => {
  const { productId } = useParams();

  const [productType, setProductType] = useState<string | null>(null);

  const { getProductTypeApi } = useGetProductTypeApi();

  const getProductType = async () => {
    if (productId) {
      const { data, error } = await getProductTypeApi(+productId);
      if (!error && data) {
        setProductType(data?.data?.productType);
      }
    }
  };

  useEffect(() => {
    getProductType();
  }, []);

  return (
    <div className="relative">
      {productType &&
        (productType === ProductType.Normal ? (
          <AmazonNormalForm
            onComplete={onComplete}
            productId={productId as string}
          />
        ) : (
          <AmazonVariantForm
            onComplete={onComplete}
            productId={productId as string}
          />
        ))}
    </div>
  );
};

export default AmazonForm;
