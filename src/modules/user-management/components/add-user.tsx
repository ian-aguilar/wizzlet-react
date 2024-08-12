// Packages

import { Control, FieldErrors } from "react-hook-form";

// Components
import Input from "@/components/form-fields/components/Input";

// types
import { IUserListing, IUserModel } from "../types";

type AddUserFormProps = {
  control: Control<IUserModel>;
  errors: FieldErrors<IUserListing>;
};

const AddUser = (props: AddUserFormProps) => {
  const { control, errors } = props;

  return (
    <>
      <Input
        className=""
        placeholder="First Name"
        textLabelName="First Name"
        name="firstName"
        label="First Name"
        type="text"
        control={control}
        errors={errors}
        autoComplete={""}
      />
      <Input
        className=""
        placeholder="Last Name"
        textLabelName="Last Name"
        name="lastName"
        label="Last Name"
        type="text"
        control={control}
        errors={errors}
        autoComplete={""}
      />
      <Input
        className=""
        placeholder="Email"
        textLabelName="Email"
        name="email"
        label="Email"
        type="text"
        control={control}
        errors={errors}
        autoComplete={""}
      />
    </>
  );
};

export default AddUser;
