import { Fragment } from "react";
import { FieldValues, useFieldArray } from "react-hook-form";

import DateInput from "../form-fields/components/DateInput";
import {
  FieldArrayComponentType,
  FieldsType,
  FieldsTypeEnum,
  FromBuilderPropsType,
} from "./types";

import SelectField from "../form-fields/components/SelectField";
import Input from "../form-fields/components/Input";
import { getAppendField } from "./helper";

const FormBuilder = <T extends FieldValues>({
  fields,
  control,
  errors,
  fieldArrayName,
  watch,
}: FromBuilderPropsType<T>) => {
  const getField = (data: FieldsType<T>) => {
    const name = (
      fieldArrayName ? fieldArrayName + "." + data.name : data.name
    ) as any;

    switch (data.type) {
      case FieldsTypeEnum.DATE:
        return (
          <div className="py-1">
            <DateInput
              name={name}
              className="mb-2"
              control={control}
              errors={errors}
              label={data.title ? data.title : data.name}
              placeholder=""
            />
          </div>
        );

      case FieldsTypeEnum.NUMBER:
      case FieldsTypeEnum.STRING:
      case FieldsTypeEnum.DOUBLE:
      case FieldsTypeEnum.BOOLEAN:
      case FieldsTypeEnum.INTEGER:
        return (
          <div className="py-1">
            <Input
              name={name}
              className="mb-2"
              control={control}
              errors={errors}
              textLabelName={data.title ? data.title : data.name}
              placeholder=""
            />
          </div>
        );

      case FieldsTypeEnum.OPTIONS:
        return (
          <div className="py-1">
            <SelectField<T>
              name={name}
              className="mb-2"
              control={control}
              errors={errors}
              label={data.title?data.title : data.name}
              placeholder=""
              options={data.option || []}
              isClearable={true}
            />
          </div>
        );

      case FieldsTypeEnum.ARRAY:
        return (
          <>
            {watch && (
              <FieldArrayComponent
                fields={fields}
                control={control}
                errors={errors}
                fieldArrayName={name}
                data={data}
                watch={watch}
              />
            )}
          </>
        );

      case FieldsTypeEnum.OBJECT:
        return (
          <>
            <h2 className="text-red-500">{data.title}</h2>
            <div className="flex ml-[20px]">
              <FormBuilder
                watch={watch}
                control={control}
                errors={errors}
                fields={data.items as FieldsType<T>[]}
                fieldArrayName={
                  fieldArrayName ? `${fieldArrayName}.${data.name}` : data.name
                }
              />
            </div>
          </>
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

const FieldArrayComponent = <T extends FieldValues>({
  // fields,
  control,
  errors,
  fieldArrayName,
  data,
  watch,
}: FieldArrayComponentType<T>) => {
  const { append, remove } = useFieldArray({
    name: fieldArrayName,
    control,
  });

  const values = watch(fieldArrayName);
  return (
    <>
      <h2 className="text-blue-500">{data.title}</h2>

      {values &&
        values.map((_: any, index: number) => (
          <div key={index} className="flex">
            <FormBuilder
              control={control}
              errors={errors}
              fields={data.items as FieldsType<T>[]}
              fieldArrayName={`${fieldArrayName}[${index}]`}
              watch={watch}
            />
            <span
              onClick={() => {
                if (data.items) {
                  const field = getAppendField(data.items);
                  append(field);
                }
              }}
            >
              Add
            </span>
            {index > 0 && (
              <span
                onClick={() => {
                  remove(index);
                }}
              >
                Remove
              </span>
            )}
          </div>
        ))}
    </>
  );
};
