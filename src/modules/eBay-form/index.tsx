import { getValidation } from "@/components/form-builder/helper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserModel } from "../user-management/types";
import FormBuilder from "@/components/form-builder";
import {
  useEbayFormHandleApi,
  useEditProductValuesApi,
  useGetAllFieldsApi,
  useGetCategoryApi,
} from "./services/productBasicForm.service";
import { useEffect, useState } from "react";
import { Select } from "@/components/form-fields/components/SelectCategory";
import { CategoryOptions, ICategory } from "@/components/common/types";
import Button from "@/components/form-fields/components/Button";
import { btnShowType } from "@/components/form-fields/types";
import { Loader } from "@/components/common/Loader";
import { PropertiesState } from "./types";
import { useParams } from "react-router-dom";

const EbayForm: React.FC = () => {
  const { getAllFieldsApi, isLoading: fieldsLoading } = useGetAllFieldsApi();
  const { getCategoryApi, isLoading: optionsLoading } = useGetCategoryApi();
  const { ebayFormSubmitApi } = useEbayFormHandleApi();
  const { editProductValueApi } = useEditProductValuesApi();
  const { productId } = useParams();
  const [id, setId] = useState();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoriesId, setCategoriesId] = useState<number | string>(0);
  const [propertiesState, setPropertiesState] = useState<PropertiesState>({
    categorized: [],
    nullCategory: [],
  });

  const handleCategoryOptionAPi = async () => {
    const { data, error } = await getCategoryApi();
    if (data && !error) {
      setCategories(data?.data);
    }
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
    setPropertiesState((prevState) => ({
      ...prevState,
      categorized: data?.data?.categorizedProperties || [],
    }));
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
    handleCategoryOptionAPi();
    handleCommonField();
  }, []);

  const validation = getValidation(propertiesState.nullCategory);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(validation),
  });

  const onSubmit = async (payload: IUserModel) => {
    const filteredPayload = {
      payload: payload,
      productId: productId,
      categoryId: categoriesId,
      marketplaceId: 2,
    };
    await ebayFormSubmitApi(filteredPayload);
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
          <Button showType={btnShowType.primary} btnName="Save" type="submit" />
        </form>
      </div>
    </>
  );
};

export default EbayForm;
