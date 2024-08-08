import {useFormContext} from "react-hook-form";
import {IBottomSectionForm} from "../types";
import Input from "@/components/form-fields/components/Input";

const BottomSection = () => {
  const {
    control,
    formState: {errors},
  } = useFormContext<IBottomSectionForm>();

  return (
    <>
      <section>
        <Input
          className=""
          placeholder="Title"
          name="titleBottom"
          label="Title"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />

        <Input
          className=""
          placeholder="Description"
          name="descriptionBottom"
          label="Description"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />

        <Input
          className=""
          placeholder="GreenButton"
          name="greenButton"
          label="GreenButton"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />

        <Input
          className=""
          placeholder="WhiteButton"
          name="whiteButton"
          label="WhiteButton"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
      </section>
    </>
  );
};
export default BottomSection;
