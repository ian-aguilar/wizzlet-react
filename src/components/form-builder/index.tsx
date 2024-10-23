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
import { AddIconBtn, DeleteIcon } from "@/assets/Svg";
import { AmazonSelectField } from "@/modules/amazon-form/common/AmazonSelectField";

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
          <div className="col-span-4 px-2">
            <DateInput
              name={name}
              className="mb-2"
              control={control}
              errors={errors}
              label={data.title ? data.title : data.name}
              placeholder={data.description ? data.description : ""}
            />
          </div>
        );

      case FieldsTypeEnum.NUMBER:
      case FieldsTypeEnum.STRING:
      case FieldsTypeEnum.DOUBLE:
      case FieldsTypeEnum.BOOLEAN:
      case FieldsTypeEnum.INTEGER:
        return (
          <div className="col-span-4 px-2">
            <Input
              name={name}
              type={
                data.type === FieldsTypeEnum.NUMBER ||
                data.type === FieldsTypeEnum.INTEGER ||
                data.type === FieldsTypeEnum.DOUBLE
                  ? "number"
                  : "text"
              }
              className="mb-2"
              control={control}
              errors={errors}
              textLabelName={data.title ? data.title : data.name}
              placeholder={data.description ? data.description : ""}
            />
            <div className="flex gap-[15px]">
              {(data.minLength as number) > 0 && (
                <p>Minimum length: {data.minLength}</p>
              )}
              {(data.maxLength as number) > 0 && (
                <p>Maximum length: {data.maxLength}</p>
              )}
            </div>
          </div>
        );

      case FieldsTypeEnum.OPTIONS:
      case FieldsTypeEnum.MULTI_SELECT:
        return (
          <div className="col-span-4 px-2">
            {data.marketplace ? (
              <AmazonSelectField<T>
                name={name}
                className="mb-2"
                control={control}
                errors={errors}
                label={data?.title ? data?.title : data?.name}
                placeholder={data.description ? data.description : ""}
                options={data.option || []}
                isClearable={true}
                isMulti={
                  data?.type === FieldsTypeEnum.MULTI_SELECT ? true : false
                }
                maxLength={data.addMoreLength}
              />
            ) : (
              <SelectField<T>
                name={name}
                className="mb-2"
                control={control}
                errors={errors}
                label={data?.title ? data?.title : data?.name}
                placeholder={data.description ? data.description : ""}
                options={data.option || []}
                isClearable={true}
                isMulti={data?.isMulti ? true : false}
              />
            )}
          </div>
        );

      case FieldsTypeEnum.ARRAY:
        return (
          <>
            {watch && data.addMoreLength !== 0 && (
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
      <section className="RepeatSection w-full bg-white">
        <div className="">
          {fields.map((field) => (
            <Fragment key={field.name}>{getField(field)}</Fragment>
          ))}
        </div>
      </section>
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
      <div>
        <section className="RepeatSection  h-[calc(100%_-_40px)] w-full bg-white overflow-y-auto scroll-design  mb-4">
          <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md">
            {data?.title || data?.name}
          </h2>
          <div className="py-3 px-5 border-l border-r border-b rounded-b-md">
            <div className="grid  sm:gap-x-4 gap-y-4 max-h-[400px] scroll-design overflow-y-auto ">
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

                    {(data?.addMore === undefined ||
                      data?.addMore === true) && (
                      <div className="ActionBtns flex flex-col gap-2 mt-8 ml-2">
                        <span
                          className="     flex justify-center items-center w-8 h-8 border bg-greenPrimary/10 border-greenPrimary rounded-md cursor-pointer hover:brightness-125 transition-all duration-300"
                          onClick={() => {
                            if (data.items) {
                              const field = getAppendField(data.items);
                              append(field);
                            }
                          }}
                        >
                          <AddIconBtn className="  text-greenPrimary " />
                        </span>

                        {index > 0 && (
                          <span
                            className="flex justify-center items-center w-8 h-8 border bg-redAlert/10 border-redAlert rounded-md cursor-pointer hover:brightness-125 transition-all duration-300"
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            <DeleteIcon className=" text-redAlert " />
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
