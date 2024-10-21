import { getValidation } from "@/components/form-builder/helper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormBuilder from "@/components/form-builder";
import {
  useCreateEbayProductApi,
  useCreateUserNotificationInDbApi,
  useEbayFormHandleApi,
  useEditProductValuesApi,
  useGetAllFieldsApi,
  useGetCategoryApi,
} from "./services/productBasicForm.service";
import { useEffect, useState } from "react";
import { Select } from "@/components/form-fields/components/SelectCategory";
import {
  CategoryOptions,
  ICategory,
  MARKETPLACE,
} from "@/components/common/types";
import Button from "@/components/form-fields/components/Button";
import { btnShowType } from "@/components/form-fields/types";
import { Loader } from "@/components/common/Loader";
import { PropertiesState, SelectOption } from "./types";
import { useParams } from "react-router-dom";
import { generateCombinations, transformData } from "./helper";
import { productEbayFormValidationSchema } from "./validation-schema";
import { variantOptionType } from "../product-basic-form/types";
import Variation from "./component/Variation";
import { ProductBasicFormSingleProps } from "../all-product-form-wrapper/types";
import { NOTIFICATION_TYPE, Type } from "@/constants";

const EbayForm: React.FC<ProductBasicFormSingleProps> = ({ onComplete }) => {
  const { productId } = useParams();

  const { ebayFormSubmitApi, isLoading: ebayFormSubmitApiLoading } =
    useEbayFormHandleApi();
  const { editProductValueApi } = useEditProductValuesApi();
  const { createEbayProductApi } = useCreateEbayProductApi();
  const { getCategoryApi, isLoading: optionsLoading } = useGetCategoryApi();
  const { getAllFieldsApi, isLoading: fieldsLoading } = useGetAllFieldsApi();
  const { createUserNotificationInDbApi } = useCreateUserNotificationInDbApi();

  //**  STATE **//
  const [id, setId] = useState();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoriesId, setCategoriesId] = useState<number | string>(0);
  const [productType, setProductType] = useState<string | null>(null);
  const [propertyOptions, setPropertyOptions] = useState<
    ({ label: string; value: string } | undefined)[]
  >([]);
  const [allOptions, setAllOptions] = useState<{ [key: string]: string[] }>({});
  const [allPropertyOptions, setAllPropertyOptions] = useState<any>({
    categorized: [],
  });
  const [propertiesState, setPropertiesState] = useState<PropertiesState>({
    categorized: [],
    nullCategory: [],
  });
  const [generatedCombinations, setGeneratedCombinations] =
    useState<variantOptionType>([]);

  const [listInEbayLoading, setListInEbayLoading] = useState(false);

  const handleCategoryOptionAPi = async () => {
    const { data, error } = await getCategoryApi();
    if (data && !error) {
      setCategories(data?.data);
    }
  };

  const handleCommonField = async () => {
    try {
      const { data } = await getAllFieldsApi(null);
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

    const { firstArray, secondArray } = await transformData(
      data?.data?.categorizedProperties
    );

    setPropertyOptions(firstArray);
    setAllOptions(secondArray);

    setAllPropertyOptions(data?.data?.categorizedProperties || []);

    if (productType === "NORMAL") {
      setPropertiesState((prevState) => ({
        ...prevState,
        categorized: data?.data?.categorizedProperties || [],
      }));
    }
  };

  const handleEditApiResponse = async () => {
    if (Number(productId) === 0) {
      return;
    }
    const { data, error } = await editProductValueApi(productId);
    if (!error && data?.data) {
      return data?.data;
    }
  };

  useEffect(() => {
    handleCategoryOptionAPi();
    handleCommonField();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validation = getValidation([
    ...propertiesState.nullCategory,
    ...propertiesState.categorized,
  ]);
  const finalValidationSchema =
    productEbayFormValidationSchema.concat(validation);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError,
    clearErrors,
    setValue,
  } = useForm<any>({
    resolver: yupResolver(finalValidationSchema),
  });
  console.log("🚀 ~ errors:", errors);

  const onSubmit = async (type: "Save" | "SaveInEbay", payload: any) => {
    console.log("🚀 ~ onSubmit ~ payload:", payload);
    const formData = new FormData();

    if (productType === "VARIANT") {
      formData.append(
        "combinations",
        JSON.stringify(
          payload.combinations.map(({ images, ...rest }: any) => ({
            ...rest,
            images: images?.map((image: any) => image.name),
          }))
        )
      );
      formData.append(
        "variantProperties",
        JSON.stringify(payload.variantProperties)
      );

      // Append images
      payload?.combinations?.forEach(
        (combination: any, combinationIndex: any) => {
          combination?.images?.forEach((image: any, imageIndex: any) => {
            formData.append(
              `combinations[${combinationIndex}].images[${imageIndex}]`,
              image
            );
          });
        }
      );

      // if (payload?.variantimage?.data?.some((e: any) => e.images.length > 0)) {
      formData.append(
        "variantimage[property]",
        payload?.variantimage?.property
      );

      payload?.variantimage?.data?.forEach((item: any, index: number) => {
        formData.append(`variantimage[data][${index}][value]`, item.value);
        item?.images?.forEach((image: any) => {
          formData.append(`variantimage[data][${index}][images]`, image);
        });
      });
      // }
    }

    payload = Object.entries(payload).reduce((prev: any, current) => {
      if (current[1] !== undefined && current[1] !== null) {
        prev[current[0]] = current[1];
      }
      return prev;
    }, {});

    // Append dynamic fields
    Object.keys(payload).forEach((key) => {
      if (key !== "combinations" && key !== "variantProperties") {
        const value = payload[key];
        console.log("🚀 ~ Object.keys ~ value:", value, Boolean(value));
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (item) formData.append(`${key}[${index}]`, JSON.stringify(item));
          });
        } else if (
          typeof value === "object" &&
          value !== null &&
          !(value instanceof File)
        ) {
          if (value) formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    });

    if (productId) {
      const { data: result, error: ebayFormError } = await ebayFormSubmitApi(
        formData,
        {
          categoryId: categoriesId,
          productId,
        }
      );

      if (!ebayFormError) {
        if (type === "SaveInEbay") {
          const { error } = await createEbayProductApi(Number(productId));
          if (!error) {
            const notificationPayload = {
              productId: productId,
              notification_type: NOTIFICATION_TYPE.LIST,
              is_read: false,
              type: Type.NOTIFICATION,
              marketplace: MARKETPLACE.EBAY,
            };
            createUserNotificationInDbApi(notificationPayload);
            onComplete(productId);
          }
        } else {
          onComplete(productId);
        }
      }

      console.log("🚀 ~ onSubmit ~ result:", result);
    }
  };

  useEffect(() => {
    handleEditApiResponse().then((data) => {
      setId(data?.categoryId);

      let temp: any = { ...data };
      if (data?.productType === "NORMAL") {
        temp = { ...temp, variantProperties: [] };
      } else {
        if (temp?.variantProperties?.length > 0) {
          const selectedOptions = temp?.variantProperties?.map(
            (item: {
              singleSelect: { value: string };
              multiSelect: SelectOption[];
            }) => ({
              name: item?.singleSelect?.value,
              value: item?.multiSelect?.map(
                (opt: { value: string }) => opt?.value
              ),
            })
          );

          if (selectedOptions) {
            const combinations = generateCombinations(selectedOptions);
            setGeneratedCombinations(combinations);
          }
        } else {
          temp = {
            ...temp,
            variantProperties: [{ singleSelect: null, multiSelect: [] }],
          };
        }
      }

      setProductType(data?.productType);

      // NEED TO CHECK
      setTimeout(() => {
        reset(temp);
      }, 1000);
    });
  }, []);

  return (
    <>
      <div className="p-7 bg-white w-full rounded-md h-[calc(100vh_-_460px)]  lg:h-[calc(100vh_-_180px)]  overflow-y-auto scroll-design relative">
        {fieldsLoading || optionsLoading ? (
          <Loader loaderClass="!absolute" />
        ) : null}
        <form onSubmit={handleSubmit(onSubmit.bind(this, "Save"))}>
          <Select
            options={categories}
            defaultValue={id}
            onChange={handleOnChange}
          />

          {productType === "VARIANT" && (
            <Variation
              control={control}
              errors={errors}
              setError={setError}
              clearErrors={clearErrors}
              setValue={setValue}
              watch={watch}
              categoriesId={categoriesId}
              allPropertyOptions={allPropertyOptions}
              propertyOptions={propertyOptions}
              allOptions={allOptions}
              setPropertiesState={setPropertiesState}
              setGeneratedCombinations={setGeneratedCombinations}
              generatedCombinations={generatedCombinations}
            />
          )}

          <FormBuilder
            control={control}
            errors={errors}
            fields={propertiesState.nullCategory}
          />
          <FormBuilder
            control={control}
            errors={errors}
            fields={propertiesState.categorized}
          />
          <div className="flex justify-between">
            <Button
              showType={btnShowType.primary}
              btnName="Save"
              type="submit"
              btnClass="mt-6 !text-base"
              isLoading={ebayFormSubmitApiLoading}
            />
            <Button
              showType={btnShowType.primary}
              btnName="Save and list in Ebay"
              btnClass="mt-6 !text-base !bg-greenPrimary !text-white "
              isLoading={listInEbayLoading}
              type="button"
              onClickHandler={async () => {
                setListInEbayLoading(true);
                await handleSubmit(onSubmit.bind(this, "SaveInEbay"))();
                setListInEbayLoading(false);
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EbayForm;
