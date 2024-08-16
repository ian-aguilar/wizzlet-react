// ** Packages **
import { useFieldArray, useFormContext } from "react-hook-form";

// ** Common Components **
import Input from "@/components/form-fields/components/Input";

// ** Types **
import { IAboutusForm } from "../types";
import { aboutusCardDefaultValue } from "@/constants";
import { useEffect } from "react";
import FileField from "@/components/form-fields/components/FileField";
import { AddIconBtn, DeleteIcon } from "@/assets/Svg";
import Button from "@/components/form-fields/components/Button";
import TextArea from "@/components/form-fields/components/TextArea";

const ServiceSection = () => {
  const {
    control,
    formState: { errors },
    register,
    setError,
    clearErrors,
    setValue,
    watch,
  } = useFormContext<IAboutusForm>();

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "serviceSection.cards",
  });

  useEffect(() => {
    if (fields.length == 0) {
      append(aboutusCardDefaultValue);
    }
  }, []);

  return (
    <section>
      <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md ">
        Service Section
      </h2>
      <div className=" py-3 px-5 border-l border-r border-b  mb-6 rounded-b-md ">
        <Input
          placeholder="Enter Title"
          name="serviceSection.title"
          textLabelName="Title"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <TextArea
          placeholder="Enter Description"
          name="serviceSection.description"
          textLabelName="Description"
          control={control}
          errors={errors}
          autoComplete={""}
        />

        <span
          onClick={() => {
            append(aboutusCardDefaultValue);
          }}
        >
          <Button
            btnName="Add "
            btnClass="!w-auto  mb-2"
            BtnIconLeft={<AddIconBtn className="inline-block me-2" />}
          />
        </span>
        <div className="grid grid-cols-12  w-full xl:gap-4">
          {fields.map((field, index) => (
            <div className="col-span-12 xl:col-span-6 border p-5 relative " key={field.id}>
              <div key={field.id} className="grid grid-cols-12 h-full w-full gap-4  ">
                <div className=" col-span-6 relative flex flex-col h-full ">
                  <FileField
                    name={`serviceSection.cards.${index}.icon` as const}
                    label="Choose card icon"
                    control={control}
                    errors={errors}
                    maxSize={1}
                    allowedFormat={["image/png", "image/jpeg"]}
                    register={register}
                    setError={setError}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    // defaultValue={[
                    //   serviceSection?.cards[index].icon
                    //     ? ((VITE_APP_API_URL + serviceSection?.cards[index].icon) as string)
                    //     : "",
                    // ]}
                    watch={watch}
                  />
                </div>
                <div className=" col-span-6  flex flex-col h-full ">
                  <Input
                    placeholder={`Enter card title`}
                    name={`serviceSection.cards.${index}.title`}
                    textLabelName={`Card title`}
                    type="text"
                    control={control}
                    errors={errors}
                    autoComplete={""}
                  />
                  {/* <Input
                placeholder={`Enter card description`}
                name={`serviceSection.cards.${index}.description`}
                textLabelName={`Card description`}
                type="text"
                control={control}
                errors={errors}
                autoComplete={""}
              /> */}
                  <TextArea
                    placeholder={`Enter card description`}
                    name={`serviceSection.cards.${index}.description`}
                    textLabelName={`Card description`}
                    control={control}
                    errors={errors}
                    autoComplete={""}
                  />
                </div>

                <div className="absolute flex gap-2 top-2 right-2">
                  {index > 0 && (
                    <span
                      onClick={() => {
                        remove(index);
                      }}
                      className="flex justify-center items-center w-8 h-8 border bg-redAlert/10 border-redAlert rounded-md cursor-pointer hover:brightness-125 transition-all duration-300 "
                    >
                      <DeleteIcon className="text-redAlert " />
                    </span>
                  )}
                  <span
                    onClick={() => {
                      insert(index + 1, aboutusCardDefaultValue);
                    }}
                    className="flex justify-center items-center w-8 h-8  border bg-greenPrimary/10 border-greenPrimary rounded-md cursor-pointer  hover:brightness-125 transition-all duration-300  "
                  >
                    {" "}
                    <AddIconBtn className="text-greenPrimary" />{" "}
                  </span>
                </div>

                {/* <span
                onClick={() => {
                  insert(index + 1, aboutusCardDefaultValue);
                }}
              >
                Add Field
              </span>
              {index > 0 && (
                <span
                  onClick={() => {
                    remove(index);
                  }}
                >
                  Remove Field
                </span>
              )} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
