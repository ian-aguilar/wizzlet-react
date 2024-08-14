// ** Packages **
import { useFormContext } from "react-hook-form";

// ** Common components **
import Input from "@/components/form-fields/components/Input";

// ** Types **
import { IAboutusForm } from "../types";
import FileField from "@/components/form-fields/components/FileField";

const VisionSection = () => {
  const {
    control,
    formState: { errors },
    register,
    setError,
    clearErrors,
  } = useFormContext<IAboutusForm>();

  return (
    <section>
      <h2 className="font-bold">Vision Section</h2>
      <div>
        <Input
          placeholder="Enter Title"
          name="visionSection.title"
          textLabelName="Title"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <Input
          placeholder="Enter Description"
          name="visionSection.description"
          textLabelName="Description"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <Input
          placeholder="Enter Green Button Name"
          name="visionSection.greenButton"
          textLabelName="Green Button"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <FileField
          name={`visionSection.image` as const}
          label="Choose Image"
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
  );
};

export default VisionSection;
