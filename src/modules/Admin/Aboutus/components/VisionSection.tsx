// ** Packages **
import { useFormContext } from "react-hook-form";

// ** Common components **
import Input from "@/components/form-fields/components/Input";

// ** Types **
import { IAboutusForm } from "../types";
import FileField from "@/components/form-fields/components/FileField";
import TextArea from "@/components/form-fields/components/TextArea";
import { IVisionSectionProps } from "../types/visionSection";
import { VITE_APP_API_URL } from "@/config";

const VisionSection = ({ visionSection }: IVisionSectionProps) => {
  const {
    control,
    formState: { errors },
    register,
    setError,
    clearErrors,
    setValue,
    watch,
  } = useFormContext<IAboutusForm>();

  const visionSectionData = watch("visionSection");

  // console.log(
  //   "VISSSIONNN",
  //   visionSection?.image ? ((VITE_APP_API_URL + visionSection?.image) as string) : ""
  // );

  console.log(visionSectionData?.image, "visionSectionData?.image>>>>>>>>");

  return (
    <section>
      <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md mt-4">
        Vision Section
      </h2>
      <div className="   border-l border-r border-b  mb-6 rounded-b-md ">
        <div className="grid grid-cols-12  w-full  gap-4  p-4">
          <div className=" col-span-6    relative     ">
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
              setValue={setValue}
              // defaultValue={Array.isArray(visionSectionData?.image) ? visionSectionData.image : []}
              watch={watch}
              // defaultValue={[
              //   visionSection?.image ? ((VITE_APP_API_URL + visionSection?.image) as string) : "",
              // ]}
            />{" "}
          </div>
          <div className=" col-span-6   ">
            <Input
              placeholder="Enter Title"
              name="visionSection.title"
              textLabelName="Title"
              type="text"
              control={control}
              errors={errors}
              autoComplete={""}
            />
            {/* <Input
              placeholder="Enter Description"
              name="visionSection.description"
              textLabelName="Description"
              type="text"
              control={control}
              errors={errors}
              autoComplete={""}
            /> */}
            <TextArea
              textLabelName="Description"
              placeholder="Enter Description"
              name="visionSection.description"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
