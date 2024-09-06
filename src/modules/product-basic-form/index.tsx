import Input from "@/components/form-fields/components/Input";
import SelectField from "@/components/form-fields/components/SelectField";
import TextArea from "@/components/form-fields/components/TextArea";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { ICombination, IProductBasicForm, variantOptionType } from "./types";
import MultipleImageUpload from "@/components/form-fields/components/multipleFileField";
import { productBasisFormValidationSchema } from "./validation-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateCombinations } from "./helper";
import { useProductBasicFormApi } from "./services/productBasicForm.service";

const ProductBasicForm: React.FC = () => {
  const [productType, setProductType] = useState<string | undefined>(undefined);
  const [allOptions, setAllOptions] = useState<{ [key: string]: string[] }>({
    color: ["Red", "Blue", "Green"],
    size: ["S", "M", "L", "XL"],
  });
  const [generatedCombinations, setGeneratedCombinations] =
    useState<variantOptionType>([]);
  const { basicFormSubmitApi } = useProductBasicFormApi();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
  } = useForm<IProductBasicForm>({
    resolver: yupResolver(productBasisFormValidationSchema),
    defaultValues: {
      productType: null,
    },
  });

  console.log(errors, "errors");

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

  const options = [
    { label: "Normal", value: "normal" },
    { label: "Variant", value: "variant" },
  ];

  const propertyOptions = [
    { label: "Color", value: "color" },
    { label: "Size", value: "size" },
  ];

  const tagsOptions = [
    { label: "Abc", value: "abc" },
    { label: "Xys", value: "xyz" },
    { label: "Def", value: "def" },
  ];

  useEffect(() => {
    if (productType === "variant") {
      setAllOptions({
        color: ["Red", "Blue", "Green"],
        size: ["S", "M", "L", "XL"],
      });
    }
  }, [productType]);

  const handleProductTypeChange = (value: "normal" | "variant") => {
    setProductType(value);

    if (value === "normal") {
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
      const initialCombinationFields: ICombination[] = combinations?.map(
        (combination) => ({
          combination,
          price: 0,
          sku: "",
          quantity: 0,
        })
      );

      setValue("combinations", initialCombinationFields);
    }
  };

  // Handler to add a new combination from remaining combinations
  const handleAddCombination = () => {
    const existingCombinations = watch("combinations")?.map(
      (item) => item.combination
    );
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
    console.log("Form Data:", payload);

    const formData = new FormData();
    formData.append("productType", JSON.stringify(payload?.productType));
    formData.append("combinations", JSON.stringify(payload?.combinations));
    formData.append(
      "variantProperties",
      JSON.stringify(payload?.variantProperties)
    );
    formData.append("price", JSON.stringify(payload?.price));
    formData.append("quantity", JSON.stringify(payload?.quantity));
    formData.append("sku", JSON.stringify(payload?.sku));
    formData.append("tagOptions", JSON.stringify(payload?.tagOptions));
    formData.append("image", payload.image[0]);
    formData.append("description", JSON.stringify(payload?.description));
    formData.append("title", JSON.stringify(payload?.title));
    const { data } = await basicFormSubmitApi(payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data, "================");
  };

  return (
    <section className="block lg:flex gap-5 items-start">
      <div className="w-[335px] min-w-[335px] bg-white rounded-md border-greyBorder p-8 lg:mb-0 mb-5 ">
        <div className="stepperInventory pl-5">
          <div className="step1 relative ">
            <div className="absolute -left-[23px] -top-3 border-8 rounded-full border-greenPrimary/20   ">
              <div className="  w-7 h-7 min-w-7 bg-greenPrimary rounded-full  flex justify-center items-center text-white ">
                1
              </div>
            </div>
            <div className="border-l border-dashed border-greenPrimary pl-10 min-h-[70px]">
              <h3 className="font-medium text-xl">Heyowl Form</h3>
              <p className="text-grayText text-sm font-medium ">
                Fill Heyowl form details.
              </p>
            </div>
          </div>
          <div className="step1 relative ">
            <div className="absolute -left-[23px] -top-0 border-8 rounded-full border-grayText/20   ">
              <div className="  w-7 h-7 min-w-7 bg-gray-400 rounded-full  flex justify-center items-center text-white ">
                2
              </div>
            </div>
            <div className="border-l border-dashed border-grayText/20 pl-10 min-h-[85px]">
              <h3 className="font-medium text-xl">Choose Marketplace</h3>
              <p className="text-grayText text-sm font-medium ">
                Select Marketplace
              </p>
            </div>
          </div>
          <div className="step1 relative ">
            <div className="absolute -left-[23px] -top-0 border-8 rounded-full border-grayText/20   ">
              <div className="  w-7 h-7 min-w-7 bg-gray-400 rounded-full  flex justify-center items-center text-white ">
                3
              </div>
            </div>
            <div className=" pl-10  ">
              <h3 className="font-medium text-xl">Marketplace Form</h3>
              <p className="text-grayText text-sm font-medium ">
                Fill Marketplace form details.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-7 bg-white w-full rounded-md h-[calc(100vh_-_460px)]  lg:h-[calc(100vh_-_180px)]  overflow-y-auto scroll-design ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md">
              Heyowl Form
            </h2>
            <div className="border-l border-r border-b mb-6 rounded-b-md">
              <div className="grid grid-cols-12 w-full gap-4 p-4">
                <div className="col-span-6 relative">
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
                  />
                </div>
                <div className="col-span-6">
                  <SelectField
                    label="Product Type"
                    options={options}
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
                    label="Tags"
                    placeholder="Select Tags"
                    options={tagsOptions}
                    name="tagOptions"
                    control={control}
                    errors={errors}
                    isMulti
                  />
                  {productType !== "variant" && (
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

                  {productType === "variant" && (
                    <div>
                      {variantFields.map((item, index) => (
                        <div key={item.id} className="my-4">
                          <SelectField
                            label="Property"
                            placeholder="Select Property"
                            options={propertyOptions.filter(
                              (e) =>
                                !propertiesValues?.some(
                                  (item) =>
                                    e.value === item?.singleSelect?.value
                                )
                            )}
                            name={`variantProperties.${index}.singleSelect`}
                            control={control}
                            errors={errors}
                          />
                          <span className="text-lg font-bold">→</span>
                          <SelectField
                            label="Options"
                            placeholder="Select Options"
                            options={(
                              allOptions[
                                watch(`variantProperties.${index}.singleSelect`)
                                  ?.value || ""
                              ] || []
                            ).map((opt) => ({ label: opt, value: opt }))}
                            name={`variantProperties.${index}.multiSelect`}
                            control={control}
                            errors={errors}
                            isMulti
                          />
                          {variantFields.length > 1 && (
                            <button
                              type="button"
                              className="p-1 text-red-500"
                              onClick={() => removeVariant(index)}>
                              Remove
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        className="p-2 my-4 text-white bg-greenPrimary rounded-md"
                        onClick={() =>
                          appendVariant({ singleSelect: null, multiSelect: [] })
                        }>
                        Add Property
                      </button>
                      {productType === "variant" && (
                        <button
                          type="button"
                          className="p-2 mt-4 text-white bg-blue-500 rounded-md"
                          onClick={handleSaveVariant}>
                          Save Variant
                        </button>
                      )}
                    </div>
                  )}
                  {productType === "variant" &&
                    generatedCombinations.length > 0 && (
                      <div>
                        <h3 className="font-bold text-lg">
                          Generated Combinations:
                        </h3>
                        {combinationFields.map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-2 my-2">
                            <div>
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
                              onClick={() => removeCombination(index)}>
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="p-2 my-4 text-white bg-blue-500 rounded-md"
                          onClick={handleAddCombination}>
                          Add Combination
                        </button>
                      </div>
                    )}
                </div>
              </div>
            </div>

            {errors?.combinations?.type === "min" ? (
              <span className="errorText text-red-600 font-medium text-sm">
                Please save the variant and create at least one combination
              </span>
            ) : null}

            <button
              type="submit"
              className="p-2 mt-4 text-white bg-green-500 rounded-md">
              Submit Form
            </button>
          </section>
        </form>
      </div>
    </section>
  );
};

export default ProductBasicForm;
