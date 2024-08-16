// ** Packages **
import { useFormContext } from "react-hook-form";

// ** types **
import { IForm } from "../types";

// ** common components **
import Input from "@/components/form-fields/components/Input";
import FileField from "@/components/form-fields/components/FileField";
import TextArea from "@/components/form-fields/components/TextArea";

const MiddleSection = () => {
  const {
    control,
    formState: { errors },
    register,
    getValues,
    clearErrors,
    setError,
    setValue,
    watch,
  } = useFormContext<IForm>();
  return (
    <>
      {" "}
      <section>
        <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md ">
          Middle Section
        </h2>
        <div className="  border-l border-r border-b  mb-6 rounded-b-md ">
          <div className="grid grid-cols-12  w-full  gap-4  p-4">
            <div className=" col-span-6    relative     ">
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
                setValue={setValue}
                watch={watch}
              />
            </div>
            <div className=" col-span-6   ">
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

              <TextArea
                textLabelName="Description"
                placeholder=" Enter Description"
                name="middleSection.description"
                label="Description"
                control={control}
                errors={errors}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default MiddleSection;
