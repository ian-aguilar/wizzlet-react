// ** Packages **
import {useFieldArray, useFormContext} from "react-hook-form";

// ** types **
import {IForm} from "../types";

// ** common components **
import Input from "@/components/form-fields/components/Input";
import {QUESTIONANSWER} from "../constant";

const TopSection = () => {
  const {
    control,
    formState: {errors},
  } = useFormContext<IForm>();
  const {fields, append, remove, insert} = useFieldArray({
    name: "row",
  });

  return (
    <>
      <section>
        <h2 className="font-bold">Top Section</h2>
        <Input
          textLabelName="Title"
          placeholder="Title"
          name="topSection.title"
          label="Title"
          type="text"
          control={control}
          errors={errors}
        />
        <Input
          textLabelName="Description"
          placeholder="Description"
          name="topSection.description"
          label="Description"
          type="text"
          control={control}
          errors={errors}
        />
        <span onClick={() => append(QUESTIONANSWER)}>
          <h2 className="font-bold">Question Answer</h2>+ Add Question answer
        </span>
        {fields.map((field, index) => (
          <div key={field.id} className="flex">
            <Input
              textLabelName="Question"
              placeholder="Enter Question"
              name={`topSection.row.${index}.question` as const}
              label="Question"
              type="text"
              control={control}
              errors={errors}
            />
            <Input
              textLabelName="Answer"
              placeholder="Enter description"
              name={`topSection.row.${index}.answer` as const}
              label="Answer"
              type="text"
              control={control}
              errors={errors}
            />

            <span onClick={() => remove(index)} className="me-3">
              delete
            </span>
            <span onClick={() => insert(index + 1, QUESTIONANSWER)}>Add </span>
          </div>
        ))}
      </section>
    </>
  );
};
export default TopSection;
