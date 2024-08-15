// ** Packages **
import { useFieldArray, useFormContext } from "react-hook-form";

// ** types **
import { IForm } from "../types";

// ** common components **
import Input from "@/components/form-fields/components/Input";

// ** constants **
import { QUESTIONANSWER } from "../constant";
import { AddIconBtn, DeleteIcon } from "@/assets/Svg";
import Button from "@/components/form-fields/components/Button";
import { TextArea } from "@/components/common/TextArea";

const TopSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IForm>();
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "topSection.row",
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
      </div>

      <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md ">
        Question Answer
      </h2>

      <div className=" py-3 px-5 border-l border-r border-b  mb-6 rounded-b-md ">
        <span onClick={() => append(QUESTIONANSWER)}>
          {" "}
          <Button
            btnClass="!w-auto mb-4"
            btnName={" Question answer"}
            type="submit"
            BtnIconLeft={<AddIconBtn className=" inline-block mr-2  " />}
          ></Button>
        </span>
        {fields.map((field, index) => (
          <div key={field.id} className=" grid grid-cols-12  gap-x-4 ">
            {/* <p className="me-4">{index + 1}</p> */}
            <div className=" col-span-12 lg:col-span-3">
              <Input
                textLabelName="Question"
                placeholder="Enter Question"
                name={`topSection.row.${index}.question`}
                label="Question"
                type="text"
                control={control}
                errors={errors}
              />
            </div>
            <div className=" col-span-10  lg:col-span-8">
              <Input
                textLabelName="Answer"
                placeholder="Enter description"
                name={`topSection.row.${index}.answer`}
                label="Answer"
                type="text"
                control={control}
                errors={errors}
              />
            </div>
            <div className=" col-span-2 lg:col-span-1 flex gap-4">
              {fields.length > 1 && (
                <span
                  onClick={() => remove(index)}
                  className="    mt-9 flex justify-center items-center w-8 h-8 border bg-redAlert/10 border-redAlert rounded-md cursor-pointer hover:brightness-125 transition-all duration-300 "
                >
                  <DeleteIcon className="text-redAlert " />
                </span>
              )}
              <span
                className="   mt-9  flex justify-center items-center w-8 h-8  border bg-greenPrimary/10 border-greenPrimary rounded-md cursor-pointer  hover:brightness-125 transition-all duration-300  "
                onClick={() => insert(index + 1, QUESTIONANSWER)}
              >
                <AddIconBtn className="text-greenPrimary" />{" "}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default TopSection;
