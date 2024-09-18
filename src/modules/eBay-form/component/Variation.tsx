import MultipleImageUpload from "@/components/form-fields/components/multipleFileField";
import SelectField from "@/components/form-fields/components/SelectField";
import { ClearOption } from "@/modules/inventory-management/types";
import { VariantProperty } from "@/modules/product-basic-form/types";
import React, { useState } from "react";
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
import ImageUpload from "./ImageUpload";
import Input from "@/components/form-fields/components/Input";

const Variation: React.FC<VariantImageProps> = ({
  control,
  errors,
  setError,
  clearErrors,
  setValue,
  watch,
  categoriesId,
  productType,
  propertyOptions,
  allPropertyOptions,
  allOptions,
  setPropertiesState,
  setGeneratedCombinations,
  generatedCombinations,
}) => {
  //** STATE **//
  const [selectedOption, setSelectedOption] = useState<ClearOption[]>([]);
  const [imageIndex, setImageIndex] = useState<string>("");
  const [variantImages, setVariantImages] = useState<Record<string, any>>({});

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

  const handlePropertyOnChange = (index: number) => {
    if (propertiesValues[index].multiSelect) {
      propertiesValues[index].multiSelect = [];
    }
    setValue("variantProperties", propertiesValues);
    setValue("combinations", []);

    if (productType === "VARIANT") {
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
    }
  };

  const handleOptionOnChange = () => {
    setValue("combinations", []);
    setSelectedOption([]);
    setImageIndex("");
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
      const initialCombinationFields: ICombination[] = combinations?.map(
        (combination: Combination[]) => ({
          combination,
          price: 0,
          sku: "",
          quantity: 0,
        })
      );

      setValue("combinations", initialCombinationFields);
    }
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
      setSelectedOption(result.multiSelect);
    } else {
      setSelectedOption([]);
    }
  };

  // Updated handler for image upload
  const handleImageUpload = (property: string, value: string, images: File) => {
    const newVariantImage = {
      property,
      value,
      images,
    };

    // Update the state for the selected variant property with its images
    setVariantImages((prevState) => ({
      ...prevState,
      [value]: newVariantImage, // key by value (like "Beige") for each variant option
    }));
  };

  return (
    <>
      {categoriesId !== 0 && productType === "VARIANT" && (
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

      {productType === "VARIANT" && generatedCombinations?.length > 0 && (
        <div className="mt-6">
          {combinations?.length > 0 ? (
            <h3 className="font-bold text-lg">Generated Combinations:</h3>
          ) : null}
          {combinationFields.map((item: any, index) => (
            <div key={item.id} className="flex items-start gap-2 my-2">
              <div className="min-w-[100px] mt-9 ">
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
              <ImageUpload
                name={`combinations.${index}.images`}
                watch={watch}
                control={control}
                setError={setError}
                clearErrors={clearErrors}
                errors={errors}
                setValue={setValue}
              />

              <button
                type="button"
                className="p-1 text-red-500"
                onClick={() => removeCombination(index)}>
                <DeleteIcon className="w-6 h-6 min-w-6 mt-8 " />
              </button>
            </div>
          ))}
          {combinations?.length > 0 ? (
            <Button
              btnName=" Add Combination"
              type="button"
              btnClass=" !w-auto  p-2  text-white  rounded-md"
              onClickHandler={handleAddCombination}
            />
          ) : null}
        </div>
      )}

      {productType === "VARIANT" && generatedCombinations?.length > 0 && (
        <div>
          <h1 className="text-center mt-2">Variant Images</h1>
          <SelectField
            className="mb-3"
            label="Variant Property"
            options={
              propertiesValues?.map((e: VariantProperty) => e.singleSelect) ||
              []
            }
            name="variant"
            control={control}
            errors={errors}
            onChange={(selectedOption) =>
              handleOptionChange(selectedOption ? selectedOption.value : "")
            }
          />
          {selectedOption.map((item, index) => (
            <div className="flex" key={index}>
              <div
                onClick={() => setImageIndex(item.value)}
                className={`mr-2 cursor-pointer p-2 border rounded ${
                  imageIndex === item.value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}>
                {item.value}
              </div>
            </div>
          ))}
          {imageIndex && (
            <MultipleImageUpload
              name={`variantimage.${imageIndex}.images`}
              control={control}
              setError={setError}
              clearErrors={clearErrors}
              errors={errors}
              maxSize={8}
              allowedFormat={["image/png", "image/jpeg"]}
              setValue={setValue}
              watch={watch}
              className=""
              onChange={(images: File) =>
                handleImageUpload(
                  propertiesValues?.find(
                    (e: VariantProperty) => e.singleSelect.value === imageIndex
                  )?.singleSelect?.value,
                  imageIndex,
                  images
                )
              }
            />
          )}
        </div>
      )}
    </>
  );
};

export default Variation;
