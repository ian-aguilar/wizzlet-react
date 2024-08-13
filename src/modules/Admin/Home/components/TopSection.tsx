// ** Packages **
import {useFieldArray, useFormContext} from "react-hook-form";

// ** common components **
import Input from "@/components/form-fields/components/Input";
import {IForm} from "../types";
import UploadFile from "@/components/form-fields/components/UploadFile";

// ** constants **
import {FEATURE} from "../constant";

const TopSection = () => {
  const {
    control,
    formState: {errors},
    register,
  } = useFormContext<IForm>();
  const {append, remove, insert, fields} = useFieldArray({
    name: "topSection.feature",
    control,
  });
  return (
    <>
      <section>
        <h2 className="font-bold">Top Section</h2>
        <Input
          textLabelName="Title"
          placeholder="Enter Title"
          name="topSection.title"
          label="Title"
          type="text"
          control={control}
          errors={errors}
        />
        <Input
          textLabelName="Description"
          placeholder=" Enter Description"
          name="topSection.description"
          label="Description"
          type="text"
          control={control}
          errors={errors}
        />
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
        <span onClick={() => append(FEATURE)}>
          <h2 className="font-bold">Feature</h2>+ Add Feature
        </span>
        {fields.map((field, index) => (
          <div key={field.id} className="flex">
            <p className="me-4">{index + 1}</p>
            <UploadFile
              textLabelName="Upload Feature Image"
              placeholder="Upload Photo"
              name={`topSection.feature.${index}.image` as const}
              label="Upload Photo"
              control={control}
              errors={errors}
              register={register}
            />
            <Input
              textLabelName="Heading"
              placeholder="Enter title"
              name={`topSection.feature.${index}.title` as const}
              label="Heading"
              type="text"
              control={control}
              errors={errors}
            />
            <Input
              textLabelName="Description"
              placeholder="Enter description"
              name={`topSection.feature.${index}.description` as const}
              label="Description"
              type="text"
              control={control}
              errors={errors}
            />

            <span
              onClick={() => fields.length > 1 && remove(index)}
              className="me-3"
            >
              delete
            </span>
            <span onClick={() => insert(index + 1, FEATURE)}>Add </span>
          </div>
        ))}
      </section>
    </>
  );
};

export default TopSection;
