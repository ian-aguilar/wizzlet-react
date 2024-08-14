// ** Packages **
import {useFormContext} from "react-hook-form";

// ** types **
import {IForm} from "../types";

// ** common components **
import Input from "@/components/form-fields/components/Input";
import UploadFile from "@/components/form-fields/components/UploadFile";
import FileField from "@/components/form-fields/components/FileField";

const MiddleSection = () => {
  const {
    control,
    formState: {errors},
    register,
    getValues,
    setError,
  } = useFormContext<IForm>();
  console.log("IMAAAGE", getValues());
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

        <FileField
          name={`middleSection.image` as const}
          label="Upload"
          control={control}
          errors={errors}
          // maxSize={8}
          register={register}
          setError={setError}
        />
      </section>
    </>
  );
};
export default MiddleSection;
