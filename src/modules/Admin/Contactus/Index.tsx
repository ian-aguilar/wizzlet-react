//** Packages **
import { SubmitHandler, useForm } from "react-hook-form";

//** Common Components **
import Input from "@/components/form-fields/components/Input";
import Button from "@/components/form-fields/components/Button";

//** Types **
import { IContactusForm } from "./types";

//** Validations **
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactusValidation } from "./validation-schema/contactUsValidationSchema";

const Contactus = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IContactusForm>({
    resolver: yupResolver(ContactusValidation),
  });

  const onSubmit: SubmitHandler<IContactusForm> = async (values) => {
    console.log("Setting contactus", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button btnName="Update" type="submit" />
      <Input
        placeholder="Enter Title"
        name="title"
        textLabelName="Title"
        type="text"
        control={control}
        errors={errors}
        autoComplete={""}
      />
      <Input
        placeholder="Enter Description"
        name="description"
        textLabelName="Description"
        type="text"
        control={control}
        errors={errors}
        autoComplete={""}
      />
      <Input
        placeholder="Enter Green Button Name"
        name="greenButton"
        textLabelName="Green Button"
        type="text"
        control={control}
        errors={errors}
        autoComplete={""}
      />
    </form>
  );
};

export default Contactus;
