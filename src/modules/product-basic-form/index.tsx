import Input from "@/components/form-fields/components/Input";
import SelectField from "@/components/form-fields/components/SelectField";
import TextArea from "@/components/form-fields/components/TextArea";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { ICombination, IProductBasicForm, TagOption, variantOptionType } from "./types";
import MultipleImageUpload from "@/components/form-fields/components/multipleFileField";
import { productBasisFormValidationSchema } from "./validation-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateCombinations, transformVariantProperties } from "./helper";
import {
  useProductBasicFormApi,
  useTagOptionsApi,
  useVariantPropertyOptionsApi,
} from "./services/productBasicForm.service";
import { productTypes } from "./constant";
import { ProductBasicFormProps } from "../all-product-form-wrapper/types";
import { useEditProductAPi } from "../inventory-management/services";
import { useParams } from "react-router-dom";
import { DeleteIcon } from "@/assets/Svg";
import Button from "@/components/form-fields/components/Button";

const ProductBasicForm: React.FC<ProductBasicFormProps> = ({ onComplete }) => {
  // let apiData: IProductBasicForm;
  const [productType, setProductType] = useState<string | undefined>(undefined);
  const [allOptions, setAllOptions] = useState<{ [key: string]: string[] }>({});
  const [tagsOptions, setTagsOptions] = useState<TagOption[]>([]);
  const [propertyOptions, setPropertyOptions] = useState<TagOption[]>([]);
  const [generatedCombinations, setGeneratedCombinations] = useState<variantOptionType>([]);
  const { basicFormSubmitApi } = useProductBasicFormApi();
  const { getTagOptionsApi } = useTagOptionsApi();
  const { getVariantPropertyOptionsApi } = useVariantPropertyOptionsApi();
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

  console.log("🚀 ~ errors:", errors);
  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray<IProductBasicForm, "variantProperties">({
    control,
    name: "variantProperties",
  });

  const {
    fields: combinationFields,
    append: appendCombination,
    remove: removeCombination,
  } = useFieldArray<IProductBasicForm, "combinations">({
    control,
    name: "combinations",
  });

  const propertiesValues = watch("variantProperties");

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

  const variantPropertyOptionApi = async () => {
    try {
      const { data, error } = await getVariantPropertyOptionsApi();
      if (data && !error) {
        if (productType === "VARIANT") {
          setAllOptions(data?.data?.allOptions);
          setPropertyOptions(data?.data?.propertyOptions);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProductApi = async () => {
    if (Number(productId) === 0) {
      return;
    }
    console.log(productId, "++++++++++++++++++++");
    const { data, error } = await getEditProductsDetailsAPI(productId);
    console.log("🚀 ~ handleEditProductApi ~ data:", data);
    if (data && !error) {
      return data?.data;
    }
  };

  useEffect(() => {
    handleEditProductApi().then((apiData) => {
      setProductType(apiData?.productType?.value);

      const transformedData = transformVariantProperties(apiData?.variantProperties);
      const combinations = generateCombinations(transformedData);
      setGeneratedCombinations(combinations);

      const formattedData = {
        productType: apiData.productType,
        title: apiData.title,
        description: apiData.description,
        tagOptions: apiData?.tagOptions?.map((tag: any) => ({
          label: tag.label,
          value: tag.value,
        })),
        image: apiData.image,
        price: apiData.price,
        quantity: apiData.quantity,
        sku: apiData.sku,
        variantProperties: apiData?.variantProperties?.map((prop: any) => ({
          singleSelect: {
            label: prop?.singleSelect?.label,
            value: prop?.singleSelect?.value,
          },
          multiSelect: prop?.multiSelect?.map((opt: any) => ({
            label: opt.label,
            value: opt.value,
          })),
        })),
        combinations: apiData?.combinations?.map((comb: any) => ({
          combination: comb.combination?.map((e: any) => ({
            name: e?.name,
            value: e?.value,
          })),
          price: comb.price,
          sku: comb.sku,
          quantity: comb.quantity,
        })),
      };

      reset(formattedData);
    });
  }, [reset]);

  useEffect(() => {
    tagOptionApi();
    variantPropertyOptionApi();
  }, [productType]);

  const handleProductTypeChange = (value: "NORMAL" | "VARIANT") => {
    setProductType(value);
    if (value === "NORMAL") {
      setValue("variantProperties", []);
    } else {
      setValue("variantProperties", [{ singleSelect: null, multiSelect: [] }]);
    }
  };

  // Function to handle Save Variant button click
  const handleSaveVariant = () => {
    const selectedOptions = propertiesValues?.map((item) => ({
      name: item?.singleSelect?.value,
      value: item?.multiSelect?.map((opt) => opt?.value),
    }));

    if (selectedOptions) {
      if (selectedOptions?.some((options) => options?.value?.length === 0)) {
        console.log("Please select options for all properties.");
        return;
      }

      const combinations = generateCombinations(selectedOptions);

      setGeneratedCombinations(combinations);

      // Initialize field array with combinations and additional fields
      const initialCombinationFields: ICombination[] = combinations?.map((combination) => ({
        combination,
        price: 0,
        sku: "",
        quantity: 0,
      }));

      setValue("combinations", initialCombinationFields);
    }
  };

  // Handler to add a new combination from remaining combinations
  const handleAddCombination = () => {
    const existingCombinations = watch("combinations")?.map((item) => item.combination);
    const availableCombinations = generatedCombinations.filter(
      (comb) =>
        !existingCombinations?.some(
          (existing) =>
            JSON.stringify(existing.map((e) => e.value)) ===
            JSON.stringify(comb.map((e) => e.value))
        )
    );
    if (availableCombinations.length > 0) {
      appendCombination({
        combination: availableCombinations[0], // Add the first available combination
        price: 0,
        sku: "",
        quantity: 0,
      });
    } else {
      console.log("No more combinations available to add.");
    }
  };

  const onSubmit: SubmitHandler<IProductBasicForm> = async (payload) => {
    const newPayload = { ...payload, productId: productId };
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
          Heyowl Form
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
            Heyowl Form
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
                    handleProductTypeChange(selectedOption ? selectedOption.value : "")
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

                {productType === "VARIANT" && (
                  <div>
                    {variantFields.map((item, index) => (
                      <div key={item.id} className="my-4 flex gap-4 items-center">
                        <div className=" w-full ">
                          <SelectField
                            label="Property"
                            placeholder="Select Property"
                            options={propertyOptions.filter(
                              (e) =>
                                !propertiesValues?.some(
                                  (item) => e.value === item?.singleSelect?.value
                                )
                            )}
                            name={`variantProperties.${index}.singleSelect`}
                            control={control}
                            errors={errors}
                          />
                        </div>
                        <span className="text-lg font-bold  mx-auto mt-3 ">→</span>
                        <div className=" w-full">
                          <SelectField
                            label="Options"
                            placeholder="Select Options"
                            options={(
                              allOptions[
                                watch(`variantProperties.${index}.singleSelect`)?.value || ""
                              ] || []
                            ).map((opt) => ({ label: opt, value: opt }))}
                            name={`variantProperties.${index}.multiSelect`}
                            control={control}
                            errors={errors}
                            isMulti
                          />
                        </div>
                        {variantFields.length > 1 && (
                          <button
                            type="button"
                            className="p-1 text-red-500"
                            onClick={() => removeVariant(index)}
                          >
                            <DeleteIcon className="w-6 h-6 min-w-6 mt-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <div className="flex gap-4 justify-start items-center">
                      <Button
                        btnName="Add Property"
                        type="button"
                        btnClass="p-2  text-white bg-greenPrimary !w-auto rounded-md"
                        onClickHandler={() =>
                          appendVariant({ singleSelect: null, multiSelect: [] })
                        }
                      />

                      {productType === "VARIANT" && (
                        <Button
                          btnName=" Save Variant"
                          type="button"
                          btnClass=" !w-auto p-2 border !border-black/20 bg-white !text-grayText !rounded-md   "
                          onClickHandler={handleSaveVariant}
                        />
                      )}
                    </div>
                  </div>
                )}
                {productType === "VARIANT" && generatedCombinations.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-bold text-lg">Generated Combinations:</h3>
                    {combinationFields.map((item, index) => (
                      <div key={item.id} className="flex items-start gap-2 my-2">
                        <div className="min-w-[100px] mt-9 ">
                          {item.combination.map((e) => e.value).join(", ")}
                        </div>
                        <Input
                          textLabelName="Price"
                          placeholder="Enter Price"
                          name={`combinations.${index}.price`}
                          type="number"
                          control={control}
                          errors={errors}
                        />
                        <Input
                          textLabelName="SKU"
                          placeholder="Enter SKU"
                          name={`combinations.${index}.sku`}
                          type="text"
                          control={control}
                          errors={errors}
                        />
                        <Input
                          textLabelName="Quantity"
                          placeholder="Enter Quantity"
                          name={`combinations.${index}.quantity`}
                          type="number"
                          control={control}
                          errors={errors}
                        />
                        <button
                          type="button"
                          className="p-1 text-red-500"
                          onClick={() => removeCombination(index)}
                        >
                          <DeleteIcon className="w-6 h-6 min-w-6 mt-8 " />
                        </button>
                        <Input
                          textLabelName="Price"
                          placeholder="Enter Price"
                          name={`combinations.${index}.price`}
                          type="number"
                          control={control}
                          errors={errors}
                        />
                        <Input
                          textLabelName="SKU"
                          placeholder="Enter SKU"
                          name={`combinations.${index}.sku`}
                          type="text"
                          control={control}
                          errors={errors}
                        />
                        <Input
                          textLabelName="Quantity"
                          placeholder="Enter Quantity"
                          name={`combinations.${index}.quantity`}
                          type="number"
                          control={control}
                          errors={errors}
                        />
                        <button
                          type="button"
                          className="p-1 text-red-500"
                          onClick={() => removeCombination(index)}
                        >
                          <DeleteIcon className="w-6 h-6 min-w-6 mt-8 " />
                        </button>
                      </div>
                    ))}
                    <Button
                      btnName=" Add Combination"
                      type="button"
                      btnClass=" !w-auto  p-2  text-white  rounded-md"
                      onClickHandler={handleAddCombination}
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
            btnName="Submit Form"
            type="submit"
            btnClass=" !w-auto p-2    text-white bg-green-500 rounded-md"
          />
        </section>
      </form>
    </div>
  );
};

export default ProductBasicForm;
