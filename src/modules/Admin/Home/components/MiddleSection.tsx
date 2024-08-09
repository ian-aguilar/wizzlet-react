// ** Packages **
import {useFormContext} from "react-hook-form";

// ** types **
import {IForm} from "../types";

// ** common components **
import Input from "@/components/form-fields/components/Input";
import UploadFile from "@/components/form-fields/components/UploadFile";

const MiddleSection = () => {
  const {
    control,
    formState: {errors},
    register,
  } = useFormContext<IForm>();
  return (
    <>
      {" "}
      <section>
        <h2 className="font-bold">Middle Section</h2>
        <Input
          textLabelName="Title"
          placeholder="Enter Title"
          name="middleSection.title"
          label="Title"
          type="text"
          control={control}
          errors={errors}
        />
        <Input
          textLabelName="Description"
          placeholder=" Enter Description"
          name="middleSection.description"
          label="Description"
          type="text"
          control={control}
          errors={errors}
        />
        <UploadFile
          textLabelName="Upload Feature Image"
          placeholder="Upload Photo"
          name={`middleSection.image` as const}
          label="Upload Photo"
          control={control}
          errors={errors}
          register={register}
        />
      </section>
    </>
  );
};
export default MiddleSection;
