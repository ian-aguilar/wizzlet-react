// ** Packages **
import { useFormContext } from "react-hook-form";

// ** Common Components **
import Input from "@/components/form-fields/components/Input";

// ** Types **
import { IAboutusForm } from "../types";
import FileField from "@/components/form-fields/components/FileField";
import { IMissionSectionProps } from "../types/missionSection";
import { VITE_APP_API_URL } from "@/config";
import TextArea from "@/components/form-fields/components/TextArea";

const MissionSection = ({ missionSection }: IMissionSectionProps) => {
  const {
    control,
    formState: { errors },
    setError,
    clearErrors,
    register,
    setValue,
    watch,
  } = useFormContext<IAboutusForm>();
  return (
    <section>
      <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md ">
        Mission Section
      </h2>
      <div className="   border-l border-r border-b  mb-6 rounded-b-md ">
        <div className="grid grid-cols-12  w-full  gap-4  p-4">
          <div className=" col-span-6    relative     ">
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
              setValue={setValue}
              // defaultValue={[
              //   missionSection?.image ? ((VITE_APP_API_URL + missionSection?.image) as string) : "",
              // ]}
              watch={watch}
            />
          </div>
          <div className=" col-span-6   ">
            <Input
              placeholder="Enter Title"
              name="missionSection.title"
              textLabelName="Title"
              type="text"
              control={control}
              errors={errors}
              autoComplete={""}
            />
            <TextArea
              placeholder="Enter Description"
              name="missionSection.description"
              textLabelName="Description"
              control={control}
              errors={errors}
              autoComplete={""}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
