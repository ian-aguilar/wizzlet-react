import React, { Suspense, lazy, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formComponentMap, steps } from "./constant";
// import AmazonForm from "../amazon-form";
import { useGetProductMarketplaceAPI } from "../choose-marketplace/services";
import { capitalizeFirstLetter } from "../choose-marketplace/helper";
import { addMarketplaceForms } from "./helper";
import { FormData } from "./types";
import { Loader } from "@/components/common/Loader";
import { PrivateRoutesPath } from "../Auth/types";

// Lazy load components
const ProductBasicForm = lazy(() => import("../product-basic-form"));
const ChooseMarketplace = lazy(() => import("../choose-marketplace"));

const ProductForm: React.FC = () => {
  const { getProductMarketplace, isLoading: getProductMarketplaceLoading } =
    useGetProductMarketplaceAPI();

  const { step, productId } = useParams<{ step: string; productId: string }>();

  const [marketplace, setMarketplace] = useState<string[]>([]);
  const [stepData, setStepData] = useState<FormData[]>([]);

  const navigate = useNavigate();
  const currentStep = parseInt(step || "1", 10);
  const isLastStep = currentStep === steps.length; // Check if it’s the last step

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

  const handleDynamicFormComplete = (data: number) => {
    if (isLastStep) {
      navigate(PrivateRoutesPath.inventoryManagement.view);
    } else {
      handleStepChange(currentStep + 1, data);
    }
  };

  const handleMarketplaceForm = (data: string[]) => {
    const filteredData = data.filter(
      (item: string) => !marketplace.includes(item)
    );

    if (filteredData.length > 0) {
      setMarketplace((prevState) => [...prevState, ...filteredData]);
    }
  };

  const getSelectedMarketplace = async () => {
    const { data, error } = await getProductMarketplace(productId as string);
    if (!error && data) {
      const marketplaceNameArray = data?.data?.map(
        (item: { id: number; name: string }) =>
          capitalizeFirstLetter(item?.name)
      );
      setMarketplace(marketplaceNameArray);
    }
  };

  useEffect(() => {
    const fetchMarketplaceAndHandleSteps = async () => {
      try {
        await getSelectedMarketplace(); // Fetch the marketplace
      } catch (error) {
        console.error("Error fetching marketplace:", error);
      }
    };

    fetchMarketplaceAndHandleSteps();
  }, []); // Fetch the marketplace once

  useEffect(() => {
    addMarketplaceForms(marketplace, steps, setStepData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketplace]); // Re-run when marketplace updates

  const renderStepContent = () => {
    const currentForm = stepData.find((step) => step.id === currentStep);

    if (!currentForm) return null;

    if (currentStep === 1) {
      return (
        <Suspense fallback={<Loader loaderClass="!absolute" />}>
          <ProductBasicForm onComplete={handleBasicFormComplete} />
        </Suspense>
      );
    }

    if (currentStep === 2) {
      return (
        <Suspense fallback={<Loader loaderClass="!absolute" />}>
          <ChooseMarketplace
            onComplete={handleChooseMarketplaceComplete}
            getMarketplace={handleMarketplaceForm}
          />
        </Suspense>
      );
    }

    // For dynamic steps based on the marketplace label
    const ComponentToRender = formComponentMap[currentForm.label];

    if (ComponentToRender) {
      return (
        <Suspense fallback={<Loader loaderClass="!absolute" />}>
          <ComponentToRender onComplete={handleDynamicFormComplete} />
        </Suspense>
      );
    }

    return null;
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
              {getProductMarketplaceLoading ? (
                <Loader loaderClass="!absolute" />
              ) : (
                stepData.map(({ id, label, description }) => (
                  <div
                    key={id}
                    className={`step1 relative pt-0.5  ${
                      isStepCompleted(id) ? "active" : ""
                    }`}>
                    <div
                      className={`absolute -left-[23px] z-20  border-8 rounded-full ${
                        isStepCompleted(id)
                          ? "border-greenPrimary/20"
                          : "border-grayText/20"
                      }`}>
                      <div
                        className={`w-7 h-7 min-w-7 rounded-full flex justify-center items-center text-white cursor-pointer ${
                          isStepCompleted(id)
                            ? "bg-greenPrimary"
                            : "bg-gray-400"
                        }`}
                        onClick={() =>
                          handleStepChange(id, Number(productId), true)
                        }>
                        {id}
                      </div>
                    </div>
                    <div
                      className={` relative z-10 before:top-[8px] before:-z-[1] before:absolute before:border-l  before:w-[1px] before:h-full  before:border-dashed  before:last:border-0 before:left-0 ${
                        isStepCompleted(id)
                          ? " before:border-greenPrimary"
                          : " before:border-grayText/20"
                      } pl-10
  min-h-[70px]`}>
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
                ))
              )}
            </div>
          </div>

          <div className="flex-1 ">{renderStepContent()}</div>
        </section>{" "}
      </div>
    </>
  );
};

export default ProductForm;
