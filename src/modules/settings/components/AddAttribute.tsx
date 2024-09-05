// ** Packages **
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Components **
import Input from "@/components/form-fields/components/Input";
import { ModalCommon } from "@/components/common/ModalCommon";

// ** Services **
import { IAddAttributeInputs, IAddAttributeProps } from "../types/attribute";
import { addAttributeValidationSchema } from "../validation-schema/attributeValidation";
import { ATTRIBUTE_VALUE } from "../constants/sidebar";
import Button from "@/components/form-fields/components/Button";
import { AddIconBtn, DeleteIcon } from "@/assets/Svg";
import { useEffect } from "react";
import { useAddAttributePostAPI } from "../services/attribute.service";

const AddAttribute = ({ onClose, reload }: IAddAttributeProps) => {
  const { addAttributePostAPI, isLoading: loader } = useAddAttributePostAPI();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddAttributeInputs>({
    resolver: yupResolver(addAttributeValidationSchema),
  });

  const { fields, append, remove } = useFieldArray({ control, name: "values" });

  const onSubmit = async (payload: IAddAttributeInputs) => {
    const { error } = await addAttributePostAPI({
      name: payload?.name,
      values:payload?.values
    });
    if (!error) {
      reload();
      onClose();
    }
  };
  useEffect(() => {
    if (fields.length == 0) {
      append({
        value: "",
      });
    }
  }, []);
  return (
    <ModalCommon
      heading="Add Attribute Manager"
      onCancel={onClose}
      onConfirm={handleSubmit(onSubmit)}
      cancelButtonText="Cancel"
      isLoading={loader}
      confirmButtonText="Add"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          className=""
          placeholder="Enter Attribute"
          textLabelName="Attribute name"
          name="name"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <div className="overflow-y-scroll max-h-60">
          {fields.map((field, index) => {
            return (
              <div className="flex gap-3">
                <Input
                  key={field.id}
                  className=""
                  placeholder="Enter Value"
                  textLabelName="Attribute value"
                  name={`values.${index}.value`}
                  type="text"
                  control={control}
                  errors={errors}
                  autoComplete={""}
                />
                {index > 0 && (
                  <span
                    onClick={() => remove(index)}
                    className="mt-9 flex justify-center items-center w-8 h-8 border bg-redAlert/10 border-redAlert rounded-md cursor-pointer hover:brightness-125 transition-all duration-300 "
                  >
                    <DeleteIcon className="text-redAlert " />
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <span onClick={() => append({ value: "" })}>
          {" "}
          <Button
            btnClass="!w-auto mb-4"
            btnName={"Attribute value"}
            BtnIconLeft={<AddIconBtn className=" inline-block mr-2  " />}
          ></Button>
        </span>
      </form>
    </ModalCommon>
  );
};

export default AddAttribute;
