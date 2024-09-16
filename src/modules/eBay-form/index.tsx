import { getValidation } from "@/components/form-builder/helper";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormBuilder from "@/components/form-builder";
import {
  useCreateEbayProductApi,
  useEbayFormHandleApi,
  useEditProductValuesApi,
  useGetAllFieldsApi,
  useGetCategoryApi,
  useGetProductTypeApi,
} from "./services/productBasicForm.service";
import { useEffect, useState } from "react";
import { Select } from "@/components/form-fields/components/SelectCategory";
import { CategoryOptions, ICategory } from "@/components/common/types";
import Button from "@/components/form-fields/components/Button";
import { btnShowType } from "@/components/form-fields/types";
import { Loader } from "@/components/common/Loader";
import {
  Combination,
  ImageCombinations,
  Payload,
  PropertiesState,
  SelectOption,
} from "./types";
import { useParams } from "react-router-dom";
import SelectField from "@/components/form-fields/components/SelectField";
import { DeleteIcon } from "@/assets/Svg";
import { generateCombinations, transformData } from "./helper";
import { ICombination, variantOptionType } from "../product-basic-form/types";
import Input from "@/components/form-fields/components/Input";
import ImageUpload from "./component/ImageUpload";
import { productEbayFormValidationSchema } from "./validation-schema";

