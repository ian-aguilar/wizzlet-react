// ** Packages **
import { useFieldArray, useFormContext } from "react-hook-form";

// ** common components **
import Input from "@/components/form-fields/components/Input";
import { IForm } from "../types";

// ** constants **
import { FEATURE } from "../constant";
import FileField from "@/components/form-fields/components/FileField";
import Button from "@/components/form-fields/components/Button";
import { AddIconBtn, DeleteIcon } from "@/assets/Svg";
import { TextArea } from "@/components/common/TextArea";

const TopSection = () => {
  const {
    control,
    formState: { errors },
    register,
    setError,
    clearErrors,
  } = useFormContext<IForm>();
  const { append, remove, insert, fields } = useFieldArray({
    name: "topSection.feature",
    control,
  });
  return (
    <section>
      <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md ">
        Top Section
      </h2>
      <div className=" py-3 px-5 border-l border-r border-b  mb-6 rounded-b-md ">
        <Input
          textLabelName="Title"
          placeholder="Enter Title"
          name="topSection.title"
          label="Title"
          type="text"
          control={control}
          errors={errors}
        />
        {/* <Input
        textLabelName="Description"
        placeholder=" Enter Description"
        name="topSection.description"
        label="Description"
        type="text"
        control={control}
        errors={errors}
      /> */}

        <TextArea textareaLabel="Description" />

        <Input
          textLabelName="SubTitle"
          placeholder=" Enter subtitle"
          name="topSection.subtitle"
          label="Subtitle"
          type="text"
          control={control}
          errors={errors}
        />
        <Input
          textLabelName="GreenButton "
          placeholder="Enter GreenButton Name"
          name="topSection.greenButton"
          label="GreenButton"
          type="text"
          control={control}
          errors={errors}
        />
      </div>
      <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md ">
        Features Section
      </h2>
      <div className=" py-3 px-5 border-l border-r border-b  mb-6 rounded-b-md ">
        <h2 className="font-bold">Feature</h2>
        <span onClick={() => append(FEATURE)}>
          <Button
            btnName="Add Feature"
            btnClass="!w-auto  mb-2"
            BtnIconLeft={<AddIconBtn className="inline-block me-2" />}
          />
        </span>

        <div className="grid grid-cols-12  w-full xl:gap-4">
          {fields.map((field, index) => (
            <div className="col-span-12 xl:col-span-6 border p-4  relative ">
              <p className="mb-4"> Upload Feature Image {index + 1} </p>
              <div key={field.id} className="grid grid-cols-12  w-full gap-4">
                <div className=" col-span-6 relative ">
                  <FileField
                    name={`topSection.feature.${index}.image` as const}
                    label="Upload Photo"
                    control={control}
                    errors={errors}
                    maxSize={1}
                    allowedFormat={["image/png", "image/jpeg"]}
                    register={register}
                    setError={setError}
                    clearErrors={clearErrors}
                  />
                </div>
                <div className="col-span-6">
                  <Input
                    textLabelName="Heading"
                    placeholder="Enter title"
                    name={`topSection.feature.${index}.title` as const}
                    label="Heading"
                    type="text"
                    control={control}
                    errors={errors}
                  />{" "}
                  {/* <Input
                      textLabelName="Description"
                      placeholder="Enter description"
                      name={
                        `topSection.feature.${index}.description` as const
                      }
                      label="Description"
                      type="text"
                      control={control}
                      errors={errors}
                    /> */}
                  <TextArea textareaLabel="Description" />
                  <div className="absolute flex gap-2 top-2 right-2">
                    <span
                      onClick={() => fields.length > 1 && remove(index)}
                      className="flex justify-center items-center w-8 h-8 border bg-redAlert/10 border-redAlert rounded-md cursor-pointer hover:brightness-125 transition-all duration-300 "
                    >
                      <DeleteIcon className="text-redAlert " />
                    </span>
                    <span
                      onClick={() => insert(index + 1, FEATURE)}
                      className="flex justify-center items-center w-8 h-8  border bg-greenPrimary/10 border-greenPrimary rounded-md cursor-pointer  hover:brightness-125 transition-all duration-300  "
                    >
                      {" "}
                      <AddIconBtn className="text-greenPrimary" />{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSection;
