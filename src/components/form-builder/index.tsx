import { Fragment } from "react";
import { FieldValues } from "react-hook-form";

import DateInput from "../form-fields/components/DateInput";
import { FieldsType, FieldsTypeEnum, FromBuilderPropsType } from "./types";

import SelectField from "../form-fields/components/SelectField";
import Input from "../form-fields/components/Input";

const FormBuilder = <T extends FieldValues>({
  fields,
  control,
  errors,
}: FromBuilderPropsType<T>) => {
  const getField = (data: FieldsType<T>) => {
    switch (data.type) {
      case FieldsTypeEnum.DATE:
        return (
          <DateInput
            name={data.name}
            className=""
            control={control}
            errors={errors}
            label={data.name}
            placeholder=""
          />
        );

      case FieldsTypeEnum.NUMBER:
      case FieldsTypeEnum.STRING:
      case FieldsTypeEnum.DOUBLE:
        return (
          <Input
            name={data.name}
            className=""
            control={control}
            errors={errors}
            textLabelName={data.name}
            placeholder=""
          />
        );

      case FieldsTypeEnum.OPTIONS:
        return (
          <SelectField<T>
            name={data.name}
            className=""
            control={control}
            errors={errors}
            label={data.name}
            placeholder=""
            options={data.option || []}
          />
        );

      default:
        break;
    }
  };

  return (
    <>
      {fields.map((field) => (
        <Fragment key={field.name}>{getField(field)}</Fragment>
      ))}
    </>
  );
};

export default FormBuilder;
