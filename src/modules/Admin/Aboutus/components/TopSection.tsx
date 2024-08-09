// ** Packages **
import { useFieldArray, useFormContext } from "react-hook-form";

// ** Common components **
import Input from "@/components/form-fields/components/Input";
import UploadFile from "@/components/form-fields/components/UploadFile";

// ** Types **
import { IAboutusForm } from "../types";
import { aboutusCardDefaultValue } from "@/constants";

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
          name="topSection.heading"
          textLabelName="Heading"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <Input
          placeholder="Enter Description"
          name="topSection.description"
          textLabelName="Description"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <Input
          placeholder="Enter Green Button Name"
          name="topSection.greenButton"
          textLabelName="Green Button"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <Input
          placeholder="Enter White Button Name"
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
              name={`topSection.cards.${index}.icon`}
              autoComplete={""}
              register={register}
            />
            <Input
              placeholder={`Enter card title`}
              name={`topSection.cards.${index}.title`}
              textLabelName={`Card title`}
              type="text"
              control={control}
              errors={errors}
              autoComplete={""}
            />
            <Input
              placeholder={`Enter card description`}
              name={`topSection.cards.${index}.description`}
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
