import React, { Suspense, lazy, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { steps } from "./constant";

// Lazy load components
const ProductBasicForm = lazy(() => import("../product-basic-form"));
const ChooseMarketplace = lazy(() => import("../choose-marketplace"));
const EbayForm = lazy(() => import("../eBay-form"));

const ProductForm: React.FC = () => {
  const { step } = useParams<{ step: string }>();
  const navigate = useNavigate();
  const currentStep = parseInt(step || "1", 10);

  const [productId, setProductId] = useState<number>();
  console.log("🚀 ~ productId:", productId);

  const isStepCompleted = (stepId: number) => stepId <= currentStep;

  const handleStepChange = (newStep: number) => {
    navigate(`/product-form/${newStep}`);
  };

  const handleBasicFormComplete = (data: number) => {
    setProductId(data);
    handleStepChange(2);
  };

  return (
    <section className="flex gap-5 items-start">
      <div className="w-[335px] min-w-[335px] bg-white rounded-md border-greyBorder p-8 mb-5 lg:mb-0">
        <div className="stepperInventory relative pl-5">
          {steps.map(({ id, label, description }) => (
            <div
              key={id}
              className={`step1 relative ${
                isStepCompleted(id) ? "active" : ""
              }`}>
              <div
                className={`absolute -left-[23px] -top-3 border-8 rounded-full ${
                  isStepCompleted(id)
                    ? "border-greenPrimary/20"
                    : "border-grayText/20"
                }`}>
                <div
                  className={`w-7 h-7 min-w-7 rounded-full flex justify-center items-center text-white ${
                    isStepCompleted(id) ? "bg-greenPrimary" : "bg-gray-400"
                  }`}>
                  {id}
                </div>
              </div>
              <div
                className={`border-l border-dashed ${
                  isStepCompleted(id)
                    ? "border-greenPrimary"
                    : "border-grayText/20"
                } pl-10
                min-h-[70px]`}>
                <h3 className="font-medium text-xl">{label}</h3>
                <p className="text-grayText text-sm font-medium">
                  {description}
                </p>
              </div>
              {id < steps.length && (
                <div
                  className={`border-l-2 ${
                    isStepCompleted(id) ? "border-green-500" : "border-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        {currentStep === 1 && (
          <Suspense fallback={<div>Loading Product Basic Form...</div>}>
            <ProductBasicForm onComplete={handleBasicFormComplete} />
          </Suspense>
        )}
        {currentStep === 2 && (
          <Suspense fallback={<div>Loading Choose Marketplace...</div>}>
            <ChooseMarketplace onComplete={() => handleStepChange(3)} />
          </Suspense>
        )}
        {currentStep === 3 && (
          <Suspense fallback={<div>Loading eBay Form...</div>}>
            <EbayForm productId={productId} />
          </Suspense>
        )}
      </div>
    </section>
  );
};

export default ProductForm;
