import {useFieldArray, useFormContext} from "react-hook-form";
import {ITopSectionForm} from "../types";
import Input from "@/components/form-fields/components/Input";

const TopSection = () => {
  const {
    control,
    formState: {errors},
  } = useFormContext<ITopSectionForm>();
  const {fields, append, remove, insert} = useFieldArray({
    name: "row",
  });

  return (
    <>
      <section>
        <Input
          className=""
          placeholder="Title"
          name="title"
          label="Title"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <Input
          className=""
          placeholder="Description"
          name="description"
          label="Description"
          type="text"
          control={control}
          errors={errors}
          autoComplete={""}
        />
        <span onClick={() => append({question: "", answer: ""})}>
          Add Question answer
        </span>
        {fields.map((field, index) => (
          <div key={field.id} className="flex">
            <Input
              className=""
              placeholder="Enter Question"
              name={`row.${index}.question` as const}
              label="Question"
              type="text"
              control={control}
              errors={errors}
              autoComplete={""}
            />
            <Input
              className=""
              placeholder="Enter description"
              name={`row.${index}.answer` as const}
              label="Answer"
              type="text"
              control={control}
              errors={errors}
              autoComplete={""}
            />

            <span onClick={() => remove(index)} className="me-3">
              delete
            </span>
            <span onClick={() => insert(index + 1, {question: "", answer: ""})}>
              Add{" "}
            </span>
          </div>
        ))}
      </section>
    </>
  );
};
export default TopSection;