const EbayForm: React.FC = () => {
  const { getAllFieldsApi, isLoading: fieldsLoading } = useGetAllFieldsApi();
  const { getCategoryApi, isLoading: optionsLoading } = useGetCategoryApi();
  const { ebayFormSubmitApi } = useEbayFormHandleApi();
  const { editProductValueApi } = useEditProductValuesApi();
  const { productId } = useParams();
  const [id, setId] = useState();
  const [addModelOpen, setAddModelOpen] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoriesId, setCategoriesId] = useState<number | string>(0);
  const [productType, setProductType] = useState<string | null>(null);
  const [allOptions, setAllOptions] = useState<{ [key: string]: string[] }>({});
  const [propertyOptions, setPropertyOptions] = useState<
    ({ label: string; value: string } | undefined)[]
  >([]);
  const [generatedCombinations, setGeneratedCombinations] =
    useState<variantOptionType>([]);
  const [propertiesState, setPropertiesState] = useState<PropertiesState>({
    categorized: [],
    nullCategory: [],
  });

  const [allPropertyOptions, setAllPropertyOptions] = useState<any>({
    categorized: [],
  });
  const { getProductTypeApi } = useGetProductTypeApi();

  const handleCategoryOptionAPi = async () => {
    const { data, error } = await getCategoryApi();
    if (data && !error) {
      setCategories(data?.data);
    }
  };

  const getProductType = async () => {
    const { data } = await getProductTypeApi(productId);
    await handleProductTypeChange(data?.data?.productType);
  };

  const handleCommonField = async () => {
    try {
      const { data } = await getAllFieldsApi(null);
      setPropertiesState((prevState) => ({
        ...prevState,
        nullCategory: data?.data?.nullCategoryProperties || [],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = async (selectedOption: CategoryOptions) => {
    console.log("Selected Option:", selectedOption);
    if (!selectedOption?.id) {
      return;
    }
    setCategoriesId(selectedOption?.id);
    const { data } = await getAllFieldsApi(Number(selectedOption?.id));

    const { firstArray, secondArray } = await transformData(
      data?.data?.categorizedProperties
    );

    setPropertyOptions(firstArray);
    setAllOptions(secondArray);

    setAllPropertyOptions(data?.data?.categorizedProperties || []);

    if (productType === "NORMAL") {
      setPropertiesState((prevState) => ({
        ...prevState,
        categorized: data?.data?.categorizedProperties || [],
      }));
    }
  };

  const handleEditApiResponse = async () => {
    if (Number(productId) === 0) {
      return;
    }
    const { data, error } = await editProductValueApi(productId);
    if (data && !error) {
      setId(data?.data?.categoryId);
      reset(data?.data);
    }
  };

  useEffect(() => {
    getProductType();
    handleCategoryOptionAPi();
    handleCommonField();
  }, []);

  const validation = getValidation(propertiesState.nullCategory);
  const finalValidationSchema =
    productEbayFormValidationSchema.concat(validation);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<any>({
    resolver: yupResolver(finalValidationSchema),
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray<any, "variantProperties">({
    control,
    name: "variantProperties",
  });

  const {
    fields: combinationFields,
    append: appendCombination,
    remove: removeCombination,
  } = useFieldArray<any, "combinations">({
    control,
    name: "combinations",
  });

  const handleProductTypeChange = async (value: "NORMAL" | "VARIANT") => {
    setProductType(value);
    if (value === "NORMAL") {
      setValue("variantProperties", []);
    } else {
      setValue("variantProperties", [{ singleSelect: null, multiSelect: [] }]);
    }
  };

  const propertiesValues = watch("variantProperties");
  const combinations = watch("combinations");

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
        (item: { name: string }) =>
          !selectedOptions.some(
            (secondItem: { name: string }) => secondItem.name === item.name
          )
      );

      setPropertiesState((prevState) => ({
        ...prevState,
        categorized: filteredData || [],
      }));
    }
  };

  const handleOptionOnChange = () => {
    setValue("combinations", []);
  };

  // Handler to add a new combination from remaining combinations
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

  const { createEbayProductApi } = useCreateEbayProductApi();

  const onSubmit = async (payload: Payload) => {
    console.log("🚀 ~ onSubmit ~ payload:", payload);
    const formData = new FormData();

    formData.append("categoryId", categoriesId.toString());
    if (productType === "VARIANT") {
      formData.append(
        "combinations",
        JSON.stringify(
          payload.combinations.map(({ images, ...rest }) => ({
            ...rest,
            images: images.map((image) => image.name),
          }))
        )
      );
      formData.append(
        "variantProperties",
        JSON.stringify(payload.variantProperties)
      );

      // Append images
      payload.combinations.forEach((combination, combinationIndex) => {
        combination.images.forEach((image, imageIndex) => {
          formData.append(
            `combinations[${combinationIndex}].images[${imageIndex}]`,
            image
          );
        });
      });
    }

    // Append dynamic fields
    Object.keys(payload).forEach((key) => {
      if (key !== "combinations" && key !== "variantProperties") {
        const value = payload[key];
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, JSON.stringify(item));
          });
        } else if (
          typeof value === "object" &&
          value !== null &&
          !(value instanceof File)
        ) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    });

    const { data: result } = await ebayFormSubmitApi(formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("🚀 ~ onSubmit ~ result:", result);

    await createEbayProductApi(Number(productId));
  };

  const onAddModelClose = () => {
    setAddModelOpen(false);
  };

  const handleImageUpload = (imageUrls: ImageCombinations, index: number) => {
    console.log("🚀 ~ handleImageUpload ~ imageUrls:", imageUrls);
    setValue(
      `combinations.${index}.images`,
      imageUrls.combinations[index].images
    );

    setAddModelOpen(false);
  };

  useEffect(() => {
    handleEditApiResponse();
  }, [reset]);

  return (
    <>
      <div className="p-7 bg-white w-full rounded-md h-[calc(100vh_-_460px)]  lg:h-[calc(100vh_-_180px)]  overflow-y-auto scroll-design ">
        {fieldsLoading || optionsLoading ? (
          <Loader loaderClass=" !fixed " />
        ) : null}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select
            options={categories}
            defaultValue={id}
            onChange={handleOnChange}
          />

          {categoriesId !== 0 && productType === "VARIANT" && (
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
                          watch(`variantProperties.${index}.singleSelect`)
                            ?.value || ""
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
                  <div onClick={() => setAddModelOpen(true)}>Upload Image</div>
                  {addModelOpen && (
                    <div>
                      <ImageUpload
                        name={`combinations.${index}.images`}
                        onClose={onAddModelClose}
                        onSubmitImages={(imageUrls: any) =>
                          handleImageUpload(imageUrls, index)
                        }
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    className="p-1 text-red-500"
                    onClick={() => removeCombination(index)}
                  >
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

          <FormBuilder
            control={control}
            errors={errors}
            fields={propertiesState.nullCategory}
          />
          <FormBuilder
            control={control}
            errors={errors}
            fields={propertiesState.categorized}
          />
          <Button
            showType={btnShowType.primary}
            btnName="Save and list in Ebay"
            type="submit"
            btnClass="mt-6"
          />
        </form>
      </div>
    </>
  );
};

export default EbayForm;
