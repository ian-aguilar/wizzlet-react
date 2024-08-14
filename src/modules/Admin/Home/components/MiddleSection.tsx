// ** Packages **
import { useFormContext } from "react-hook-form";

// ** types **
import { IForm } from "../types";

// ** common components **
import Input from "@/components/form-fields/components/Input";
import FileField from "@/components/form-fields/components/FileField";
import { TextArea } from "@/components/common/TextArea";

const MiddleSection = () => {
  const {
    control,
    formState: { errors },
    register,
    getValues,
    clearErrors,
    setError,
  } = useFormContext<IForm>();
  console.log("IMAAAGE", getValues());
  return (
    <>
      {" "}
      <section>
        <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md ">
          Middle Section
        </h2>
        <div className=" py-3 px-5 border-l border-r border-b  mb-6 rounded-b-md ">
          <Input
            textLabelName="Title"
            placeholder="Enter Title"
            name="middleSection.title"
            label="Title"
            type="text"
            control={control}
            errors={errors}
          />
          {/* <Input
            textLabelName="Description"
            placeholder=" Enter Description"
            name="middleSection.description"
            label="Description"
            type="text"
            control={control}
            errors={errors}
          /> */}

          <TextArea textareaLabel="Description" />

          <FileField
            name={`middleSection.image` as const}
            label="Upload"
            control={control}
            errors={errors}
            maxSize={1}
            allowedFormat={["image/png", "image/jpeg"]}
            register={register}
            setError={setError}
            clearErrors={clearErrors}
          />
        </div>
      </section>
    </>
  );
};
export default MiddleSection;
