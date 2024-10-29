import AsyncSelectField from "@/modules/inventory-management/components/AsyncSelectField";
import { AmazonSaveType, DefaultProperties, IAmazonForm } from "../types";
import { useEffect, useState } from "react";
import FormBuilder from "@/components/form-builder";
import {
  amazonTransformData,
  appendFormData,
  cleanPayload,
  filterAmazonProperties,
  mapDataWithReference,
  mergeDefaults,
} from "../helper";
import {
  useAmazonEditProductValuesApi,
  useAmazonFormHandleApi,
  useCreateAmazonProductApi,
  useGetAllAmazonPropertiesApi,
  useGetProductApi,
} from "../services/amazonForm.service";
import Button from "@/components/form-fields/components/Button";
import { btnShowType } from "@/components/form-fields/types";
import { FieldsType, IValidationItem } from "@/components/form-builder/types";
import { Option } from "@/modules/inventory-management/types";
import { getAppendField } from "@/components/form-builder/helper";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../validations";
import { useGetCategoriesAPI } from "@/modules/inventory-management/services";
import { MARKETPLACE, MARKETPLACEID } from "@/components/common/types";
import { RECOMMENDED_BROWSE_NODES } from "../constants";
import { userSelector } from "@/redux/slices/userSlice";
import { selectSocket } from "@/redux/slices/socketSlice";
import { useSelector } from "react-redux";
import { NOTIFICATION_TYPE, Type } from "@/constants";
import { useCreateUserNotificationInDbApi } from "@/modules/eBay-form/services/productBasicForm.service";
import { Loader } from "@/components/common/Loader";

export const AmazonNormalForm = (props: IAmazonForm) => {
  const { onComplete, productId } = props;

  const [listInAmazonLoading, setListInAmazonLoading] = useState(false);
  const [properties, setProperties] = useState<FieldsType<any>[]>();
  const [category, setCategory] = useState<Option | null>(null);
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

  const fields = useWatch({ control });

  const user = useSelector(userSelector);
  const socket = useSelector(selectSocket);

  const { amazonFormSubmitApi } = useAmazonFormHandleApi();
  const { createAmazonProductApi } = useCreateAmazonProductApi();
  const { getAllAmazonPropertiesApi } = useGetAllAmazonPropertiesApi();
  const { editAmazonProductValueApi } = useAmazonEditProductValuesApi();
  const { getCategoriesAPI, isLoading: categoryLoading } =
    useGetCategoriesAPI();
  const { createUserNotificationInDbApi } = useCreateUserNotificationInDbApi();
  const { getProductApi } = useGetProductApi();

  const [categoryChangeLoader, setCategoryChangeLoader] =
    useState<boolean>(false);

  const getProperties = async (categoryData: {
    value: number;
    label: string;
  }) => {
    if (!categoryData?.value) {
      return;
    }
    const { data } = await getAllAmazonPropertiesApi(categoryData?.value);
    setCategory(categoryData);
    const newProperties = filterAmazonProperties(data?.data?.properties, [
      ...DefaultProperties,
      ["purchasable_offer", "our_price", "schedule", "value_with_tax"],
      ["item_name"],
      ["product_description"],
      ["fulfillment_availability", "quantity"],
    ]);
    setProperties(newProperties);
    setValidationItems(data?.data?.validationItems);
    const defaultValues = getAppendField(data?.data?.properties);

    const { data: productData, error } = await getProductApi(+productId);
    let modifiedDefaultValues = defaultValues;
    if (data && !error) {
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
        purchasable_offer: [
          {
            ...modifiedDefaultValues["purchasable_offer"][0],
            our_price: [
              {
                schedule: [
                  {
                    value_with_tax: productData?.data?.price,
                  },
                ],
              },
            ],
          },
        ],
        fulfillment_availability: [
          {
            ...modifiedDefaultValues["fulfillment_availability"][0],
            quantity: productData?.data?.quantity,
          },
        ],
      };
    }

    modifiedDefaultValues = {
      ...modifiedDefaultValues,
      recommended_browse_nodes: RECOMMENDED_BROWSE_NODES,
    };
    reset(modifiedDefaultValues);
    return {
      propertyData: data?.data?.properties,
      defaultValue: defaultValues,
    };
  };

  useEffect(() => {
    getCategories("", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fields) {
      trigger();
    }
  }, [fields]);

  const handleGetCategoryWiseProperty = async (event: {
    value: number;
    label: string;
  }) => {
    setCategoryChangeLoader(true);
    await getProperties(event);
    setCategoryChangeLoader(false);
  };

  const handleAmazonEditApiResponse = async () => {
    if (Number(productId) === 0) {
      return;
    }
    const { data, error } = await editAmazonProductValueApi(productId);

    if (!error && data?.data) {
      return data?.data;
    }
  };

  // ** Categories fetch **
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

  const onSubmit = async (type: AmazonSaveType, payload: any) => {
    // console.log("🚀 ~ AmazonForm ~ payload:", payload);

    //remove undefined and null and blank value from payload
    const removeNullValueFromPayload = cleanPayload(payload);

    //transform payload structure as per amazon product api

    const filterPayload = await amazonTransformData(removeNullValueFromPayload);
    //payload append into a formData
    const formData = new FormData();
    appendFormData(formData, filterPayload);

    if (productId) {
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
          } else {
            return;
          }
        }
        onComplete(productId);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit.bind(this, AmazonSaveType.Save))}>
      {categoryLoading || categoryChangeLoader ? (
        <Loader loaderClass="!absolute !h-full" />
      ) : null}
      <div className="p-5 bg-white max-h-[calc(100vh_-_180px)] scroll-design overflow-y-auto ">
        <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md">
          Choose Product Category
        </h2>
        <div className="py-3 px-5 border-l border-r border-b rounded-b-md mb-4">
          <AsyncSelectField
            name="amazonProductCategory"
            serveSideSearch={true}
            getOnChange={(e) => {
              if (e) {
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
        </div>
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
                isLoading={listInAmazonLoading}
                type="button"
                onClickHandler={async () => {
                  setListInAmazonLoading(true);
                  await handleSubmit(
                    onSubmit.bind(this, AmazonSaveType.SaveInAmazon)
                  )();
                  setListInAmazonLoading(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};
