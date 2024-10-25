import { useEffect, useState } from "react";
import {
  useAmazonEditProductValuesApi,
  useAmazonFormHandleApi,
  useCreateAmazonProductApi,
  useGetAllAmazonPropertiesApi,
  useGetAmazonChildProductsApi,
  useGetAmazonVariationPropertiesApi,
} from "../services/amazonForm.service";
import { FieldsType, IValidationItem } from "@/components/form-builder/types";
import { Option } from "@/modules/inventory-management/types";
import { getAppendField } from "@/components/form-builder/helper";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncSelectField from "@/modules/inventory-management/components/AsyncSelectField";
import { useGetCategoriesAPI } from "@/modules/inventory-management/services";
import { MARKETPLACE, MARKETPLACEID } from "@/components/common/types";
import { AmazonSaveType, IAmazonForm, ICategoryData, ITab } from "../types";
import {
  amazonTransformData,
  appendFormData,
  cleanPayload,
  filterAmazonVariantProperties,
  mapDataWithReference,
  mergeDefaults,
} from "../helper";
import FormBuilder from "@/components/form-builder";
import Button from "@/components/form-fields/components/Button";
import { btnShowType } from "@/components/form-fields/types";
import { schema } from "../validations";
import { AmazonVariantChildForm } from "./AmazonVariantChildForm";
import { useSelector } from "react-redux";
import { userSelector } from "@/redux/slices/userSlice";
import { selectSocket } from "@/redux/slices/socketSlice";
import { NOTIFICATION_TYPE, Type } from "@/constants";
import { useCreateUserNotificationInDbApi } from "@/modules/eBay-form/services/productBasicForm.service";
import { RECOMMENDED_BROWSE_NODES } from "../constants";
import { Loader } from "@/components/common/Loader";
import Input from "@/components/form-fields/components/Input";

