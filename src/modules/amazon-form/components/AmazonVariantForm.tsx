import { useEffect, useState } from "react";
import {
  useAmazonEditProductValuesApi,
  useAmazonFormHandleApi,
  useCreateAmazonProductApi,
  useGetAllAmazonPropertiesApi,
  useGetAmazonChildProductsApi,
  useGetAmazonVariationPropertiesApi,
  useGetProductApi,
} from "../services/amazonForm.service";
import { FieldsType, IValidationItem } from "@/components/form-builder/types";
import { Option } from "@/modules/inventory-management/types";
import { getAppendField } from "@/components/form-builder/helper";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncSelectField from "@/modules/inventory-management/components/AsyncSelectField";
import { useGetCategoriesAPI } from "@/modules/inventory-management/services";
import { MARKETPLACE, MARKETPLACEID } from "@/components/common/types";
import {
  AmazonSaveType,
  DefaultChildProperties,
  DefaultProperties,
  IAmazonForm,
  ICategoryData,
  ITab,
} from "../types";
import {
  amazonTransformData,
  appendFormData,
  cleanPayload,
  filterAmazonProperties,
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
import VariantWarningModal from "./WarningModal";
import { RootState } from "@/redux/store";

export const AmazonVariantForm = (props: IAmazonForm) => {
  const { productId, onComplete } = props;
  const [validationItems, setValidationItems] = useState<IValidationItem>();
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
    trigger,
    setError,
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
  const [parentProperties, setParentProperties] = useState<FieldsType<any>[]>();
  const [category, setCategory] = useState<Option | null>(null);
  const [tab, setTab] = useState<{ type: ITab; index: null | number }>({
    type: ITab.Parent,
    index: null,
  });
  const [variationThemeData, setVariationThemeData] = useState<Option[]>();
  const [childProducts, setChildProducts] = useState<any[]>([]);
  const [variations, setVariations] = useState<any[]>([]);
  const [childProperties, setChildProperties] = useState<any[]>([]);
  const [fieldDefaultValues, setFieldDefaultValues] = useState<any>();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [isWarningModal, setIsWarningModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [warningIndex, setWarningIndex] = useState<number | null>(0);
  const [categoryChangeLoader, setCategoryChangeLoader] =
    useState<boolean>(false);

  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarOpen
  );

  const { getAllAmazonPropertiesApi, isLoading: amazonPropertiesLoading } =
    useGetAllAmazonPropertiesApi();
  const { getCategoriesAPI, isLoading: categoryLoading } =
    useGetCategoriesAPI();
  const { editAmazonProductValueApi, isLoading: amazonDataLoading } =
    useAmazonEditProductValuesApi();
  const { getAmazonVariationProperties } = useGetAmazonVariationPropertiesApi();
  const { amazonFormSubmitApi, isLoading: saveAmazonLoading } =
    useAmazonFormHandleApi();
  const { createAmazonProductApi, isLoading: listInAmazonLoading } =
    useCreateAmazonProductApi();
  const { createUserNotificationInDbApi } = useCreateUserNotificationInDbApi();
  const { getAmazonChildProductsApi } = useGetAmazonChildProductsApi();
  const { getProductApi } = useGetProductApi();

  const getProperties = async (categoryData: ICategoryData) => {
    if (!categoryData?.value) {
      return;
    }

    const { data } = await getAllAmazonPropertiesApi(categoryData?.value);
    const { data: variationData } = await getAmazonVariationProperties(
      categoryData?.value
    );

    const newProperties = filterAmazonProperties(
      data?.data?.properties,
      DefaultProperties
    );

    const newParentProperties = filterAmazonProperties(newProperties, [
      ...DefaultChildProperties,
      [
        "purchasable_offer",
        "maximum_retail_price",
        "schedule",
        "value_with_tax",
      ],
      ["item_name"],
      ["product_description"],
    ]);

    setVariationThemeData(variationData?.data);
    setCategory(categoryData);
    setProperties(newProperties);
    setParentProperties(newParentProperties);
    setValidationItems(data?.data?.validationItems);

    let defaultValues = getAppendField(data?.data?.properties);

    defaultValues = {
      ...defaultValues,
      variation_theme: [
        {
          name: variationThemeField,
        },
      ],
      parentage_level: [
        {
          value: "parent",
        },
      ],
      child_parent_sku_relationship: [
        {
          child_relationship_type: "variation",
        },
      ],
    };

    let modifiedDefaultValues = { ...defaultValues };

    const { data: productData, error } = await getProductApi(+productId);
    if (productData && !error) {
      modifiedDefaultValues = {
        ...modifiedDefaultValues,
        item_name: [
          {
            value: productData?.data?.title,
          },
        ],
        product_description: [
          {
            value: productData?.data?.description,
          },
        ],
      };
    }
    modifiedDefaultValues = {
      ...modifiedDefaultValues,
      recommended_browse_nodes: RECOMMENDED_BROWSE_NODES,
    };

    delete modifiedDefaultValues["purchasable_offer"][0].maximum_retail_price;

    setFieldDefaultValues(modifiedDefaultValues);

    reset(modifiedDefaultValues);

    return {
      propertyData: data?.data?.properties,
      defaultValue: modifiedDefaultValues,
    };
  };

  // const getVariationThemeFields = () => {};

  const handleGetCategoryWiseProperty = async (categoryData: ICategoryData) => {
    setCategoryChangeLoader(true);
    await getProperties(categoryData);
    setCategoryChangeLoader(false);
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
      trigger().then(() => {
        if (!parent_sku || parent_sku.trim() === "") {
          setError("parent_sku", {
            type: "required",
            message: "Parent SKU is required",
          });
        }
      });
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

          let mergedData = await mergeDefaults(
            editFinalData,
            propertiesData?.defaultValue
          );

          if (editApiResponse?.productData?.variation_theme[0]?.name) {
            mergedData = {
              ...mergedData,
              variation_theme: [
                {
                  name: editApiResponse?.productData?.variation_theme[0].name,
                },
              ],
            };
          }

          if (editApiResponse?.parent_sku) {
            mergedData.parent_sku = editApiResponse?.parent_sku;
          }

          delete mergedData["purchasable_offer"][0].maximum_retail_price;

          if (editFinalData) {
            setTimeout(() => {
              setIsSaved(true);
              setIsEdit(true);
              reset(mergedData);
            }, 1000);
          }
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChildProducts = async () => {
    const { data, error } = await getAmazonChildProductsApi(+productId);
    if (!error && data) {
      setChildProducts(data?.data?.childProducts);
      setVariations(data?.data?.variations);
    }
  };

  useEffect(() => {
    getChildProducts();
  }, []);

  useEffect(() => {
    if (properties) {
      if (childProducts.length > 0) {
        const newChildProperties: any[] = [];
        childProducts.forEach(() => {
          newChildProperties.push(properties);
        });

        setChildProperties(newChildProperties);
      } else if (childProducts.length === 0) {
        const newChildProperties: any[] = [];

        variations.forEach(() => {
          newChildProperties.push(properties);
        });

        setChildProperties(newChildProperties);
      }
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

    let filterPayload = await amazonTransformData(removeNullValueFromPayload);
    filterPayload.product_type = "parent";
    filterPayload = {
      ...filterPayload,
      purchasable_offer: [
        {
          ...filterPayload["purchasable_offer"][0],
          maximum_retail_price: [
            {
              schedule: [
                {
                  value_with_tax:
                    filterPayload["purchasable_offer"][0].our_price[0]
                      .schedule[0].value_with_tax,
                },
              ],
            },
          ],
        },
      ],
    };

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
          if (childProperties.length === 0) {
            setIsDeleteModal(true);
          } else {
            setIsSaved(true);
            setTab({ type: ITab.Variation, index: 0 });
          }
          // onComplete(productId);
        }
      }
      if (childProperties.length === 0) {
        setIsDeleteModal(true);
      } else {
        setIsSaved(true);
        setTab({ type: ITab.Variation, index: 0 });
      }
      // onComplete(productId);
    }
  };

  const changeVariationTabHandler = () => {
    setTab({ type: ITab.Variation, index: Number(tab.index) + 1 });
  };

  const removeTabHandler = () => {
    const currentChildProperties = childProperties;
    currentChildProperties.pop();
    setChildProperties(currentChildProperties);
    if (tab.index === 0) {
      setTab({ type: ITab.Parent, index: null });
    } else {
      setTab({ type: ITab.Variation, index: Number(tab.index) - 1 });
    }
  };

  return (
    <div className="relative">
      {categoryLoading ||
      amazonDataLoading ||
      amazonPropertiesLoading ||
      categoryChangeLoader ? (
        <Loader loaderClass="!absolute !h-full" />
      ) : null}
      <div
        className={
          "flex items-center gap-1  border-b border-greenPrimary bg-white pt-2 px-4 overflow-x-auto whitespace-nowrap scroll-design pr-6 " +
          (isSidebarOpen
            ? "!w-[calc(100vw_-_680px)]"
            : "!w-[calc(100vw_-_480px)]")
        }
      >
        <span
          className={
            tab.type === ITab.Parent
              ? "cursor-pointer px-4 py-2 rounded-t-md bg-greenPrimary  text-white"
              : "cursor-pointer text-greenPrimary  px-4 py-2  hover: rounded-t-md hover:bg-greenPrimary  hover:text-white"
          }
          onClick={() => {
            if (tab.index !== null) {
              setWarningIndex(null);
              setIsWarningModal(true);
            }
            // setTab({ type: ITab.Parent, index: null });
          }}
        >
          Parent Product
        </span>
        {childProperties &&
          childProperties.map((_, index: number) => {
            return (
              <span
                className={
                  tab.type === ITab.Variation && tab.index === index
                    ? "cursor-pointer px-4 py-2 rounded-t-md bg-greenPrimary  text-white"
                    : "cursor-pointer text-greenPrimary  px-4 py-2  hover: rounded-t-md hover:bg-white  hover:text-blackPrimary"
                }
                onClick={() => {
                  if (index !== tab.index) {
                    setWarningIndex(index);
                    setIsWarningModal(true);
                  }
                  // if (variationThemeField) {
                  // }
                }}
                key={index}
              >
                Variation
              </span>
            );
          })}
        <span
          className="cursor-pointer text-greenPrimary  px-4 py-2 hover: rounded-t-md hover:bg-white  hover:text-blackPrimary"
          onClick={() => {
            addChildProperties();
          }}
        >
          Add Child product +
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit.bind(this, AmazonSaveType.Save))}>
        {tab.type === ITab.Parent && (
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
                    // setCategoryData(e);
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
                disabled={isEdit}
              />
              {variationThemeData && (
                <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md">
                  Choose Variation Combination
                </h2>
              )}
              <div className="py-3 px-5 border-l border-r border-b rounded-b-md mb-4">
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
                              checked={variationThemeField === e.value}
                              name="variation_theme[0].name"
                              type="radio"
                              className={` w-4 h-4 accent-greenPrimary `}
                              disabled={isEdit}
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
              <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md">
                Parent SKU
              </h2>
              <div className="py-3 px-5 border-l border-r border-b rounded-b-md mb-4">
                <Input
                  placeholder={"Enter parent sku"}
                  control={control}
                  textLabelName={"Parent SKU"}
                  name={"parent_sku"}
                  errors={errors}
                  type={"input"}
                  isDisabled={isEdit}
                />
              </div>
              {parentProperties && parentProperties.length > 0 && (
                <div>
                  <FormBuilder
                    control={control}
                    errors={errors}
                    fields={parentProperties as any}
                    watch={watch as any}
                    isEdit={isEdit}
                  />
                  <div className="flex justify-between">
                    <Button
                      showType={btnShowType.primary}
                      btnName="Save"
                      type="submit"
                      btnClass="mt-6 !text-base"
                      isLoading={saveAmazonLoading}
                    />

                    <Button
                      showType={btnShowType.primary}
                      btnName="Save and list in Amazon"
                      btnClass="mt-6 !text-base !bg-greenPrimary !text-white "
                      isLoading={listInAmazonLoading}
                      type="button"
                      onClickHandler={async () => {
                        await handleSubmit(
                          onSubmit.bind(this, AmazonSaveType.SaveInAmazon)
                        )();
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </form>

      {isDeleteModal && (
        <VariantWarningModal
          onClose={() => {
            setChildProperties([properties]);
            setTab({ type: ITab.Variation, index: 0 });
            setIsSaved(true);
            setIsDeleteModal(false);
          }}
          onSave={() => {
            onComplete(productId);
          }}
          heading="Are you sure?"
          confirmButtonText="Yes"
          subText="You want to proceed without creating a variant?"
        />
      )}

      {isWarningModal && (
        <VariantWarningModal
          onClose={() => {
            setIsWarningModal(false);
          }}
          onSave={() => {
            if (warningIndex === null) {
              setTab({ type: ITab.Parent, index: null });
            } else {
              if (isSaved) {
                setTab({ type: ITab.Variation, index: warningIndex });
              }
            }
            setIsWarningModal(false);
          }}
          heading="Are you sure?"
          subText="If you haven't saved your changes, All data will be lost."
          confirmButtonText="Yes"
        />
      )}

      {tab.type === ITab.Variation && tab.index !== null && (
        <div className="p-5 bg-white max-h-[calc(100vh_-_200px)] scroll-design overflow-y-auto">
          <AmazonVariantChildForm
            variationProperties={childProperties[tab.index]}
            validationItems={validationItems}
            fieldDefaultValues={fieldDefaultValues}
            variationThemeField={variationThemeField}
            productId={productId}
            category={category}
            onComplete={onComplete}
            childProduct={childProducts[tab.index]}
            parent_sku={parent_sku}
            variations={variations[tab.index]}
            isLast={tab.index === childProperties.length - 1 ? true : false}
            changeVariationTabHandler={changeVariationTabHandler}
            removeTabHandler={removeTabHandler}
            key={tab.index}
          />
        </div>
      )}
    </div>
  );
};
