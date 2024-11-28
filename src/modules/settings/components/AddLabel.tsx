// ** Packages **
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Components **
import Input from "@/components/form-fields/components/Input";
import { ModalCommon } from "@/components/common/ModalCommon";

// ** Types **
import { IAddLabelProps, IAddLabelInputs } from "../types/label";

// ** Validation **
import { addLabelValidationSchema } from "../validation-schema/labelValidation";

// ** Services **
import { useAddLabelPostAPI } from "../services/label.service";

const AddLabel = ({ onClose, reload }: IAddLabelProps) => {
  const { addLabelPostAPI, isLoading: loader } = useAddLabelPostAPI();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddLabelInputs>({
    resolver: yupResolver(addLabelValidationSchema),
  });

  const onSubmit = async (payload: IAddLabelInputs) => {
    const { error } = await addLabelPostAPI({
      name: payload?.label,
    });
    if (!error) {
      reload();
      onClose();
    }
  };

  return (
    <ModalCommon
      heading="Add Label Manager"
      onCancel={onClose}
      onConfirm={handleSubmit(onSubmit)}
      cancelButtonText="Cancel"
      isLoading={loader}
      confirmButtonText="Add"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          className=""
          placeholder="Enter Label"
          textLabelName="Label"
          name="label"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
      </form>
    </ModalCommon>
  );
};

export default AddLabel;
