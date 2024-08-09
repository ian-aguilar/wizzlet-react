// ** Packages **
import { useFormContext } from "react-hook-form";

// ** Common components **
import Input from "@/components/form-fields/components/Input";
import UploadFile from "@/components/form-fields/components/UploadFile";

// ** Types **
import { IAboutusForm } from "../types";

const VisionSection = () => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<IAboutusForm>();

  return (
    <section>
      <h2 className="font-bold">Vision Section</h2>
      <div>
        <Input
          placeholder="Enter Title"
          className=""
          name="visionSection.title"
          textLabelName="Title"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <Input
          placeholder="Enter Description"
          className=""
          name="visionSection.description"
          textLabelName="Description"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <Input
          placeholder="Enter Green Button Name"
          className=""
          name="visionSection.greenButton"
          textLabelName="Green Button"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <UploadFile
          placeholder="Choose image"
          className=""
          textLabelName="Choose Image"
          name="visionSection.image"
          autoComplete={""}
          register={register}
          errors={errors}
        />
      </div>
    </section>
  );
};

export default VisionSection;
