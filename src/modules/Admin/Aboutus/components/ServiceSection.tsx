// ** Packages **
import { useFieldArray, useFormContext } from "react-hook-form";

// ** Common Components **
import Input from "@/components/form-fields/components/Input";
import UploadFile from "@/components/form-fields/components/UploadFile";

// ** Types **
import { IAboutusForm } from "../types";
import { aboutusCardDefaultValue } from "@/constants";
import { useEffect } from "react";

const ServiceSection = () => {
  const {
    control,
    formState: { errors },
    register,
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
        }}
      >
        Add Field
      </span>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex">
            <UploadFile
              placeholder={`Choose card icon`}
              textLabelName={`Choose card icon`}
              name={`serviceSection.cards.${index}.icon`}
              autoComplete={""}
              register={register}
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
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
