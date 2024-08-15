// ** Packages **
import {useFormContext} from "react-hook-form";

// ** types **
import {IForm} from "../types";

// ** common components **
import Input from "@/components/form-fields/components/Input";
import FileField from "@/components/form-fields/components/FileField";
import TextArea from "@/components/form-fields/components/TextArea";
import {VITE_APP_API_URL} from "@/config";

const MiddleSection = () => {
  const {
    control,
    formState: {errors},
    register,
    getValues,
    clearErrors,
    setError,
    setValue,
    watch,
  } = useFormContext<IForm>();
  console.log("IMAAAGE", getValues());
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
                name={`middleSection.image`}
                label="Upload"
                control={control}
                errors={errors}
                maxSize={8}
                allowedFormat={["image/png", "image/jpeg"]}
                register={register}
                setError={setError}
                setValue={setValue}
                clearErrors={clearErrors}
                watch={watch}
                // defaultValue={[
                //   (getValues("middleSection.image") as string)
                //     ? VITE_APP_API_URL +
                //       (getValues("middleSection.image") as string)
                //     : "",
                // ]}
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
                type="text"
                control={control}
                errors={errors}
              />

              {/* <TextArea textareaLabel="Description" /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default MiddleSection;
