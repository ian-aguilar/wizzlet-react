// ** Packages **
import { useFieldArray, useFormContext } from "react-hook-form";

// ** Common Components **
import Input from "@/components/form-fields/components/Input";

// ** Types **
import { IAboutusForm } from "../types";
import { aboutusCardDefaultValue } from "@/constants";
import { useEffect } from "react";
import FileField from "@/components/form-fields/components/FileField";

const ServiceSection = () => {
  const {
    control,
    formState: { errors },
    register,
    setError,
    clearErrors,
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
      <h2 className="font-bold">Service Section</h2>
      <div>
        <Input
          placeholder="Enter Title"
          name="serviceSection.title"
          textLabelName="Title"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <Input
          placeholder="Enter Description"
          name="serviceSection.description"
          textLabelName="Description"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
      </div>
      <span
        onClick={() => {
          append(aboutusCardDefaultValue);
        }}>
        Add Field
      </span>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex">
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
            />
            <Input
              placeholder={`Enter card title`}
              name={`serviceSection.cards.${index}.title`}
              textLabelName={`Card title`}
              type="text"
              control={control}
              errors={errors}
              autoComplete={""}
            />
            <Input
              placeholder={`Enter card description`}
              name={`serviceSection.cards.${index}.description`}
              textLabelName={`Card description`}
              type="text"
              control={control}
              errors={errors}
              autoComplete={""}
            />
            <span
              onClick={() => {
                insert(index + 1, aboutusCardDefaultValue);
              }}>
              Add Field
            </span>
            {index > 0 && (
              <span
                onClick={() => {
                  remove(index);
                }}>
                Remove Field
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
