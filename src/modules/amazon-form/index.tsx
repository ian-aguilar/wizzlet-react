import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductBasicFormSingleProps } from "../all-product-form-wrapper/types";
import { ProductType } from "./types";
import { AmazonNormalForm } from "./components/AmazonNormalForm";
import { useGetProductTypeApi } from "./services/amazonForm.service";
import { AmazonVariantForm } from "./components/AmazonVariantForm";

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
      {/* {categoryLoading ? <Loader loaderClass="!absolute" /> : null} */}
      {productType === ProductType.Normal ? (
        <AmazonNormalForm onComplete={onComplete} productId={productId} />
      ) : (
        <AmazonVariantForm onComplete={onComplete} productId={productId} />
      )}
    </div>
  );
};

export default AmazonForm;
