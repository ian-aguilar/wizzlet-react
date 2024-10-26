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
  mapDataWithReference,
  mergeDefaults,
} from "../helper";
import {
  useAmazonChildFormHandleApi,
  useCreateAmazonProductApi,
} from "../services/amazonForm.service";
import { useParams } from "react-router-dom";
import { NOTIFICATION_TYPE, Type } from "@/constants";
import { MARKETPLACE } from "@/components/common/types";
import { useCreateUserNotificationInDbApi } from "@/modules/eBay-form/services/productBasicForm.service";
import { userSelector } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { selectSocket } from "@/redux/slices/socketSlice";
import Input from "@/components/form-fields/components/Input";

export const AmazonVariantChildForm = (props: IAmazonVariantChildProps) => {
  const {
    variationProperties,
    validationItems,
    fieldDefaultValues,
    variationThemeField,
    productId,
    category,
    childProduct,
    parent_sku,
    onComplete,
  } = props;

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

  const user = useSelector(userSelector);
  const socket = useSelector(selectSocket);

  const fields = useWatch({ control });

  const { amazonChildFormSubmitApi } = useAmazonChildFormHandleApi();
  const { createAmazonProductApi } = useCreateAmazonProductApi();
  const { createUserNotificationInDbApi } = useCreateUserNotificationInDbApi();

  const getProperties = () => {
    fieldDefaultValues.variation_theme[0].name = variationThemeField;

    fieldDefaultValues.parentage_level[0].value = "child";
    fieldDefaultValues.child_parent_sku_relationship[0].child_relationship_type =
      "variation";
    fieldDefaultValues.child_parent_sku_relationship[0].parent_sku =
      childProduct?.product?.sku;

    reset(fieldDefaultValues);

    return fieldDefaultValues;
  };

  console.log(childProduct?.product?.sku, "?????//s");

  useEffect(() => {
    getProperties();
  }, [fieldDefaultValues, variationThemeField]);

  useEffect(() => {
    if (fields) {
      trigger();
    }
  }, [trigger, fields]);

  const onSubmit = async (type: AmazonSaveType, payload: any) => {
    //remove undefined and null and blank value from payload
    const removeNullValueFromPayload = cleanPayload(payload);

    //transform payload structure as per amazon product api

    const filterPayload = await amazonTransformData(removeNullValueFromPayload);

    //payload append into a formData
    const formData = new FormData();
    appendFormData(formData, filterPayload);

    const { error: amazonFormError } = await amazonChildFormSubmitApi(
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

  return (
    <form onSubmit={handleSubmit(onSubmit.bind(this, AmazonSaveType.Save))}>
      <Input
        placeholder={"Enter child sku"}
        control={control}
        textLabelName={"Child SKU"}
        name={"child_sku"}
        errors={errors}
        type={"input"}
      />
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
                await handleSubmit(
                  onSubmit.bind(this, AmazonSaveType.SaveInAmazon)
                )();
                // setListInAmazonLoading(false);
              }}
            />
          </div>
        </div>
      )}
    </form>
  );
};
