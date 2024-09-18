import MultipleImageUpload from "@/components/form-fields/components/multipleFileField";
import SelectField from "@/components/form-fields/components/SelectField";
import { ClearOption } from "@/modules/inventory-management/types";
import { VariantProperty } from "@/modules/product-basic-form/types";
import React, { useState } from "react";
import { VariantImageProps } from "../types";

const VariantImage: React.FC<VariantImageProps> = ({
  control,
  errors,
  propertiesValues,
  setError,
  clearErrors,
  setValue,
  watch,
}) => {
  //** STATE **//
  const [selectedOption, setSelectedOption] = useState<ClearOption[]>([]);
  const [imageIndex, setImageIndex] = useState<string>("");

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

  return (
    <>
      <h1 className="text-center mt-2">Variant Images</h1>

      <SelectField
        className="mb-3"
        label="Variant Property"
        options={
          propertiesValues.map((e: VariantProperty) => e.singleSelect) || []
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
        />
      )}
    </>
  );
};

export default VariantImage;
