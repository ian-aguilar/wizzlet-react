import { getValidation } from "@/components/form-builder/helper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserModel } from "../user-management/types";
import FormBuilder from "@/components/form-builder";
import { useEbayFormHandleApi, useGetAllFieldsApi, useGetCategoryApi } from "./services/productBasicForm.service";
import { useEffect, useState } from "react";
import { Select } from "@/components/form-fields/components/SelectCategory";
import { CategoryOptions, ICategory } from "@/components/common/types";
import Button from "@/components/form-fields/components/Button";
import { btnShowType } from "@/components/form-fields/types";
import { Loader } from "@/components/common/Loader";
import { PropertiesState } from "./types";

// const dummyData = {
//   ShippingService: {
//     value: "AT_BitteTreffenSieEineAuswahl",
//     label: "AT_BITTE_TREFFEN_SIE_EINE_AUSWAHL",
//   },
//   ShippingServicePriority: {
//     label: "1",
//     value: "1",
//   },
//   ShippingServiceCost: 34,
//   ShippingType: {
//     label: "Calculated",
//     value: "Calculated",
//   },
//   ShippingCostPaidByOption: {
//     label: "Buyer",
//     value: "Buyer",
//   },
//   RefundOption: {
//     label: "MoneyBackOrExchange",
//     value: "MoneyBackOrExchange",
//   },
//   ReturnsWithinOption: {
//     label: "Days 14",
//     value: "Days_14",
//   },
//   ReturnsAcceptedOption: {
//     label: "ReturnsAccepted",
//     value: "ReturnsAccepted",
//   },
//   Quantity: 434,
//   PostalCode: 34,
//   DispatchTimeMax: {
//     label: "1 Day",
//     value: 1,
//   },
//   Description: "sdads",
//   Title: "sddz",
//   StartPrice: 34,
//   Currency: {
//     label: "Andorran Peseta",
//     value: "ADP",
//   },
//   Country: {
//     label: "Andorra",
//     value: "AD",
//   },
//   Color: {
//     label: "Black",
//     value: "Black",
//   },
//   Style: {
//     label: "American Directoire",
//     value: "American Directoire",
//   },
//   Material: {
//     label: "Brass",
//     value: "Brass",
//   },
//   "Original/Reproduction": {
//     label: "Antique Original",
//     value: "Antique Original",
//   },
//   Decade: {
//     label: "1920s",
//     value: "1920s",
//   },
//   Features: {
//     label: "New Old Stock",
//     value: "New Old Stock",
//   },
//   Maker: {
//     label: "Planet Jr.",
//     value: "Planet Jr.",
//   },
//   "California Prop 65 Warning": "dfd",
// };

const EbayForm: React.FC<{ productId: number | undefined }> = ({ productId }) => {
  console.log("🚀 ~ productId:", productId);
  const { getAllFieldsApi, isLoading: fieldsLoading } = useGetAllFieldsApi();
  const { getCategoryApi, isLoading: optionsLoading } = useGetCategoryApi();
  const { ebayFormSubmitApi } = useEbayFormHandleApi();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoriesId, setCategoriesId] = useState<number | string>(0);
  const [propertiesState, setPropertiesState] = useState<PropertiesState>({
    categorized: [],
    nullCategory: [],
  });

  const handleCategoryOptionAPi = async () => {
    const { data, error } = await getCategoryApi();
    if (data && !error) {
      setCategories(data?.data);
    }
  };

  const handleCommonField = async () => {
    try {
      const { data } = await getAllFieldsApi(productId);
      setPropertiesState((prevState) => ({
        ...prevState,
        nullCategory: data?.data?.nullCategoryProperties || [],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = async (selectedOption: CategoryOptions) => {
    console.log("Selected Option:", selectedOption);
    if (!selectedOption?.id) {
      return;
    }
    setCategoriesId(selectedOption?.id);
    const { data } = await getAllFieldsApi(Number(selectedOption?.id));
    setPropertiesState((prevState) => ({
      ...prevState,
      categorized: data?.data?.categorizedProperties || [],
    }));
  };

  useEffect(() => {
    handleCategoryOptionAPi();
    handleCommonField();
  }, []);

  const validation = getValidation(propertiesState.nullCategory);

  const {
    control,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<any>({
    resolver: yupResolver(validation),
  });
  console.log("🚀 ~ errors:", errors);

  // useEffect(() => {
  //   reset(dummyData);
  // }, []);

  const onSubmit = async (payload: IUserModel) => {
    console.log("🚀  onSubmit  payload:", payload);
    const filteredPayload = {
      payload: payload,
      productId: productId,
      categoryId: categoriesId,
      marketplaceId: 2,
    };
    const { data } = await ebayFormSubmitApi(filteredPayload);
    console.log("🚀 ~ onSubmit ~ data:", data);
  };

  return (
    <>
      <div className="p-7 bg-white w-full rounded-md h-[calc(100vh_-_460px)]  lg:h-[calc(100vh_-_180px)]  overflow-y-auto scroll-design ">
        {fieldsLoading || optionsLoading ? <Loader loaderClass=" !fixed " /> : null}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select options={categories} onChange={handleOnChange} />
          <FormBuilder control={control} errors={errors} fields={propertiesState.nullCategory} />
          <FormBuilder control={control} errors={errors} fields={propertiesState.categorized} />
          <Button showType={btnShowType.primary} btnName="Save" type="submit" />
        </form>
      </div>
    </>
  );
};

export default EbayForm;