export const AmazonVariantForm = (props: IAmazonForm) => {
  const { productId, onComplete } = props;
  const [validationItems, setValidationItems] = useState<IValidationItem>();
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(
      schema(validationItems?.conditions, validationItems?.properties)
    ),
  });

  useFieldArray({
    control,
    name: "variation_theme",
  });

  const parent_sku = watch("parent_sku");

  const user = useSelector(userSelector);
  const socket = useSelector(selectSocket);

  const [properties, setProperties] = useState<FieldsType<any>[]>();
  const [category, setCategory] = useState<Option | null>(null);
  const [tab, setTab] = useState<ITab>(ITab.Parent);
  const [categoryData, setCategoryData] = useState<ICategoryData>();
  const [variationThemeData, setVariationThemeData] = useState<Option[]>();
  const [childProducts, setChildProducts] = useState<any[]>([]);
  const [childProperties, setChildProperties] = useState<any[]>([]);
  const [fieldDefaultValues, setFieldDefaultValues] = useState<any>();

  // console.log("🚀 ~ properties:", properties);

  const { getAllAmazonPropertiesApi, isLoading: amazonPropertiesLoading } =
    useGetAllAmazonPropertiesApi();
  const { getCategoriesAPI, isLoading: categoryLoading } =
    useGetCategoriesAPI();
  const { editAmazonProductValueApi, isLoading: amazonDataLoading } =
    useAmazonEditProductValuesApi();
  const { getAmazonVariationProperties } = useGetAmazonVariationPropertiesApi();
  const { amazonFormSubmitApi } = useAmazonFormHandleApi();
  const { createAmazonProductApi } = useCreateAmazonProductApi();
  const { createUserNotificationInDbApi } = useCreateUserNotificationInDbApi();
  const { getAmazonChildProductsApi } = useGetAmazonChildProductsApi();

  const getProperties = async (categoryData: ICategoryData) => {
    if (!categoryData?.value) {
      return;
    }

    const { data } = await getAllAmazonPropertiesApi(categoryData?.value);
    const { data: variationData } = await getAmazonVariationProperties(
      categoryData?.value
    );

    setVariationThemeData(variationData?.data);
    setCategory(categoryData);
    setProperties(data?.data?.properties);
    setValidationItems(data?.data?.validationItems);

    const defaultValues = getAppendField(data?.data?.properties);

    defaultValues.variation_theme[0].name = variationThemeField;
    defaultValues.parentage_level[0].value = "parent";
    defaultValues.child_parent_sku_relationship[0].child_relationship_type =
      "variation";

    const modifiedDefaultValues = {
      ...defaultValues,
      recommended_browse_nodes: RECOMMENDED_BROWSE_NODES,
    };

    setFieldDefaultValues(modifiedDefaultValues);

    reset(modifiedDefaultValues);

    return {
      propertyData: data?.data?.properties,
      defaultValue: modifiedDefaultValues,
    };
  };

  // const getVariationThemeFields = () => {};

  const handleGetCategoryWiseProperty = (categoryData: ICategoryData) => {
    getProperties(categoryData);
  };

  const variationThemeField = watch("variation_theme[0].name");

  // const getVariationProperties = () => {
  //   if (variationThemeData) {
  //     const selectedThemes = variationThemeField.toLowerCase().split("/");

  //     const filteredProperties = filterAmazonVariantProperties(properties, [
  //       ...selectedThemes,
  //     ]);

  //     setProperties(filteredProperties?.parentProperties);
  //   }
  // };

  // useEffect(() => {
  //   if (categoryData && variationThemeField) {
  //     getVariationProperties();
  //   }
  // }, [variationThemeField]);

  const getCategories = async (search: string, page: number) => {
    const { data, error } = await getCategoriesAPI(
      [MARKETPLACEID.AMAZON],
      search,
      page
    );
    if (!error && data) {
      return data?.data;
    }
  };

  const fields = useWatch({ control });

  useEffect(() => {
    if (fields) {
      trigger();
    }
  }, [fields]);

  const handleAmazonEditApiResponse = async () => {
    if (Number(productId) === 0) {
      return;
    }
    const { data, error } = await editAmazonProductValueApi(productId);

    if (!error && data?.data) {
      return data?.data;
    }
  };

  useEffect(() => {
    handleAmazonEditApiResponse()
      .then(async (editApiResponse) => {
        const propertiesData = await getProperties(
          editApiResponse?.categoryData
        );

        return {
          editApiResponse,
          propertiesData,
        };
      })
      .then(async ({ propertiesData, editApiResponse }) => {
        if (editApiResponse?.productData) {
          const editFinalData = mapDataWithReference(
            editApiResponse?.productData,
            propertiesData?.propertyData
          );

          const mergedData = await mergeDefaults(
            editFinalData,
            propertiesData?.defaultValue
          );

          if (editApiResponse?.productData?.variation_theme[0].name) {
            mergedData.variation_theme[0].name =
              editApiResponse?.productData?.variation_theme[0].name;
          }

          if (editApiResponse?.parent_sku) {
            mergedData.parent_sku = editApiResponse?.parent_sku;
          }

          if (editFinalData) {
            setTimeout(() => {
              reset(mergedData);
            }, 1000);
          }
        }
      })
      .catch((error) => {
        console.error("Error in promise chain", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChildProducts = async () => {
    const { data, error } = await getAmazonChildProductsApi(+productId);
    if (!error && data) {
      setChildProducts(data?.data);
    }
  };

  useEffect(() => {
    getChildProducts();
  }, []);

  useEffect(() => {
    if (childProducts.length > 0 && properties) {
      const newChildProperties: any[] = [];
      childProducts.forEach(() => {
        newChildProperties.push(properties);
      });

      setChildProperties(newChildProperties);
    }
  }, [childProducts, properties]);

  const addChildProperties = () => {
    const newChildProperties = [...childProperties, properties];
    setChildProperties(newChildProperties);
  };

  const onSubmit = async (type: AmazonSaveType, payload: any) => {
    //remove undefined and null and blank value from payload
    const removeNullValueFromPayload = cleanPayload(payload);

    //transform payload structure as per amazon product api

    const filterPayload = await amazonTransformData(removeNullValueFromPayload);
    filterPayload.product_type = "parent";

    //payload append into a formData
    const formData = new FormData();
    appendFormData(formData, filterPayload);

    const { error: amazonFormError } = await amazonFormSubmitApi(
      formData,
      {
        productId,
      },
      {
        categoryId: category?.value,
      }
    );

    if (!amazonFormError) {
      const notificationPayload = {
        productId: productId,
        notification_type: NOTIFICATION_TYPE.LIST,
        is_read: false,
        type: Type.NOTIFICATION,
        marketplace: MARKETPLACE.AMAZON,
      };
      if (type === AmazonSaveType.SaveInAmazon) {
        const { error } = await createAmazonProductApi(Number(productId));
        if (!error) {
          const { data, error } = await createUserNotificationInDbApi(
            notificationPayload
          );
          if (data && !error) {
            if (socket) {
              socket.emit("user_notification", user?.id);
            }
          }
          onComplete(productId);
        }
      }
      onComplete(productId);
    }
  };

  return (
    <div className="relative">
      {categoryLoading || amazonDataLoading || amazonPropertiesLoading ? (
        <Loader loaderClass="!absolute !h-full" />
      ) : null}
      <div className="flex items-center gap-1   bg-blackPrimary pt-2 px-4 overflow-x-auto whitespace-nowrap !w-[calc(100vw_-_480px)]   scroll-design pr-6 ">
        <span
          className="cursor-pointer px-4 py-2 rounded-t-md bg-white  text-blackPrimary "
          onClick={() => {
            setTab(ITab.Parent);
          }}
        >
          Parent Product
        </span>
        {childProperties &&
          childProperties.map((_, index: number) => {
            return (
              <span
                className="cursor-pointer text-white  px-4 py-2  hover: rounded-t-md hover:bg-white  hover:text-blackPrimary"
                onClick={() => {
                  // if (variationThemeField) {
                  setTab(ITab.Variation);
                  // }
                }}
                key={index}
              >
                Variations
              </span>
            );
          })}
        <span
          className="cursor-pointer text-white  px-4 py-2 hover: rounded-t-md hover:bg-white  hover:text-blackPrimary"
          onClick={() => {
            addChildProperties();
          }}
        >
          Add Child product +
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit.bind(this, AmazonSaveType.Save))}>
        {tab === ITab.Parent && (
          <div className="p-5 bg-white max-h-[calc(100vh_-_200px)] scroll-design overflow-y-auto ">
            <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md">
              Choose Product Category
            </h2>
            <div className="py-3 px-5 border-l border-r border-b rounded-b-md">
              <AsyncSelectField
                name="amazonProductCategory"
                serveSideSearch={true}
                getOnChange={(e) => {
                  if (e) {
                    setCategoryData(e);
                    handleGetCategoryWiseProperty(e);
                  } else {
                    setCategory(null);
                  }
                }}
                isLoading={categoryLoading}
                isSearchable={true}
                notClearable={true}
                getOptions={getCategories}
                value={category ? category : null}
                className=" !font-medium hover:border-blackPrimary/20 text-grayText min-w-80 !text-base  !py-2 !px-3 "
                placeholder="Choose Category"
              />
              {variationThemeData && (
                <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md">
                  Choose Variation Combination
                </h2>
              )}
              <div className="py-3 px-5 border-l border-r border-b rounded-b-md">
                {variationThemeData &&
                  variationThemeData.map((e, index: number) => {
                    return (
                      <div className="flex gap-4 items-center " key={index}>
                        <Controller
                          name={"variation_theme[0].name"}
                          control={control}
                          render={({ field: { onChange, onBlur } }) => (
                            <input
                              onBlur={onBlur}
                              onChange={onChange}
                              value={e.value}
                              name="variation_theme[0].name"
                              type="radio"
                              className={` w-4 h-4 accent-greenPrimary `}
                              // disabled={isDisabled}
                            />
                          )}
                        />
                        <label className="w-full">{e.label}</label>
                      </div>
                    );
                  })}
              </div>
              {/* {tab === ITab.Parent ? ( */}
              {/* <> */}
              <Input
                placeholder={"Enter parent sku"}
                control={control}
                textLabelName={"Parent SKU"}
                name={"parent_sku"}
                errors={errors}
                type={"input"}
              />
              {properties && properties.length > 0 && (
                <div>
                  <FormBuilder
                    control={control}
                    errors={errors}
                    fields={properties as any}
                    watch={watch as any}
                  />
                  <div className="flex justify-between">
                    <Button
                      showType={btnShowType.primary}
                      btnName="Save"
                      type="submit"
                      btnClass="mt-6 !text-base"
                    />

                    <Button
                      showType={btnShowType.primary}
                      btnName="Save and list in Amazon"
                      btnClass="mt-6 !text-base !bg-greenPrimary !text-white "
                      // isLoading={listInAmazonLoading}
                      type="button"
                      onClickHandler={async () => {
                        // setListInAmazonLoading(true);
                        await handleSubmit(
                          onSubmit.bind(this, AmazonSaveType.SaveInAmazon)
                        )();
                        // setListInAmazonLoading(false);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </form>

      {tab === ITab.Variation &&
        childProperties.length > 0 &&
        childProperties.map((_: any, index) => {
          return (
            <div className="p-5 bg-white max-h-[calc(100vh_-_200px)] scroll-design overflow-y-auto ">
              <AmazonVariantChildForm
                variationProperties={childProperties[index]}
                validationItems={validationItems}
                fieldDefaultValues={fieldDefaultValues}
                variationThemeField={variationThemeField}
                productId={productId}
                category={category}
                onComplete={onComplete}
                childProduct={childProducts[index]}
                parent_sku={parent_sku}
                key={index}
              />
            </div>
          );
        })}
    </div>
  );
};
