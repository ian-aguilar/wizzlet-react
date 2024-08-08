import Input from "@/components/form-fields/components/Input";
import { useFieldArray, useFormContext } from "react-hook-form";
import UploadFile from "@/components/form-fields/components/UploadFile";
import { IAboutusForm } from "../types";

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

  return (
    <section>
      <h2 className="font-bold">Service Section</h2>
      <div>
        <Input
          placeholder="Enter Title"
          className=""
          name="serviceSection.title"
          textLabelName="Title"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <Input
          placeholder="Enter Description"
          className=""
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
          append({ title: "", description: "", icon: "" });
        }}
      >
        Add Field
      </span>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex">
            <UploadFile
              placeholder={`Choose card ${index + 1} icon`}
              className=""
              textLabelName={`Choose card ${index + 1} icon`}
              name={`serviceSection.cards.${index}.icon`}
              autoComplete={""}
              register={register}
            />
            <Input
              placeholder={`Enter card ${index + 1} title`}
              className=""
              name={`serviceSection.cards.${index}.title`}
              textLabelName={`Card ${index + 1} title`}
              type="text"
              control={control}
              errors={errors}
              autoComplete={""}
            />
            <Input
              placeholder={`Enter card ${index + 1} description`}
              className=""
              name={`serviceSection.cards.${index}.description`}
              textLabelName={`Card ${index + 1} description`}
              type="text"
              control={control}
              errors={errors}
              autoComplete={""}
            />
            <span
              onClick={() => {
                console.log(fields);
                insert(index + 1, { title: "", icon: "", description: "" });
              }}
            >
              Add Field
            </span>
            <span
              onClick={() => {
                remove(index);
              }}
            >
              Remove Field
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
