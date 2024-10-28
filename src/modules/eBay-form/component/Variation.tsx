import MultipleImageUpload from "@/components/form-fields/components/multipleFileField";
import SelectField from "@/components/form-fields/components/SelectField";
import { VariantProperty } from "@/modules/product-basic-form/types";
import React, { useEffect, useState } from "react";
import {
  Combination,
  ICombination,
  SelectOption,
  VariantImageProps,
} from "../types";
import Button from "@/components/form-fields/components/Button";
import { DeleteIcon } from "@/assets/Svg";
import { useFieldArray } from "react-hook-form";
import { generateCombinations } from "../helper";
import Input from "@/components/form-fields/components/Input";

const Variation: React.FC<VariantImageProps> = ({
  control,
  errors,
  setError,
  clearErrors,
  setValue,
  amazonVariantData,
  watch,
  categoriesId,
  propertyOptions,
  allPropertyOptions,
  allOptions,
  setPropertiesState,
  setGeneratedCombinations,
  generatedCombinations,
}) => {
  //** STATE **//
  const [imageIndex, setImageIndex] = useState(0);
  const [amazonVariationOption, setAmazonVariationOption] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    const options = amazonVariantData?.map((item) => ({
      label: item.name,
      value: item.amazonVariantId,
    }));
    setAmazonVariationOption(options);
  }, [amazonVariantData]);

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray<any, "variantProperties">({
    control,
    name: "variantProperties",
  });
  const propertiesValues = watch("variantProperties");

  const {
    fields: combinationFields,
    append: appendCombination,
    remove: removeCombination,
  } = useFieldArray<any, "combinations">({
    control,
    name: "combinations",
  });
  const combinations = watch("combinations");

  const variantImage = watch("variantimage");

  const handlePropertyOnChange = (index: number) => {
    if (propertiesValues[index].multiSelect) {
      propertiesValues[index].multiSelect = [];
    }
    setValue("variantProperties", propertiesValues);
    setValue("combinations", []);

    const selectedOptions = propertiesValues?.map(
      (item: {
        singleSelect: { value: string };
        multiSelect: SelectOption[];
      }) => ({
        name: item?.singleSelect?.value,
        value: item?.multiSelect?.map((opt: { value: string }) => opt?.value),
      })
    );

    const filteredData = allPropertyOptions?.filter(
      (item) =>
        !selectedOptions.some(
          (secondItem: { name: string }) => secondItem.name === item.name
        )
    );

    setPropertiesState((prevState: any) => ({
      ...prevState,
      categorized: filteredData || [],
    }));
  };

  const handleOptionOnChange = () => {
    setValue("combinations", []);
    setImageIndex(0);
    setGeneratedCombinations([]);
  };

  // Function to handle Save Variant button click
  const handleSaveVariant = () => {
    const selectedOptions = propertiesValues?.map(
      (item: {
        singleSelect: { value: string };
        multiSelect: SelectOption[];
      }) => ({
        name: item?.singleSelect?.value,
        value: item?.multiSelect?.map((opt: { value: string }) => opt?.value),
      })
    );

    if (selectedOptions) {
      if (
        selectedOptions?.some(
          (options: { value: string }) => options?.value?.length === 0
        )
      ) {
        console.log("Please select options for all properties.");
        return;
      }

      const combinations = generateCombinations(selectedOptions);

      setGeneratedCombinations(combinations);

      // Initialize field array with combinations and additional fields
      const initialCombinationFields = combinations?.map(
        (combination: Combination[], index: number) => ({
          combination,
          price: 0,
          sku: "",
          quantity: getQuantityByVariantId(amazonVariationOption[index]?.value),
          amazonVariant: amazonVariationOption[index],
        })
      );

      setValue("combinations", initialCombinationFields);
    }
  };

  const getQuantityByVariantId = (variantId: number): number | undefined => {
    const item = amazonVariantData.find(
      ({ amazonVariantId }) => amazonVariantId === variantId
    );
    return item ? item.quantity : 0;
  };

  const handleAddCombination = () => {
    const existingCombinations = watch("combinations")?.map(
      (item: {
        combination: Array<{
          name: string;
          value: string;
        }>;
      }) => item.combination
    );
    const availableCombinations = generatedCombinations.filter(
      (comb) =>
        !existingCombinations?.some(
          (
            existing: Array<{
              name: string;
              value: string;
            }>
          ) =>
            JSON.stringify(existing.map((e: { value: string }) => e.value)) ===
            JSON.stringify(comb.map((e) => e.value))
        )
    );
    if (availableCombinations.length > 0) {
      appendCombination({
        combination: availableCombinations[0], // Add the first available combination
        price: 0,
        sku: "",
        quantity: 0,
        amazonVariant: [],
      });
    } else {
      console.log("No more combinations available to add.");
    }
  };

  const handleOptionChange = (option: string) => {
    const result = propertiesValues.find(
      (item: VariantProperty) => item.singleSelect.value === option
    );
    if (result) {
      setValue("variantimage", {
        property: option || "",
        data: result.multiSelect.map((e: any) => ({
          value: e.value,
          images: [],
        })),
      });
    }
  };

  const handleAmazonVariantChange = (selectedValue: string, index: number) => {
    const selectedOption = amazonVariantData.find(
      (item) => item.amazonVariantId === Number(selectedValue)
    );
    if (selectedOption) {
      setValue(`combinations.${index}.quantity`, selectedOption.quantity);
    }
  };

  return (
    <>
      {categoriesId !== 0 && (
        <div>
          {variantFields.map((item, index) => (
            <div key={item.id} className="my-4 flex gap-4 items-center">
              <div className=" w-full ">
                <SelectField
                  label="Property"
                  placeholder="Select Property"
                  options={propertyOptions?.filter(
                    (e: { label: string; value: string }) =>
                      !propertiesValues?.some(
                        (item: { singleSelect: { value: string } }) =>
                          e?.value === item?.singleSelect?.value
                      )
                  )}
                  name={`variantProperties.${index}.singleSelect`}
                  onChange={() => handlePropertyOnChange(index)}
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
                      watch(`variantProperties.${index}.singleSelect`)?.value ||
                        ""
                    ] || []
                  ).map((opt) => ({ label: opt, value: opt }))}
                  name={`variantProperties.${index}.multiSelect`}
                  onChange={handleOptionOnChange}
                  control={control}
                  errors={errors}
                  isMulti
                />
              </div>
              {variantFields.length > 1 && (
                <button
                  type="button"
                  className="p-1 text-red-500"
                  onClick={() => removeVariant(index)}>
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

            <Button
              btnName=" Save Variant"
              type="button"
              btnClass=" !w-auto p-2 border !border-black/20 bg-white !text-grayText !rounded-md   "
              onClickHandler={handleSaveVariant}
            />
          </div>
        </div>
      )}

      {generatedCombinations?.length > 0 && (
        <div className="mt-6 mb-6">
          {combinations?.length > 0 ? (
            <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md ">
              Generated Combinations:
            </h2>
          ) : null}
          {combinationFields?.map((item: any, index) => (
            <div
              key={item.id}
              className="flex items-start gap-4  py-3 px-5 border-l border-r border-b   rounded-b-md ">
              <div className="min-w-[180px] mt-9 ">
                {item?.combination
                  ?.map((e: { value: string }) => e.value)
                  .join(", ")}
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
                <DeleteIcon className="w-6 h-6 min-w-6 mt-8 " />
              </button>

              <SelectField
                label="Amazon Variant"
                options={amazonVariationOption?.filter(
                  (e: { label: string; value: number }) =>
                    !combinations?.some(
                      (item: any) => e?.value === item?.amazonVariant?.value
                    )
                )}
                isClearable={true}
                name={`combinations.${index}.amazonVariant`}
                control={control}
                placeholder="Select Amazon Variation"
                errors={errors}
                onChange={(selectedOption) =>
                  handleAmazonVariantChange(selectedOption.value, index)
                }
              />
            </div>
          ))}
          {combinations?.length > 0 ? (
            <Button
              btnName=" Add Combination"
              type="button"
              btnClass=" !w-auto  p-2 mt-4 text-white  rounded-md"
              onClickHandler={handleAddCombination}
            />
          ) : null}
        </div>
      )}

      {generatedCombinations?.length > 0 && (
        <>
          <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md ">
            Variant Images
          </h2>
          <div className=" py-3 px-5 border-l border-r border-b  mb-6 rounded-b-md ">
            <div className="grid grid-cols-12 gap-4 ">
              <div className="col-span-3">
                <SelectField
                  className="mb-3"
                  label="Variant Property"
                  options={
                    propertiesValues?.map(
                      (e: VariantProperty) => e.singleSelect
                    ) || []
                  }
                  name="variant"
                  control={control}
                  errors={errors}
                  onChange={(selectedOption) => {
                    handleOptionChange(
                      selectedOption ? selectedOption.value : ""
                    );
                  }}
                />
                {variantImage?.data?.map(
                  (item: { value: string }, index: number) => (
                    <div className="flex" key={index}>
                      <div
                        onClick={() => setImageIndex(index)}
                        className={`mr-2 mb-2 cursor-pointer p-2 border rounded ${
                          imageIndex === index
                            ? "bg-greenPrimary text-white"
                            : "bg-gray-200"
                        }`}>
                        {item.value}
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="col-span-9">
                <h4> Select Photos </h4>
                {variantImage?.data?.length > 0 && (
                  <MultipleImageUpload
                    name={`variantimage.data.${imageIndex}.images`}
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
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Variation;
