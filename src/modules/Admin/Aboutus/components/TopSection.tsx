import Input from "@/components/form-fields/components/Input";
import { useFieldArray, useFormContext } from "react-hook-form";
import UploadFile from "@/components/form-fields/components/UploadFile";
import { IAboutusForm } from "../types";

const TopSection = () => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<IAboutusForm>();

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "topSection.cards",
  });

  return (
    <section>
      <h2 className="font-bold">Top Section</h2>
      <div>
        <Input
          placeholder="Enter Heading"
          className=""
          name="topSection.heading"
          textLabelName="Heading"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <Input
          placeholder="Enter Description"
          className=""
          name="topSection.description"
          textLabelName="Description"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <Input
          placeholder="Enter Green Button Name"
          className=""
          name="topSection.greenButton"
          textLabelName="Green Button"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <Input
          placeholder="Enter White Button Name"
          className=""
          name="topSection.whiteButton"
          textLabelName="White Button"
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
              name={`topSection.cards.${index}.icon`}
              autoComplete={""}
              register={register}
            />
            <Input
              placeholder={`Enter card ${index + 1} title`}
              className=""
              name={`topSection.cards.${index}.title`}
              textLabelName={`Card ${index + 1} title`}
              type="text"
              control={control}
              errors={errors}
              autoComplete={""}
            />
            <Input
              placeholder={`Enter card ${index + 1} description`}
              className=""
              name={`topSection.cards.${index}.description`}
              textLabelName={`Card ${index + 1} description`}
              type="text"
              control={control}
              errors={errors}
              autoComplete={""}
            />
            <span
              onClick={() => {
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

export default TopSection;
