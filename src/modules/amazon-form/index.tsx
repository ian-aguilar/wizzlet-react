import { useEffect, useState } from "react";
import { useGetAllAmazonPropertiesApi } from "./services/amazonForm.service";
import { FieldsType } from "@/components/form-builder/types";
import { FieldValues, useForm } from "react-hook-form";
import FormBuilder from "@/components/form-builder";
import { getAppendField } from "@/components/form-builder/helper";

const AmazonForm = <T extends FieldValues>() => {
  const [categoryId, setCategoryId] = useState<number>(1);
  const [properties, setProperties] = useState<FieldsType<T>[]>();

  const {
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { getAllAmazonPropertiesApi } = useGetAllAmazonPropertiesApi();

  const getProperties = async () => {
    const { data } = await getAllAmazonPropertiesApi(categoryId);
    setProperties(data?.data);
    const defaultValues = getAppendField(data?.data);
    reset(defaultValues);
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <div>
      {properties && properties.length > 0 && (
        <FormBuilder
          control={control}
          errors={errors}
          fields={properties as any}
          watch={watch as any}
        />
      )}
    </div>
  );
};

export default AmazonForm;
