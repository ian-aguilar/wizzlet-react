// ** Packages **
import { useFormContext } from "react-hook-form";

// ** Common Components **
import Input from "@/components/form-fields/components/Input";

// ** Types **
import { IAboutusForm } from "../types";
import FileField from "@/components/form-fields/components/FileField";

const MissionSection = () => {
  const {
    control,
    formState: { errors },
    setError,
    clearErrors,
    register,
  } = useFormContext<IAboutusForm>();

  return (
    <section>
      <h2 className="font-bold">Mission Section</h2>
      <div>
        <Input
          placeholder="Enter Title"
          name="missionSection.title"
          textLabelName="Title"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <Input
          placeholder="Enter Description"
          name="missionSection.description"
          textLabelName="Description"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />

        <FileField
          name={`missionSection.image` as const}
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

export default MissionSection;
