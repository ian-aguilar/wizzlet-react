import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Components
import Input from "@/components/form-fields/components/Input";
import { ModalCommon } from "@/components/common/ModalCommon";

// Types
import { AddUserFormProps, IUserModel } from "../types";

// Services
import { useUserPostAPI } from "../services/user.service";

// Validation
import { addUserValidationSchema } from "../validation-schema/userValidation";

const AddUser = ({ onClose }: AddUserFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserModel>({
    resolver: yupResolver(addUserValidationSchema),
  });

  // ================= Custom hooks ====================
  const { userPostAPI, isLoading: loader } = useUserPostAPI();

  const onSubmit = async (payload: IUserModel) => {
    const { data, error } = await userPostAPI({
      first_name: payload?.firstName,
      last_name: payload?.lastName,
      email: payload?.email,
      // password: "sample@gmail.com",
    });

    if (!error) {
      onClose(true, data?.data?.inviteLink);
    }
  };

  return (
    <>
      <ModalCommon
        heading="Add User"
        onCancel={() => onClose()}
        onConfirm={handleSubmit(onSubmit)}
        cancelButtonText="Cancel"
        isLoading={loader}
        confirmButtonText="Add"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="First Name"
            textLabelName="First Name"
            name="firstName"
            type="text"
            control={control}
            errors={errors}
          />
          <Input
            placeholder="Last Name"
            textLabelName="Last Name"
            name="lastName"
            type="text"
            control={control}
            errors={errors}
          />
          <Input
            placeholder="Email"
            textLabelName="Email"
            name="email"
            type="text"
            control={control}
            errors={errors}
          />
        </form>
      </ModalCommon>
    </>
  );
};

export default AddUser;
