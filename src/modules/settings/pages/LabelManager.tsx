import { ModalCommon } from "@/components/common/ModalCommon";
import Button from "@/components/form-fields/components/Button";
import Input from "@/components/form-fields/components/Input";
import { btnShowType } from "@/components/form-fields/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IAddLabelInputs, IModelTest } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { addLabelValidationSchema } from "../validation-schema/labelValidation";
import { useAddLabelPostAPI } from "../services/label.service";

const LabelManager = () => {
  const {
    control,
    handleSubmit,
    reset: ResetForm,
    formState: { errors },
  } = useForm<IModelTest>({
    resolver: yupResolver(addLabelValidationSchema),
  });

  // ================= Custom hooks ====================
  const { addLabelPostAPI } = useAddLabelPostAPI();

  //================= States =======================
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    ResetForm({
      label: "",
    });
  };

  const onSubmit = async (payload: IAddLabelInputs) => {
    await addLabelPostAPI({
      name: payload?.label,
    });
    setIsModalOpen(false);
    ResetForm({
      label: "",
    });
  };
  return (
    <div>
      <div className="pt-14">
        {isModalOpen && (
          <ModalCommon
            heading="Add Label Manager"
            onCancel={closeModal}
            onConfirm={handleSubmit(onSubmit)}
            cancelButtonText="Cancel"
            confirmButtonText="Add">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                className=""
                placeholder="Enter Label"
                textLabelName="Add Label"
                name="label"
                label="Label"
                type="text"
                control={control}
                errors={errors}
                autoComplete={""}
              />
            </form>
          </ModalCommon>
        )}

        <Button
          showType={btnShowType.green}
          btnClass=" !w-auto !px-14 "
          type="submit"
          btnName="Add New Label"
          onClickHandler={openModal}
        />
      </div>
    </div>
  );
};

export default LabelManager;
