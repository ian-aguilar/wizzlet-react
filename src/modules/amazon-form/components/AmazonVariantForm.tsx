import { useEffect, useState } from "react";
import {
  useAmazonEditProductValuesApi,
  useGetAllAmazonPropertiesApi,
  useGetAmazonVariationPropertiesApi,
} from "../services/amazonForm.service";
import { FieldsType, IValidationItem } from "@/components/form-builder/types";
import { Option } from "@/modules/inventory-management/types";
import { getAppendField } from "@/components/form-builder/helper";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncSelectField from "@/modules/inventory-management/components/AsyncSelectField";
import { useGetCategoriesAPI } from "@/modules/inventory-management/services";
import { MARKETPLACEID } from "@/components/common/types";
import { IAmazonForm, ICategoryData, ITab } from "../types";
import {
  filterAmazonVariantProperties,
  mapDataWithReference,
  mergeDefaults,
} from "../helper";
import FormBuilder from "@/components/form-builder";
import Button from "@/components/form-fields/components/Button";
import { btnShowType } from "@/components/form-fields/types";
import { schema } from "../validations";
import { AmazonVariantChildForm } from "./AmazonVariantChildForm";

export const AmazonVariantForm = (props: IAmazonForm) => {
  const { productId } = props;
  const [validationItems, setValidationItems] = useState<IValidationItem>();
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
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

  const [properties, setProperties] = useState<FieldsType<any>[]>();
  const [variationProperties, setVariationProperties] =
    useState<FieldsType<any>[]>();
  const [category, setCategory] = useState<Option | null>(null);
  const [tab, setTab] = useState<ITab>(ITab.Parent);
  const [categoryData, setCategoryData] = useState<ICategoryData>();
  const [variationThemeData, setVariationThemeData] = useState<Option[]>();

  // console.log("🚀 ~ properties:", properties);

  const { getAllAmazonPropertiesApi } = useGetAllAmazonPropertiesApi();
  const { getCategoriesAPI, isLoading: categoryLoading } =
    useGetCategoriesAPI();
  const { editAmazonProductValueApi } = useAmazonEditProductValuesApi();
  const { getAmazonVariationProperties } = useGetAmazonVariationPropertiesApi();

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
    defaultValues.child_parent_sku_relationship[0].parent_sku = "variation";

    reset(defaultValues);

    return {
      propertyData: data?.data?.properties,
      defaultValue: defaultValues,
    };
  };

  // const getVariationThemeFields = () => {};

  const handleGetCategoryWiseProperty = (categoryData: ICategoryData) => {
    getProperties(categoryData);
  };

  const variationThemeField = watch("variation_theme[0].name");

  const getVariationProperties = () => {
    if (variationThemeData) {
      const selectedThemes = variationThemeField.toLowerCase().split("/");

      const filteredProperties = filterAmazonVariantProperties(properties, [
        ...selectedThemes,
      ]);

      setProperties(filteredProperties?.parentProperties);
      setVariationProperties(filteredProperties?.variationProperties);
    }
  };

  useEffect(() => {
    if (categoryData && variationThemeField) {
      getVariationProperties();
    }
  }, [variationThemeField]);

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

  // console.log("🚀 ~ AmazonVariantForm ~ fields:", fields);

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
          const editFinalData = await mapDataWithReference(
            editApiResponse?.productData,
            propertiesData?.propertyData
          );

          const mergedData = await mergeDefaults(
            editFinalData,
            propertiesData?.defaultValue
          );

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

  return (
    <div>
      <div className="flex justify-center gap-[50px]">
        <span
          className="cursor-pointer"
          onClick={() => {
            setTab(ITab.Parent);
          }}
        >
          Parent Product
        </span>
        <span
          className="cursor-pointer"
          onClick={() => {
            if (variationThemeField) {
              setTab(ITab.Variation);
            }
          }}
        >
          Variations
        </span>
      </div>
      <form>
        {tab === ITab.Parent && (
          <div className="p-5 bg-white max-h-[calc(100vh_-_180px)] scroll-design overflow-y-auto ">
            <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md">
              Choose Product Category
            </h2>
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
            {variationThemeData &&
              variationThemeData.map((e, index: number) => {
                return (
                  <div key={index}>
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
                          className={`bg-inputAuthBg/60 p-3 rounded-md text-gray-800 w-full outline-none hover:outline-greenPrimary  focus:outline-greenPrimary font-normal text-base mb-1 transition-all duration-300 `}
                          // disabled={isDisabled}
                        />
                      )}
                    />
                    <label>{e.label}</label>
                  </div>
                );
              })}
            {/* {tab === ITab.Parent ? ( */}
            {/* <> */}
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
                      // await handleSubmit(
                      //   onSubmit.bind(this, AmazonSaveType.SaveInAmazon)
                      // )();
                      // setListInAmazonLoading(false);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </form>
      {tab === ITab.Variation && (
        <AmazonVariantChildForm
          control={control}
          errors={errors}
          watch={watch as any}
          variationProperties={variationProperties}
        />
      )}
    </div>
  );
};

{
  /* <>
                {variationProperties && variationProperties.length > 0 && (
                  <div>
                    <FormBuilder
                      control={control}
                      errors={errors}
                      fields={variationProperties as any}
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
                          // await handleSubmit(
                          //   onSubmit.bind(this, AmazonSaveType.SaveInAmazon)
                          // )();
                          // setListInAmazonLoading(false);
                        }}
                      />
                    </div>
                  </div>
                )}
              </> */
}
