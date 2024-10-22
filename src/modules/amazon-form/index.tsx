import { useEffect, useState } from "react";
import {
  useAmazonEditProductValuesApi,
  useAmazonFormHandleApi,
  useCreateAmazonProductApi,
  useGetAllAmazonPropertiesApi,
} from "./services/amazonForm.service";
import { FieldsType, IValidationItem } from "@/components/form-builder/types";
import { useForm, useWatch } from "react-hook-form";
import FormBuilder from "@/components/form-builder";
import { getAppendField } from "@/components/form-builder/helper";
import Button from "@/components/form-fields/components/Button";
import { btnShowType } from "@/components/form-fields/types";
import {
  amazonTransformData,
  appendFormData,
  cleanPayload,
  mapDataWithReference,
  mergeDefaults,
} from "./helper";
import { useParams } from "react-router-dom";
import { ProductBasicFormSingleProps } from "../all-product-form-wrapper/types";
import { Loader } from "@/components/common/Loader";
import AsyncSelectField from "../inventory-management/components/AsyncSelectField";
import { Option } from "../settings/types/label";
import { useGetCategoriesAPI } from "../inventory-management/services";
import { MARKETPLACE, MARKETPLACEID } from "@/components/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./validations";
import { NOTIFICATION_TYPE, Type } from "@/constants";
import { useCreateUserNotificationInDbApi } from "../eBay-form/services/productBasicForm.service";
import { useSelector } from "react-redux";
import { userSelector } from "@/redux/slices/userSlice";
import { selectSocket } from "@/redux/slices/socketSlice";
import { AmazonSaveType } from "./types";
import { RECOMMENDED_BROWSE_NODES } from "./constants";

const AmazonForm: React.FC<ProductBasicFormSingleProps> = ({ onComplete }) => {
  const { productId } = useParams();

  const user = useSelector(userSelector);
  const socket = useSelector(selectSocket);

  const [properties, setProperties] = useState<FieldsType<any>[]>();
  const [category, setCategory] = useState<Option | null>(null);
  const [validationItems, setValidationItems] = useState<IValidationItem>();
  const [listInAmazonLoading, setListInAmazonLoading] = useState(false);

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

  useEffect(() => {
    if (fields) {
      trigger();
    }
  }, [fields]);

  const { getAllAmazonPropertiesApi, isLoading: amazonPropertiesLoading } =
    useGetAllAmazonPropertiesApi();
  const { amazonFormSubmitApi } = useAmazonFormHandleApi();
  const { editAmazonProductValueApi, isLoading: amazonDataLoading } =
    useAmazonEditProductValuesApi();
  const { createUserNotificationInDbApi } = useCreateUserNotificationInDbApi();

  const { getCategoriesAPI, isLoading: categoryLoading } =
    useGetCategoriesAPI();

  const { createAmazonProductApi } = useCreateAmazonProductApi();

  const getProperties = async (categoryData: {
    value: number;
    label: string;
  }) => {
    if (!categoryData?.value) {
      return;
    }
    // const { data } = await getAllAmazonPropertiesApi(17104);
    const { data } = await getAllAmazonPropertiesApi(categoryData?.value);
    setCategory(categoryData);
    setProperties(data?.data?.properties);
    setValidationItems(data?.data?.validationItems);
    const defaultValues = getAppendField(data?.data?.properties);
    const modifiedDefaultValues = {
      ...defaultValues,
      recommended_browse_nodes: RECOMMENDED_BROWSE_NODES,
    };
    reset(modifiedDefaultValues);
    return {
      propertyData: data?.data?.properties,
      defaultValue: defaultValues,
    };
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

  const onSubmit = async (type: AmazonSaveType, payload: any) => {
    console.log("🚀 ~ AmazonForm ~ payload:", payload);

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
          }
        }
        onComplete(productId);
      }
    } else {
      console.log("Product ID Missing");
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

  //for edit purpose
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

  useEffect(() => {
    getCategories("", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetCategoryViseProperty = (event: {
    value: number;
    label: string;
  }) => {
    getProperties(event);
  };

  if (amazonDataLoading || amazonPropertiesLoading) {
    return <Loader />;
  }

  return (
    <div className="relative">
      {categoryLoading ? <Loader loaderClass="!absolute" /> : null}
      <form onSubmit={handleSubmit(onSubmit.bind(this, AmazonSaveType.Save))}>
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
                  handleGetCategoryViseProperty(e);
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
    </div>
  );
};

export default AmazonForm;
