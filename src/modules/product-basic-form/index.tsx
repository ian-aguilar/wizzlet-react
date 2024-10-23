import Input from "@/components/form-fields/components/Input";
import SelectField from "@/components/form-fields/components/SelectField";
import TextArea from "@/components/form-fields/components/TextArea";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ICombination,
  IProductBasicForm,
  TagOption,
  VariantProperty,
} from "./types";
import MultipleImageUpload from "@/components/form-fields/components/multipleFileField";
import { productBasisFormValidationSchema } from "./validation-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useProductBasicFormApi,
  useTagOptionsApi,
} from "./services/productBasicForm.service";
import { ProductBasicFormSingleProps } from "../all-product-form-wrapper/types";
import { useEditProductAPi } from "../inventory-management/services";
import { useParams } from "react-router-dom";
import Button from "@/components/form-fields/components/Button";
import { INameOption, IOption } from "../inventory-management/types";
import { productTypes } from "./constant";

const ProductBasicForm: React.FC<ProductBasicFormSingleProps> = ({
  onComplete,
}) => {
  const [productType, setProductType] = useState<string | undefined>(undefined);
  const [tagsOptions, setTagsOptions] = useState<TagOption[]>([]);
  const { basicFormSubmitApi } = useProductBasicFormApi();
  const { getTagOptionsApi } = useTagOptionsApi();
  const { getEditProductsDetailsAPI } = useEditProductAPi();
  const { productId } = useParams();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    reset,
  } = useForm<IProductBasicForm>({
    resolver: yupResolver(productBasisFormValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      productType: "",
      tagOptions: [],
      image: null,
      price: undefined,
      quantity: undefined,
      sku: "",
      variantProperties: undefined,
      combinations: undefined,
    },
  });

  const tagOptionApi = async () => {
    try {
      const { data, error } = await getTagOptionsApi();
      if (data && !error) {
        setTagsOptions(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProductApi = async () => {
    if (Number(productId) === 0) {
      return;
    }
    const { data, error } = await getEditProductsDetailsAPI(productId);
    if (data && !error) {
      return data?.data;
    }
  };

  useEffect(() => {
    handleEditProductApi().then((apiData) => {
      setProductType(apiData?.productType?.value);

      const formattedData = {
        productType: apiData?.productType,
        title: apiData?.title,
        description: apiData?.description,
        tagOptions: apiData?.tagOptions?.map((tag: IOption) => ({
          label: tag.label,
          value: tag.value,
        })),
        image: apiData?.image,
        price: apiData?.price,
        quantity: apiData?.quantity,
        sku: apiData?.sku,
        variantProperties: apiData?.variantProperties?.map(
          (prop: VariantProperty) => ({
            singleSelect: {
              label: prop?.singleSelect?.label,
              value: prop?.singleSelect?.value,
            },
            multiSelect: prop?.multiSelect?.map((opt: IOption) => ({
              label: opt.label,
              value: opt.value,
            })),
          })
        ),
        combinations: apiData?.combinations?.map((comb: ICombination) => ({
          combination: comb?.combination?.map((e: INameOption) => ({
            name: e?.name,
            value: e?.value,
          })),
          price: comb?.price,
          sku: comb?.sku,
          quantity: comb?.quantity,
        })),
      };

      reset(formattedData);
    });
  }, [reset]);

  useEffect(() => {
    tagOptionApi();
  }, []);

  const handleProductTypeChange = (value: "NORMAL" | "VARIANT") => {
    setProductType(value);
    if (value === "NORMAL") {
      setValue("variantProperties", []);
    } else {
      setValue("variantProperties", [{ singleSelect: null, multiSelect: [] }]);
    }
  };

  const onSubmit: SubmitHandler<IProductBasicForm> = async (payload) => {
    const newPayload = {
      ...payload,
      productId: productId,
    };

    const {
      data: {
        data: { productId: createProductId },
      },
    } = await basicFormSubmitApi(newPayload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (createProductId) {
      onComplete(createProductId);
    }
  };

  return (
    <div className="p-7 bg-white w-full rounded-md h-[calc(100vh_-_460px)]  lg:h-[calc(100vh_-_180px)]  overflow-y-auto scroll-design ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-semibold text-[26px] pb-2 mb-4 border-b border-b-black/20">
          Hayowl Form
        </h3>
        <div className="text-lg font-medium text-blackPrimary">Item Photos</div>
        <div className="col-span-12 relative">
          <MultipleImageUpload
            name="image"
            control={control}
            setError={setError}
            clearErrors={clearErrors}
            errors={errors}
            maxSize={8}
            allowedFormat={["image/png", "image/jpeg"]}
            setValue={setValue}
            watch={watch}
            className=""
          />
        </div>
        <section className="pt-4">
          <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md">
            Hayowl Form
          </h2>
          <div className="border-l border-r border-b mb-2 rounded-b-md">
            <div className="grid grid-cols-12 w-full p-4">
              <div className="col-span-12   ">
                <SelectField
                  className="mb-3"
                  label="Product Type"
                  options={productTypes}
                  name="productType"
                  control={control}
                  errors={errors}
                  onChange={(selectedOption) =>
                    handleProductTypeChange(
                      selectedOption ? selectedOption.value : ""
                    )
                  }
                />
                <Input
                  textLabelName="Title"
                  placeholder="Enter Title"
                  name="title"
                  type="text"
                  control={control}
                  errors={errors}
                />
                <TextArea
                  textLabelName="Description"
                  placeholder="Enter Description"
                  name="description"
                  type="text"
                  control={control}
                  errors={errors}
                />
                <SelectField
                  className="mb-3"
                  label="Tags"
                  placeholder="Select Tags"
                  options={tagsOptions}
                  name="tagOptions"
                  control={control}
                  errors={errors}
                  isMulti
                />
                {productType !== "VARIANT" && (
                  <div>
                    <Input
                      textLabelName="SKU"
                      placeholder="Enter SKU"
                      name="sku"
                      type="text"
                      control={control}
                      errors={errors}
                    />
                    <Input
                      textLabelName="Quantity"
                      placeholder="Enter Quantity"
                      name="quantity"
                      type="number"
                      control={control}
                      errors={errors}
                    />
                    <Input
                      textLabelName="Price"
                      placeholder="Enter Price"
                      name="price"
                      type="number"
                      control={control}
                      errors={errors}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {errors?.combinations?.type === "min" ? (
            <div className="errorText text-red-600 font-medium text-sm">
              Please save the variant and create at least one combination
            </div>
          ) : null}

          <Button
            btnName="Save & Next"
            type="submit"
            btnClass=" !w-auto p-2    text-white bg-green-500 rounded-md"
          />
        </section>
      </form>
    </div>
  );
};

export default ProductBasicForm;
