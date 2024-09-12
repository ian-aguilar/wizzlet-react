import Button from "@/components/form-fields/components/Button";
import React from "react";
import { ProductBasicFormProps } from "../all-product-form-wrapper/types";

const ChooseMarketplace: React.FC<ProductBasicFormProps> = ({ onComplete }) => {
  return (
    <div>
      <h1>Choose MarketPlace</h1>
      <Button btnName="next" onClickHandler={() => onComplete()} />
    </div>
  );
};
export default ChooseMarketplace;
