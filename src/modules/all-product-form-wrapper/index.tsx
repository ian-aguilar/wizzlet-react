import React, { Suspense, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { steps } from "./constant";
// import AmazonForm from "../amazon-form";

// Lazy load components
const ProductBasicForm = lazy(() => import("../product-basic-form"));
const ChooseMarketplace = lazy(() => import("../choose-marketplace"));
const EbayForm = lazy(() => import("../eBay-form"));

const ProductForm: React.FC = () => {
  const { step, productId } = useParams<{ step: string; productId: string }>();
  const navigate = useNavigate();
  const currentStep = parseInt(step || "1", 10);

  const isStepCompleted = (stepId: number) => stepId <= currentStep;

  const handleStepChange = (
    newStep: number,
    productId: number = 0,
    isClick: boolean = false
  ) => {
    if (isClick) {
      if (newStep > currentStep) {
        return;
      }
    }
    navigate(`/inventory-management/product-form/${newStep}/${productId}`);
  };

  const handleBasicFormComplete = (data: number) => {
    handleStepChange(2, data);
  };

  const handleChooseMarketplaceComplete = (data: number) => {
    handleStepChange(3, data);
  };

  return (
    <>
      {" "}
      <div className="font-bold text-blackPrimary text-[34px] mb-4">
        Add New Item
      </div>
      <div className="">
        <section className="  items-start  block lg:flex gap-4 w-full">
          <div className="w-[335px] min-w-[335px] bg-white rounded-md border-greyBorder p-8 mb-5 lg:mb-0">
            <div className="stepperInventory relative pl-5">
              {steps.map(({ id, label, description }) => (
                <div
                  key={id}
                  className={`step1 relative pt-0.5  ${
                    isStepCompleted(id) ? "active" : ""
                  }`}
                >
                  <div
                    className={`absolute -left-[23px] z-20  border-8 rounded-full ${
                      isStepCompleted(id)
                        ? "border-greenPrimary/20"
                        : "border-grayText/20"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 min-w-7 rounded-full flex justify-center items-center text-white cursor-pointer ${
                        isStepCompleted(id) ? "bg-greenPrimary" : "bg-gray-400"
                      }`}
                      onClick={() =>
                        handleStepChange(id, Number(productId), true)
                      }
                    >
                      {id}
                    </div>
                  </div>
                  <div
                    className={` relative z-10 before:top-[8px] before:-z-[1] before:absolute before:border-l  before:w-[1px] before:h-full  before:border-dashed  before:last:border-0 before:left-0 ${
                      isStepCompleted(id)
                        ? " before:border-greenPrimary"
                        : " before:border-grayText/20"
                    } pl-10
                min-h-[70px]`}
                  >
                    <h3 className="font-medium text-xl  ">{label}</h3>
                    <p className="text-grayText text-sm font-medium">
                      {description}
                    </p>
                  </div>
                  {id < steps.length && (
                    <div
                      className={`border-l-2 ${
                        isStepCompleted(id)
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 ">
            {currentStep === 1 && (
              <Suspense fallback={<div>Loading Product Basic Form...</div>}>
                <ProductBasicForm onComplete={handleBasicFormComplete} />
              </Suspense>
            )}
            {currentStep === 2 && (
              <Suspense fallback={<div>Loading Choose Marketplace...</div>}>
                <ChooseMarketplace
                  onComplete={handleChooseMarketplaceComplete}
                />
              </Suspense>
            )}
            {currentStep === 3 && (
              <Suspense fallback={<div>Loading eBay Form...</div>}>
                <EbayForm />
                {/* <AmazonForm /> */}
              </Suspense>
            )}
          </div>
        </section>{" "}
      </div>
    </>
  );
};

export default ProductForm;
