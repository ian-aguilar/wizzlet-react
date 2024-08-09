// ** Packages **
import { useFormContext } from "react-hook-form";

// ** Common Components **
import Input from "@/components/form-fields/components/Input";
import UploadFile from "@/components/form-fields/components/UploadFile";

// ** Types **
import { IAboutusForm } from "../types";

const MissionSection = () => {
  const {
    control,
    formState: { errors },
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
        <UploadFile
          placeholder="Choose image"
          textLabelName="Choose Image"
          name="missionSection.image"
          autoComplete={""}
          register={register}
        />
      </div>
    </section>
  );
};

export default MissionSection;
