import FormBuilder from "@/components/form-builder";
import Button from "@/components/form-fields/components/Button";
import { btnShowType } from "@/components/form-fields/types";
import {
  AmazonSaveType,
  IAmazonVariantChildProps,
  ReferenceItem,
} from "../types";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../validations";
import { useEffect, useState } from "react";
import {
  amazonTransformData,
  appendFormData,
  cleanPayload,
  filterAmazonProperties,
  mapDataWithReference,
  mergeDefaults,
} from "../helper";
import {
  useAmazonChildFormHandleApi,
  useCreateAmazonChildProductApi,
  useDeleteAmazonChildProductApi,
} from "../services/amazonForm.service";
import { NOTIFICATION_TYPE, Type } from "@/constants";
import { MARKETPLACE } from "@/components/common/types";
import { useCreateUserNotificationInDbApi } from "@/modules/eBay-form/services/productBasicForm.service";
import { userSelector } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { selectSocket } from "@/redux/slices/socketSlice";
import Input from "@/components/form-fields/components/Input";
import MultipleImageUpload from "@/components/form-fields/components/multipleFileField";
import { ErrorModal } from "@/components/common/ErrorModal";

export const AmazonVariantChildForm = (props: IAmazonVariantChildProps) => {
  const {
    variationProperties,
    validationItems,
    fieldDefaultValues,
    variationThemeField,
    productId,
    category,
    childProduct,
    onComplete,
    parent_sku,
    variations,
    isLast,
    changeVariationTabHandler,
    removeTabHandler,
  } = props;

  const {
    control,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    setError,
  } = useForm({
    resolver: zodResolver(
      schema(validationItems?.conditions, validationItems?.properties)
    ),
  });

  const user = useSelector(userSelector);
  const socket = useSelector(selectSocket);

  const fields = useWatch({ control });
  const child_sku = watch("child_sku");
  const price = watch(
    "purchasable_offer[0].our_price[0].schedule[0].value_with_tax"
  );

  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [childProperties, setChildProperties] = useState<any[]>();

  const { amazonChildFormSubmitApi, isLoading: saveAmazonLoading } =
    useAmazonChildFormHandleApi();
  const { createAmazonChildProductApi, isLoading: listInAmazonLoading } =
    useCreateAmazonChildProductApi();
  const { createUserNotificationInDbApi } = useCreateUserNotificationInDbApi();
  const { deleteAmazonChildProductApi } = useDeleteAmazonChildProductApi();

  const getProperties = () => {
    fieldDefaultValues.variation_theme[0].name = variationThemeField;

    fieldDefaultValues.parentage_level[0].value = "child";
    fieldDefaultValues.child_parent_sku_relationship[0].child_relationship_type =
      "variation";
    fieldDefaultValues.child_parent_sku_relationship[0].parent_sku = parent_sku;

    if (variations) {
      fieldDefaultValues.fulfillment_availability[0].quantity =
        variations.quantity;
      fieldDefaultValues.fulfillment_availability[0].fulfillment_channel_code =
        "DEFAULT";
    } else {
      fieldDefaultValues.fulfillment_availability[0].quantity = undefined;
      fieldDefaultValues.fulfillment_availability[0].fulfillment_channel_code =
        undefined;
    }

    delete fieldDefaultValues["purchasable_offer"][0].maximum_retail_price;

    reset(fieldDefaultValues);

    return fieldDefaultValues;
  };

  useEffect(() => {
    getProperties();
  }, [fieldDefaultValues, variationThemeField]);

  const watchedImage = useWatch({
    control,
    name: "image",
  });

  useEffect(() => {
    if (fields) {
      trigger().then(() => {
        if (!watchedImage || watchedImage?.length === 0) {
          setError("image", {
            type: "required",
            message: "Image is required",
          });
        }
        if (watchedImage?.length > 10) {
          setError("image", {
            type: "required",
            message: "Maximum 10 images are allowed to upload",
          });
        }
        if (!child_sku || child_sku.trim() === "") {
          setError("child_sku", {
            type: "required",
            message: "Child SKU is required",
          });
        }
        if (!price) {
          setError(
            "purchasable_offer[0].our_price[0].schedule[0].value_with_tax",
            {
              type: "required",
              message: "value is required",
            }
          );
        } else if (price < 0) {
          setError(
            "purchasable_offer[0].our_price[0].schedule[0].value_with_tax",
            {
              type: "required",
              message: "value is invalid",
            }
          );
        }
      });
    }
  }, [trigger, fields]);

  const onSubmit = async (type: AmazonSaveType, payload: any) => {
    if (!watchedImage || watchedImage?.length === 0) {
      setError("image", {
        type: "required",
        message: "Image is required",
      });
      return;
    }
    if (watchedImage?.length > 10) {
      setError("image", {
        type: "required",
        message: "Only 10 Images is allowed to upload",
      });
      return;
    }
    if (!child_sku || child_sku.trim() === "") {
      setError("child_sku", {
        type: "required",
        message: "Child SKU is required",
      });
      return;
    }
    if (!price) {
      setError("purchasable_offer[0].our_price[0].schedule[0].value_with_tax", {
        type: "required",
        message: "value is required",
      });
      return;
    } else if (price < 0) {
      setError("purchasable_offer[0].our_price[0].schedule[0].value_with_tax", {
        type: "required",
        message: "value is invalid",
      });
      return;
    }

    //remove undefined and null and blank value from payload
    const removeNullValueFromPayload = cleanPayload(payload);

    //transform payload structure as per amazon product api

    let filterPayload = await amazonTransformData(removeNullValueFromPayload);
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
    payload?.image?.forEach((image: File, index: number) => {
      formData.append(`image[${index}]`, image);
    });

    appendFormData(formData, filterPayload);

    const { error: amazonFormError } = await amazonChildFormSubmitApi(
      formData,
      {
        productId,
      },
      {
        categoryId: category?.value,
      },
      {
        childId: childProduct?.id,
      },
      {
        variationId: variations?.id,
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
        const { error } = await createAmazonChildProductApi(
          Number(productId),
          child_sku
        );
        if (!error) {
          const { data, error } = await createUserNotificationInDbApi(
            notificationPayload
          );
          if (data && !error) {
            if (socket) {
              socket.emit("user_notification", user?.id);
            }
          }
          if (isLast) {
            onComplete(productId);
          } else {
            changeVariationTabHandler();
          }
        }
      }
      if (isLast) {
        onComplete(productId);
      } else {
        changeVariationTabHandler();
      }
    }
  };

  const setChildProduct = async () => {
    if (childProduct) {
      const properties = variationProperties;
      const childProductValues = childProduct?.values;
      const editFinalData = mapDataWithReference(
        childProductValues,
        properties as ReferenceItem[]
      );

      const defaultValues = getProperties();

      let mergedData = await mergeDefaults(editFinalData, defaultValues);

      // if (childProduct.values?.variation_theme[0]?.name) {
      //   mergedData = {
      //     ...mergedData,
      //     variation_theme: [
      //       { name: childProduct?.values.variation_theme[0].name },
      //     ],
      //   };
      // }
      if (childProduct.sku) {
        mergedData.child_sku = childProduct.sku;
      }
      if (childProduct.amazonVariationImages?.length > 0) {
        mergedData.image = childProduct.amazonVariationImages.map(
          (item: any) => item.url
        );
      }
      delete mergedData["purchasable_offer"][0].maximum_retail_price;

      if (editFinalData) {
        setTimeout(() => {
          reset(mergedData);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    setChildProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newChildProperties = filterAmazonProperties(variationProperties, [
      [
        "purchasable_offer",
        "maximum_retail_price",
        "schedule",
        "value_with_tax",
      ],
    ]);

    setChildProperties(newChildProperties);
  }, []);

  const deleteVariantHandler = async () => {
    if (childProduct) {
      const { error } = await deleteAmazonChildProductApi(
        +productId,
        +childProduct?.id
      );
      if (!error) {
        removeTabHandler();
      }
    } else {
      removeTabHandler();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit.bind(this, AmazonSaveType.Save))}>
      <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md">
        Child SKU
      </h2>
      <div className="py-3 px-5 border-l border-r border-b rounded-b-md mb-4">
        <Input
          placeholder={"Enter child sku"}
          control={control}
          textLabelName={"Child SKU"}
          name={"child_sku"}
          errors={errors}
          type={"input"}
        />
      </div>
      <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md">
        Variation Image
      </h2>
      <div className="py-3 px-5 border-l border-r border-b rounded-b-md col-span-12 relative mb-4">
        <MultipleImageUpload
          name="image"
          control={control}
          setError={setError}
          // clearErrors={clearErrors}
          errors={errors}
          maxSize={8}
          allowedFormat={["image/png", "image/jpeg"]}
          setValue={setValue}
          watch={watch}
          className=""
        />
      </div>
      {childProperties && childProperties.length > 0 && (
        <div>
          <FormBuilder
            control={control}
            errors={errors}
            fields={childProperties as any}
            watch={watch as any}
          />

          <div className="flex justify-between gap-[10px]">
            <Button
              showType={btnShowType.primary}
              btnName="Save"
              type="submit"
              btnClass="mt-6 !text-base"
              isLoading={saveAmazonLoading}
            />

            <Button
              showType={btnShowType.primary}
              btnName="Delete Variant"
              type="button"
              btnClass="mt-6 !text-base !bg-redAlert !text-white"
              onClickHandler={() => {
                setIsDeleteModal(true);
              }}
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
      {isDeleteModal && (
        <ErrorModal
          onClose={() => {
            setIsDeleteModal(false);
          }}
          onSave={deleteVariantHandler}
          heading="Are you sure?"
          subText="This will delete this variant and all your changes will be lost."
        />
      )}
    </form>
  );
};
