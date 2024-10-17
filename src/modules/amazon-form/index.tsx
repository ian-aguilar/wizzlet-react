import { useEffect, useState } from "react";
import {
  useAmazonEditProductValuesApi,
  useAmazonFormHandleApi,
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
import { MARKETPLACEID } from "@/components/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./validations";

const AmazonForm: React.FC<ProductBasicFormSingleProps> = ({ onComplete }) => {
  const { productId } = useParams();

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

  useEffect(() => {
    if (fields) {
      trigger();
    }
  }, [fields]);

  console.log(errors, "Errors <<<<<");

  const { getAllAmazonPropertiesApi } = useGetAllAmazonPropertiesApi();
  const { amazonFormSubmitApi } = useAmazonFormHandleApi();
  const { editAmazonProductValueApi } = useAmazonEditProductValuesApi();
  const { getCategoriesAPI, isLoading: categoryLoading } =
    useGetCategoriesAPI();

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
    reset(defaultValues);
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

  const onSubmit = async (payload: any) => {
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

  return (
    <div className="relative">
      {categoryLoading ? <Loader loaderClass="!absolute" /> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
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

              <Button
                showType={btnShowType.primary}
                btnName="Save"
                type="submit"
                btnClass="mt-6 !text-base"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AmazonForm;
